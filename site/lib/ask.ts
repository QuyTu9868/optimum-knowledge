// Server-only: answers a question from the knowledge repo with Gemini.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Free tier for this key (checked 2026-10-14): 15 RPM, 250K TPM, 500 RPD. Flash models only allow 20 RPD.
// Measured: one question with the whole repo + thinking = ~22K tokens, 3-5 s, so TPM caps us at ~11 questions a minute.
const MODEL = "gemini-3.5-flash-lite"; // our constant
const TIMEOUT_MS = 30_000; // never leave the user waiting longer than this
const CONTENT_ROOT = path.join(process.cwd(), "content");

const SYSTEM_PROMPT = `You answer questions about Optimum (getoptimum.xyz) using ONLY the knowledge base files given below.
This is a community project, not the Optimum team; never speak as Optimum.

Rules:
- Use only facts from the files. Before saying something is not covered, check every file for the same idea in other words (e.g. "fast" = speed, latency, propagation time, "x faster"). Only if nothing matches, say "The knowledge base does not cover this." and stop.
- Keep each fact's tag exactly as the file has it: [confirmed], [claimed] or [third-party]. Never upgrade a [claimed] fact to a plain statement.
- Only put a tag on a fact if that same line or table row in the file carries that tag. Lines without a tag (summaries, "Most likely reading", notes) get no tag; say "the knowledge base notes" instead, translated into the answer language.
- Claims listed in unverified.md get no tag: say they have no supporting source yet.
- After each fact, cite the file path in backticks, e.g. \`technology/rlnc.md\`.
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

export function ask(question: string): Promise<AskResult> {
  return callGemini(SYSTEM_PROMPT, `=== QUESTION ===\n${question}`);
}

// One Gemini call with the whole knowledge base in front of the given input. Our helper.
async function callGemini(system: string, input: string): Promise<AskResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, status: 500, error: "The AI assistant is not configured on this server (missing GEMINI_API_KEY)." };

  let res: Response;
  try {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: `${loadKnowledge()}\n\n${input}` }] }],
        // Without thinking, Flash Lite missed facts phrased differently from the question (tested 2026-10-14).
        generationConfig: { temperature: 0.2, thinkingConfig: { thinkingBudget: 1024 } },
      }),
    });
  } catch {
    return { ok: false, status: 504, error: "Gemini did not answer within 30 seconds. Try again, or ask a shorter question." };
  }

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
  return { ok: true, html: toHtml(text) + peopleStrip(text), usage: { promptTokens: u?.promptTokenCount, outputTokens: u?.candidatesTokenCount, totalTokens: u?.totalTokenCount } };
}
