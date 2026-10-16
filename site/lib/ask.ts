// Server-only: answers a question from the knowledge repo with Gemini.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Free tier for this key (checked 2026-10-14): 15 RPM, 250K TPM, 500 RPD. Flash models only allow 20 RPD.
// Measured: one question with the whole repo + thinking = ~22K tokens, 3-5 s, so TPM caps us at ~11 questions a minute.
// Second model is used when the first is overloaded (HTTP 503). Quota is counted per model, so it also adds 500 requests/day.
const MODELS = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite"]; // our constant
const TIMEOUT_MS = 30_000; // never leave the user waiting longer than this
const CONTENT_ROOT = path.join(process.cwd(), "content");

const SYSTEM_PROMPT = `You answer questions about Optimum (getoptimum.xyz) using ONLY the knowledge base files given below.
This is a community project, not the Optimum team; never speak as Optimum.

Rules:
- Use only facts from the files. Before saying something is not covered, check every file for the same idea in other words (e.g. "fast" = speed, latency, propagation time, "x faster"). Only if nothing matches, say "The knowledge base does not cover this." and stop.
- Keep each fact's tag exactly as the file has it: [confirmed], [claimed] or [third-party]. Never upgrade a [claimed] fact to a plain statement.
- Only put a tag on a fact if that same line or table row in the file carries that tag. Lines without a tag (summaries, "Most likely reading", notes) get no tag; say "the knowledge base notes" instead, translated into the answer language.
- Claims listed in unverified.md get no tag: say they have no supporting source yet.
- Do not write file paths in the answer. Put a marker such as [1], [2] right after each fact (after its tag, if it has one) and describe every marker in "sources": the file path and a quote that is ONE line, or part of one line, copied character for character from that file (max 40 words). Quote the line that states the fact itself, never a heading or a list title. Never paraphrase or invent a quote. Several facts may share one marker.
- Reply as JSON only: {"answer": "text with markers", "sources": [{"n": 1, "file": "technology/rlnc.md", "quote": "..."}]}. The answer itself must contain no JSON.
- If a file lists the topic under "Disputed", give both sides and say it is disputed.
- If the topic appears in unverified.md, say it has no supporting source yet.
- Short: at most about 150 words, bullet points welcome.
- Reply in the same language as the question: English question, English answer; Vietnamese question, Vietnamese answer.
- Write normal text with full accents and diacritics for that language. Do not use LaTeX or $...$ math. No em dashes.`;

let knowledge: string | null = null; // cached once per server process

// All repo text in one block: llms.txt first, then every Markdown file. Our helper.
function loadKnowledge(): string {
  if (knowledge) return knowledge;
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (name.startsWith(".") || name === "site") continue; // skip .git, .github and the website code (site/) if it lives in the same repo
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".md") || name === "llms.txt") files.push(path.relative(CONTENT_ROOT, full).replace(/\\/g, "/"));
    }
  };
  walk(CONTENT_ROOT);
  files.sort((a, b) => (a === "llms.txt" ? -1 : b === "llms.txt" ? 1 : a.localeCompare(b)));
  knowledge = files.map((f) => `=== FILE: ${f} ===\n${fs.readFileSync(path.join(CONTENT_ROOT, f), "utf8")}`).join("\n\n");
  return knowledge;
}

export type AskResult =
  | { ok: true; html: string; usage?: { promptTokens?: number; outputTokens?: number; totalTokens?: number } }
  | { ok: false; status: number; error: string };

type Person = { name: string; role: string; photo: string }; // our type
let people: Person[] | null = null;

// People with a photo, read from team/people.md ("### Name, Role" then "Photo URL: .../team/photos/x.jpg"). Our helper.
function loadPeople(): Person[] {
  if (people) return people;
  const md = fs.readFileSync(path.join(CONTENT_ROOT, "team/people.md"), "utf8");
  people = [...md.matchAll(/^### ([^,\n]+),\s*([^\n]+)\n[\s\S]*?Photo URL: \S*\/(team\/photos\/[\w.-]+)/gm)].map((m) => ({
    name: m[1].trim(),
    role: m[2].trim(),
    photo: "/kb/" + m[3], // our own copy of the photo, see scripts/fetch-content.mjs
  }));
  return people;
}

const plain = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); // "Médard" matches "Medard"

