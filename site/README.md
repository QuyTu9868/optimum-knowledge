# Website

Community docs site for this knowledge base. It is not made, run or endorsed by the Optimum team.

The site reads the Markdown files in this repo at build time (`scripts/fetch-content.mjs` clones the repo into `content/`), so the Markdown stays the source of truth. Pushing a change to this repo and rebuilding the site is enough to update it.

## Run locally

```
cd site
npm install
npm run dev
```

The "Ask AI" page needs a Gemini key. Put `GEMINI_API_KEY=...` in `site/.env.local` (git ignores it).

At build time `scripts/build-embeddings.mjs` turns the Markdown sections into meaning vectors (needs the same key). Each question then sends Gemini only the best matching sections, which is about 5 times faster than sending the whole repo. Without a key at build time the site still works and sends the whole repo.

## Deploy on Vercel

1. Import this repo in Vercel and set **Root Directory** to `site`.
2. Add the environment variable `GEMINI_API_KEY` (it is used at build time and at run time).
3. Deploy. Vercel rebuilds on every push to `main`, which also pulls the latest Markdown.

Diagrams are drawn by the site author and live in `public/diagrams/`, not in the knowledge files.
