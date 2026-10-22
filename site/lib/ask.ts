// Server-only: answers a question from the knowledge repo with Gemini.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Free tier for this key (checked 2026-10-14): 15 RPM, 250K TPM, 500 RPD. Flash models only allow 20 RPD.
// Measured: one question with the whole repo + thinking = ~22K tokens, 3-5 s, so TPM caps us at ~11 questions a minute.
// Measured 2026-10-16 on this key: this model answers 503 (overloaded) in about 3 of 10 calls. Every other current model
// was worse (3.1, 3.7, 3.8, flash-latest: almost always 503) or gone (2.5 models: 404), so a fallback model does not help.
// Retrying the same model does: 3 tries at ~70% each is about 97%.
const MODEL = "gemini-3.5-flash-lite"; // our constant
const MAX_TRIES = 3; // our constant
// Tokens the model may spend thinking. Measured 2026-10-16 on 6 test questions: 256 passed 6/6 in ~12 s, 1024 passed 5/6 and 6/6
// in ~13-15 s, and 0 is rejected by this model (HTTP error). Omitting the setting earlier lost facts phrased differently from the question.
const THINKING_BUDGET = Number(process.env.THINKING_BUDGET ?? 256); // can be overridden with the THINKING_BUDGET env var
const TIMEOUT_MS = 28_000; // never leave the user waiting longer than this (the route allows 30 s)
const HEDGE_MS = 8_000; // a call still silent after this long gets a second parallel call; most answers arrive in 2 to 5 s
const CONTENT_ROOT = path.join(process.cwd(), "content");

const SYSTEM_PROMPT = `You answer questions about Optimum (getoptimum.xyz) using ONLY the knowledge base text given below. It may be excerpts: the sections that matched the question.
This is a community project, not the Optimum team; never speak as Optimum.

Rules:
- Use only facts from the files. Before saying something is not covered, check every file for the same idea in other words (e.g. "fast" = speed, latency, propagation time, "x faster"). Only if nothing matches, say "The knowledge base does not cover this." and stop.
- Keep each fact's tag exactly as the file has it: [confirmed], [claimed] or [third-party]. Never upgrade a [claimed] fact to a plain statement. This holds in EVERY answer language: write the tag in English inside square brackets, never translate it, never leave it out, and put it before the source marker, for example "... without decoding [claimed] [1]".
- Only put a tag on a fact if that same line or table row in the file carries that tag. Lines without a tag (summaries, "Most likely reading", notes) get no tag; say "the knowledge base notes" instead, translated into the answer language.
- Claims listed in unverified.md get no tag: say they have no supporting source yet.
- Do not write file paths in the answer. Put a marker such as [1], [2] right after each fact (after its tag, if it has one) and describe every marker in "sources": the file path and a short quote. The quote is the first 8 to 14 plain words of the one line that states the fact, copied exactly from that file, stopping before any link or tag. Never a heading or list title, never paraphrased. Several facts may share one marker. Use at most 4 sources.
- Set "covered" to true if the text contains information relevant to the question, false if it does not.
- Reply as JSON only: {"covered": true, "answer": "text with markers", "sources": [{"n": 1, "file": "technology/rlnc.md", "quote": "..."}]}. The answer itself must contain no JSON.
- If a file lists the topic under "Disputed", give both sides and say it is disputed.
- If the topic appears in unverified.md, say it has no supporting source yet.
- Short: at most about 120 words, bullet points welcome.
- Reply in the language named under ANSWER LANGUAGE at the end of the input, even though the files are in English: English question, English answer; Vietnamese question, Vietnamese answer (all text in the answer, including the words that introduce each fact).
- Write normal text with full accents and diacritics for that language. Do not use LaTeX or $...$ math. No em dashes.`;

let knowledge: string | null = null; // cached once per server process

// All repo text in one block: llms.txt first, then every Markdown file. Our helper.
function loadKnowledge(): string {
  if (knowledge) return knowledge;
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (name.startsWith(".") || name === "site" || name === "vi") continue; // vi/ = Vietnamese copies, not extra facts // skip .git, .github and the website code (site/) if it lives in the same repo
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".md") || name === "llms.txt") files.push(path.relative(CONTENT_ROOT, full).replace(/\\/g, "/"));
    }
  };
  walk(CONTENT_ROOT);
  files.sort((a, b) => (a === "llms.txt" ? -1 : b === "llms.txt" ? 1 : a.localeCompare(b)));
  knowledge = files.map((f) => `=== FILE: ${f} ===\n${fs.readFileSync(path.join(CONTENT_ROOT, f), "utf8")}`).join("\n\n");
  return knowledge;
}