// Photo cards for team members the answer mentions. Built by us, not by the model. Our helper.
function peopleStrip(answer: string): string {
  const text = plain(answer);
  const found = loadPeople().filter((p) => text.includes(plain(p.name)));
  if (!found.length) return "";
  const cards = found
    .map((p) => `<figure class="person"><img src="${p.photo}" alt="${p.name}" /><figcaption><strong>${p.name}</strong><span>${p.role}</span></figcaption></figure>`)
    .join("");
  return `<div class="people-strip">${cards}</div><p class="people-note">Photos from <a href="/team/people">team/people.md</a>, cropped from Optimum's team page.</p>`;
}

// Turns the model's Markdown into safe HTML with badges and links to our pages. Our helper.
function toHtml(markdown: string): string {
  const escaped = markdown.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); // model text never becomes raw HTML
  const html = marked.parse(escaped, { async: false }) as string;
  return html
    .replace(/\[(confirmed|claimed|third-party)\]/g, (_, t: string) => `<span class="tag tag-${t === "third-party" ? "third" : t}">${t}</span>`)
    .replace(/<code>([\w/-]+\.md)<\/code>/g, (_, f: string) => {
      const href = f === "README.md" ? "/" : "/" + f.replace(/\.md$/, "");
      return `<a class="cite" href="${href}">${f}</a>`;
    });
}

