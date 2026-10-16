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

## Deploy on Vercel

1. Import this repo in Vercel and set **Root Directory** to `site`.
2. Add the environment variable `GEMINI_API_KEY`.
3. Deploy. Vercel rebuilds on every push to `main`, which also pulls the latest Markdown.

Diagrams are drawn by the site author and live in `public/diagrams/`, not in the knowledge files.