// ---- Retrieval: send Gemini only the sections that match the question (about 5x less text, so faster).
// scripts/build-embeddings.mjs saves a meaning vector per section. Any problem here returns null and the caller sends the whole repo.
type Chunk = { file: string; heading: string; text: string; vec: number[] }; // our type
let chunkCache: Chunk[] | null | undefined; // undefined = not read yet, null = not available

function loadChunks(): Chunk[] | null {
  if (chunkCache !== undefined) return chunkCache;
  try {
    chunkCache = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "embeddings.json"), "utf8")).chunks as Chunk[];
  } catch {
    chunkCache = null;
  }
  return chunkCache;
}

const TOP_SECTIONS = 10; // our constant: sections sent per question
const MAX_CHARS = 16_000; // our constant: cap on the text sent
const WIDE = { top: 24, chars: 40_000 }; // our constant: second, wider look when the first excerpts did not answer

const cosine = (a: number[], b: number[]) => {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return dot / (Math.sqrt(na * nb) || 1);
};

// The matching sections as one text block, or null if retrieval is not possible. Our helper.
// Word-overlap score, used when the embedding call is not available (rate limit, timeout). No network, so it cannot fail. Our helper.
function lexicalScores(question: string, chunks: Chunk[]): number[] {
  const words = [...new Set(plain(question).split(/[^a-z0-9]+/).filter((w) => w.length > 2))];
  const docs = chunks.map((c) => plain(`${c.file} ${c.heading} ${c.text}`));
  const df = words.map((w) => docs.filter((d) => d.includes(w)).length);
  return docs.map((d) => words.reduce((sum, w, i) => sum + (d.includes(w) ? Math.log(1 + chunks.length / (1 + df[i])) : 0), 0));
}

async function retrieve(question: string, key: string, wide = false): Promise<string | null> {
  const chunks = loadChunks();
  if (!chunks?.length) return null;
  const top = wide ? WIDE.top : TOP_SECTIONS;
  const cap = wide ? WIDE.chars : MAX_CHARS;
  try {
    let scores: number[] | null = null;
    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent", {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": key },
        signal: AbortSignal.timeout(5_000),
        body: JSON.stringify({ content: { parts: [{ text: question }] }, taskType: "RETRIEVAL_QUERY", outputDimensionality: chunks[0].vec.length }),
      });
      const q: number[] | undefined = res.ok ? (await res.json()).embedding?.values : undefined;
      if (q?.length) scores = chunks.map((c) => cosine(q, c.vec));
    } catch {
      scores = null;
    }
    if (!scores) scores = lexicalScores(question, chunks); // embedding unavailable: still send only the best-matching sections, not the whole repo
    const picked = new Set(
      scores.map((score, i) => ({ i, score })).sort((a, b) => b.score - a.score).slice(0, top).map((x) => x.i),
    );
    // A fact and its "Disputed" section belong together, so add the Disputed section of every file we picked from.
    const files = new Set([...picked].map((i) => chunks[i].file));
    chunks.forEach((c, i) => { if (files.has(c.file) && /^Disputed/i.test(c.heading)) picked.add(i); });
    let total = 0;
    const byFile = new Map<string, string[]>();
    for (const i of [...picked].sort((a, b) => a - b)) {
      if (total + chunks[i].text.length > cap) continue;
      total += chunks[i].text.length;
      byFile.set(chunks[i].file, [...(byFile.get(chunks[i].file) ?? []), chunks[i].text]);
    }
    return [...byFile].map(([f, parts]) => `=== FILE (excerpts): ${f} ===\n${parts.join("\n\n")}`).join("\n\n");
  } catch {
    return null;
  }
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
function parseAnswer(text: string): { covered?: boolean; answer: string; sources: Source[] } | null {
  try {
    const j = JSON.parse(text);
    if (typeof j?.answer !== "string" || !Array.isArray(j?.sources)) return null;
    return { covered: typeof j.covered === "boolean" ? j.covered : undefined, answer: j.answer, sources: j.sources };
  } catch {
    return null;
  }
}

// Name the answer language ourselves: the files are English, and the model sometimes follows them instead of the question. Our helper.
function languageHint(question: string): string {
  const vi = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i.test(question);
  return `=== ANSWER LANGUAGE ===\n${vi ? "Vietnamese, with full diacritics" : "the same language as the question above"} (not the language of the files)`;
}