// Lowercase text without markdown links, tags and symbols, so a quote can be matched against a repo line. Our helper.
const norm = (s: string) =>
  s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[(confirmed|claimed|third-party)\]/g, " ")
    .replace(/[*`_|>#]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

// One repo line as HTML: bullet or table row turned into text, links kept only if external, tags as badges. Our helper.
function lineToHtml(line: string): string {
  let text = line.trim();
  if (text.startsWith("|")) text = text.split("|").map((c) => c.trim()).filter(Boolean).join("  /  "); // table row
  text = text.replace(/^[-*]\s+/, "");
  return (marked.parseInline(text, { async: false }) as string)
    .replace(/<a href="(?!https?:)[^"]*">(.*?)<\/a>/g, "$1") // relative links would break here, keep the text
    .replace(/<a href="(https?:[^"]*)">/g, '<a href="$1" target="_blank" rel="noreferrer">')
    .replace(/\[(confirmed|claimed|third-party)\]/g, (_, t: string) => `<span class="tag tag-${t === "third-party" ? "third" : t}">${t}</span>`);
}

type Source = { n: number; file: string; quote: string }; // our type: one numbered source the model cites

// "Sources" list under the answer: for each marker, the real repo line that contains the model's quote.
// A quote that is not really in the file is never shown as if it were. Our helper.
function sourcesHtml(sources: Source[], id: string): string {
  const seen = new Set<number>();
  const items: string[] = [];
  for (const s of sources) {
    if (!Number.isInteger(s.n) || seen.has(s.n) || typeof s.file !== "string" || typeof s.quote !== "string") continue;
    seen.add(s.n);
    const rel = path.posix.normalize(s.file.replace(/\\/g, "/"));
    const okPath = !rel.startsWith("..") && !path.posix.isAbsolute(rel) && (rel.endsWith(".md") || rel === "llms.txt");
    const full = path.join(CONTENT_ROOT, rel);
    let match = "";
    if (okPath && fs.existsSync(full)) {
      const quote = norm(s.quote);
      match = (fs.readFileSync(full, "utf8").split("\n").find((l) => quote.length >= 12 && norm(l).includes(quote)) ?? "");
    }
    const href = rel === "README.md" ? "/" : "/" + rel.replace(/\.md$/, "");
    const shown = okPath ? rel : "unknown file";
    items.push(
      `<li id="src-${id}-${s.n}"><span class="src-n">${s.n}</span><div>` +
        (match
          ? `<div class="src-line">${lineToHtml(match)}</div>`
          : `<div class="src-line src-unmatched">Could not match the quote to this file. Open the file to check.</div>`) +
        (okPath ? `<a class="src-file" href="${href}">${shown}</a>` : `<span class="src-file">${shown}</span>`) +
        `</div></li>`,
    );
  }
  return items.length ? `<p class="src-title">Sources</p><ol class="sources">${items.join("")}</ol>` : "";
}

// Reads the model's JSON reply; returns null when it is not the shape we asked for. Our helper.
function parseAnswer(text: string): { answer: string; sources: Source[] } | null {
  try {
    const j = JSON.parse(text);
    if (typeof j?.answer !== "string" || !Array.isArray(j?.sources)) return null;
    return { answer: j.answer, sources: j.sources };
  } catch {
    return null;
  }
}

export async function ask(question: string): Promise<AskResult> {
  const r = await callGemini(SYSTEM_PROMPT, `=== QUESTION ===\n${question}`);
  if (!r.ok) return r;
  const parsed = parseAnswer(r.text);
  if (!parsed) return { ok: true, html: toHtml(r.text) + peopleStrip(r.text), usage: r.usage }; // not JSON: show the plain text, no source list
  const id = Math.random().toString(36).slice(2, 8); // makes the marker links unique when several answers are on the page
  const body = toHtml(parsed.answer).replace(/\[(\d{1,2})\]/g, (_, n: string) => `<a class="srcref" href="#src-${id}-${n}">${n}</a>`);
  return { ok: true, html: body + sourcesHtml(parsed.sources, id) + peopleStrip(parsed.answer), usage: r.usage };
}

type GeminiText = { ok: true; text: string; usage?: { promptTokens?: number; outputTokens?: number; totalTokens?: number } } | { ok: false; status: number; error: string };

// JSON shape we ask Gemini to return, so the answer and its numbered sources arrive separately.
const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    answer: { type: "STRING" },
    sources: { type: "ARRAY", items: { type: "OBJECT", properties: { n: { type: "INTEGER" }, file: { type: "STRING" }, quote: { type: "STRING" } }, required: ["n", "file", "quote"] } },
  },
  required: ["answer", "sources"],
};

// One Gemini call with the whole knowledge base in front of the given input. Our helper.
async function callGemini(system: string, input: string): Promise<GeminiText> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, status: 500, error: "The AI assistant is not configured on this server (missing GEMINI_API_KEY)." };

  // 503 means this model is overloaded: try the next model right away. Never retry 429 (quota) or other errors.
  const started = Date.now();
  let res: Response | undefined;
  for (let attempt = 1; attempt <= MODELS.length; attempt++) {
    try {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODELS[attempt - 1]}:generateContent`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": key },
        signal: AbortSignal.timeout(Math.max(5_000, TIMEOUT_MS - (Date.now() - started))), // one shared time budget
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: `${loadKnowledge()}\n\n${input}` }] }],
          // Without thinking, Flash Lite missed facts phrased differently from the question (tested 2026-10-14).
          generationConfig: { temperature: 0.2, thinkingConfig: { thinkingBudget: 1024 }, responseMimeType: "application/json", responseSchema: RESPONSE_SCHEMA },
        }),
      });
    } catch {
      return { ok: false, status: 504, error: "Gemini did not answer within 30 seconds. Try again, or ask a shorter question." };
    }
    if (res.status !== 503 || Date.now() - started > 12_000) break;
  }
  if (!res) return { ok: false, status: 502, error: "No answer from Gemini. Try again in a moment." };

  const body = await res.json().catch(() => null);

  if (res.status === 429) {
    // Two different limits look the same. Per-day quota: waiting does not help, retrying burns more quota. Do not retry.
    const perDay = JSON.stringify(body ?? "").includes("PerDay");
    return perDay
      ? { ok: false, status: 429, error: "The free daily limit for the AI assistant is used up. It resets tomorrow (Pacific time). The docs pages and search still work." }
      : { ok: false, status: 429, error: "Too many questions in the last minute. Wait about one minute, then ask again." };
  }
  if (!res.ok) {
    return { ok: false, status: 502, error: `Gemini returned an error (HTTP ${res.status}). Try again in a moment.` };
  }

  const text: string | undefined = body?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("");
  if (!text?.trim()) {
    const reason = body?.candidates?.[0]?.finishReason ?? body?.promptFeedback?.blockReason ?? "unknown";
    return { ok: false, status: 502, error: `Gemini returned an empty answer (reason: ${reason}). Try rephrasing the question.` };
  }

  const u = body?.usageMetadata;
  return { ok: true, text, usage: { promptTokens: u?.promptTokenCount, outputTokens: u?.candidatesTokenCount, totalTokens: u?.totalTokenCount } };
}
