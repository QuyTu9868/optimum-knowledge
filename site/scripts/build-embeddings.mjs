// Turns the knowledge repo (./content) into small sections with a meaning vector each, saved to ./data/embeddings.json.
// The website uses it to send Gemini only the sections that match a question. If anything fails here the build still
// succeeds and the website falls back to sending the whole repo, so this step is an optimisation, never a requirement.
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const CONTENT_DIR = "content"; // our constant
const OUT_FILE = "data/embeddings.json"; // our constant
const MODEL = "gemini-embedding-001"; // our constant: text embedding model, available on the free tier
const DIMS = 256; // our constant: small vectors are enough for ~100 sections
const BATCH = 50; // our constant: sections per request

// The key comes from the environment (Vercel) or from .env.local (local builds).
function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  if (!existsSync(".env.local")) return "";
  const line = readFileSync(".env.local", "utf8").split(String.fromCharCode(10)).find((l) => /GEMINI_API_KEY *=/.test(l));
  return line ? line.split("=")[1].trim() : "";
}

// Every Markdown file split at "## " headings. Our helper.
function sections() {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name.startsWith(".") || name === "site" || name === "vi") continue; // vi/ = Vietnamese copies, not extra facts
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) { walk(full); continue; }
      if (!name.endsWith(".md")) continue;
      const file = path.relative(CONTENT_DIR, full).replace(/\\/g, "/");
      const body = readFileSync(full, "utf8").replace(/^---[\s\S]*?---\s*/, ""); // drop front matter
      for (const part of body.split(/\n(?=## )/)) {
        const text = part.trim();
        if (text.length < 40) continue;
        out.push({ file, heading: text.split("\n")[0].replace(/^#+\s*/, "").slice(0, 80), text });
      }
    }
  };
  walk(CONTENT_DIR);
  return out;
}

async function embed(texts, key) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:batchEmbedContents`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": key },
    signal: AbortSignal.timeout(60_000),
    body: JSON.stringify({
      requests: texts.map((t) => ({ model: `models/${MODEL}`, content: { parts: [{ text: t.slice(0, 6000) }] }, taskType: "RETRIEVAL_DOCUMENT", outputDimensionality: DIMS })),
    }),
  });
  if (!res.ok) throw new Error(`embedding request failed: HTTP ${res.status}`);
  const j = await res.json();
  return j.embeddings.map((e) => e.values.map((v) => Math.round(v * 1e4) / 1e4));
}

const key = loadKey();
if (!key) {
  console.log("build-embeddings: no GEMINI_API_KEY, skipped (the site will send the whole repo to Gemini)");
  process.exit(0);
}
try {
  const secs = sections();
  const chunks = [];
  for (let i = 0; i < secs.length; i += BATCH) {
    const part = secs.slice(i, i + BATCH);
    const vecs = await embed(part.map((s) => `${s.file} - ${s.heading}\n${s.text}`), key);
    part.forEach((s, k) => chunks.push({ ...s, vec: vecs[k] }));
  }
  mkdirSync("data", { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify({ model: MODEL, dims: DIMS, chunks }));
  console.log(`build-embeddings: ${chunks.length} sections embedded -> ${OUT_FILE}`);
} catch (e) {
  console.log("build-embeddings: failed, skipped:", e.message);
}