export async function ask(question: string): Promise<AskResult> {
  const key = process.env.GEMINI_API_KEY ?? "";
  const deadline = Date.now() + TIMEOUT_MS; // one time budget for everything below
  const input = `=== QUESTION ===\n${question}\n\n${languageHint(question)}`;
  const excerpts = key ? await retrieve(question, key) : null;
  let r = await callGemini(SYSTEM_PROMPT, excerpts ?? loadKnowledge(), input, deadline);
  // The model says it found nothing relevant in the excerpts: look wider (more sections), if there is time left.
  if (r.ok && excerpts && parseAnswer(r.text)?.covered === false && deadline - Date.now() > 9_000) {
    const wider = await retrieve(question, key, true);
    if (wider) {
      const second = await callGemini(SYSTEM_PROMPT, wider, input, deadline);
      if (second.ok) r = second;
    }
  }
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
    covered: { type: "BOOLEAN" },
    answer: { type: "STRING" },
    sources: { type: "ARRAY", items: { type: "OBJECT", properties: { n: { type: "INTEGER" }, file: { type: "STRING" }, quote: { type: "STRING" } }, required: ["n", "file", "quote"] } },
  },
  required: ["covered", "answer", "sources"],
};

// One Gemini call with the whole knowledge base in front of the given input. Our helper.
async function callGemini(system: string, knowledgeText: string, input: string, deadline: number): Promise<GeminiText> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, status: 500, error: "The AI assistant is not configured on this server (missing GEMINI_API_KEY)." };

  // Gemini answers in 2 to 5 s most of the time, but some calls hang for 20 s or end in 503 (overloaded). So instead of waiting
  // on one call: if a call is still silent after HEDGE_MS, or it ends in 503 or a network error, start another one right away
  // (up to MAX_TRIES calls), and use whichever answers first. Never retry 429 (quota) or other errors: waiting does not fix them.
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts: [{ text: `${knowledgeText}\n\n${input}` }] }],
    generationConfig: { temperature: 0.2, thinkingConfig: { thinkingBudget: THINKING_BUDGET }, responseMimeType: "application/json", responseSchema: RESPONSE_SCHEMA },
  });
  const controllers = new Map<number, AbortController>();
  const inflight = new Map<number, Promise<[number, Response | null]>>();
  let launched = 0;
  const launch = () => {
    const id = ++launched;
    const ctl = new AbortController();
    controllers.set(id, ctl);
    const timer = setTimeout(() => ctl.abort(), Math.max(3_000, deadline - Date.now()));
    inflight.set(
      id,
      fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": key },
        signal: ctl.signal,
        body,
      }).then(
        (r) => { clearTimeout(timer); return [id, r] as [number, Response | null]; },
        () => { clearTimeout(timer); return [id, null] as [number, Response | null]; },
      ),
    );
  };

  let res: Response | undefined;
  let winner = 0; // id of the call whose answer we use: its body is still being read, so it must not be aborted
  let last503: Response | undefined;
  launch();
  while (inflight.size > 0 && !res && Date.now() < deadline) {
    const hedge = new Promise<"hedge">((resolve) => setTimeout(() => resolve("hedge"), Math.min(HEDGE_MS, Math.max(0, deadline - Date.now()))));
    const got = await Promise.race([...inflight.values(), hedge]);
    if (got === "hedge") {
      if (launched < MAX_TRIES && deadline - Date.now() > 4_000) launch(); // still silent: add a second call, keep the first running
      continue;
    }
    const [id, r] = got;
    inflight.delete(id);
    if (r && r.status !== 503) { res = r; winner = id; break; } // an answer, or an error that retrying would not fix
    if (r) last503 = r;
    if (launched < MAX_TRIES && deadline - Date.now() > 4_000) launch(); // 503 or network error: try again right away
  }
  controllers.forEach((c, id) => { if (id !== winner) c.abort(); }); // stop the calls that lost the race
  res = res ?? last503;
  if (!res) return { ok: false, status: 504, error: "Gemini did not answer in time. Try again, or ask a shorter question." };
  const reply = await res.json().catch(() => null);

  if (res.status === 429) {
    // Two different limits look the same. Per-day quota: waiting does not help, retrying burns more quota. Do not retry.
    const perDay = JSON.stringify(reply ?? "").includes("PerDay");
    return perDay
      ? { ok: false, status: 429, error: "The free daily limit for the AI assistant is used up. It resets tomorrow (Pacific time). The docs pages and search still work." }
      : { ok: false, status: 429, error: "Too many questions in the last minute. Wait about one minute, then ask again." };
  }
  if (!res.ok) {
    return { ok: false, status: 502, error: `Gemini returned an error (HTTP ${res.status}). Try again in a moment.` };
  }

  const text: string | undefined = reply?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("");
  if (!text?.trim()) {
    const reason = reply?.candidates?.[0]?.finishReason ?? reply?.promptFeedback?.blockReason ?? "unknown";
    return { ok: false, status: 502, error: `Gemini returned an empty answer (reason: ${reason}). Try rephrasing the question.` };
  }

  const u = reply?.usageMetadata;
  return { ok: true, text, usage: { promptTokens: u?.promptTokenCount, outputTokens: u?.candidatesTokenCount, totalTokens: u?.totalTokenCount } };
}
