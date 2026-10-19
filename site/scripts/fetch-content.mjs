// Pulls the knowledge repo into ./content and copies its photos into ./public/kb.
// Runs before `dev` and `build`, so the site always renders the latest Markdown.
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const REPO_URL = "https://github.com/QuyTu9868/optimum-knowledge.git"; // our constant: source of truth
const CONTENT_DIR = "content"; // our constant: local copy, gitignored

// Start clean so deleted files disappear too. Empty the folder instead of deleting it: on Windows a process
// standing inside the folder makes deleting the folder itself fail with EPERM.
mkdirSync(CONTENT_DIR, { recursive: true });
for (const name of readdirSync(CONTENT_DIR)) rmSync(`${CONTENT_DIR}/${name}`, { recursive: true, force: true, maxRetries: 3 });
if (process.env.CONTENT_SRC) {
  // Preview mode: use a local copy of the knowledge repo (for example one with edits not pushed yet) instead of GitHub.
  cpSync(process.env.CONTENT_SRC, CONTENT_DIR, { recursive: true, filter: (src) => !/[\\/]\.git([\\/]|$)/.test(src) }); // skip .git on both / and \ paths
} else {
  execSync(`git clone --depth 1 ${REPO_URL} ${CONTENT_DIR}`, { stdio: "inherit" }); // shallow clone, latest commit only
}

rmSync(`${CONTENT_DIR}/.git`, { recursive: true, force: true }); // history is not needed and would be shipped to the server
rmSync(`${CONTENT_DIR}/site`, { recursive: true, force: true }); // the website code lives in this repo too; it is not knowledge
rmSync("public/kb", { recursive: true, force: true });
if (existsSync(`${CONTENT_DIR}/team/photos`)) {
  cpSync(`${CONTENT_DIR}/team/photos`, "public/kb/team/photos", { recursive: true }); // photos served as static files
}

// Serve llms.txt at the site root. Its links are relative to the repo, so point them at the raw files on GitHub.
if (existsSync(`${CONTENT_DIR}/llms.txt`)) {
  const raw = "https://raw.githubusercontent.com/QuyTu9868/optimum-knowledge/main/"; // our constant
  const text = readFileSync(`${CONTENT_DIR}/llms.txt`, "utf8").replace(/\]\(((?!https?:)[^)]+)\)/g, (_, p) => `](${raw}${p})`);
  writeFileSync("public/llms.txt", text);
}

console.log("Knowledge repo fetched into ./content");
