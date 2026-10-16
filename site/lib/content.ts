// Reads Markdown files from ./content (the cloned knowledge repo) and turns them into pages.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_ROOT = path.join(process.cwd(), "content"); // our constant

// Sidebar order, matching the README sections. Our own data.
export const SECTIONS: { title: string; dir: string }[] = [
  { title: "Technology", dir: "technology" },
  { title: "Team and history", dir: "team" },
  { title: "Results", dir: "results" },
  { title: "Ecosystem", dir: "ecosystem" },
  { title: "Code", dir: "code" },
];

// Root-level files shown under "Meta". README becomes the home page.
const META_FILES = ["unverified.md", "CONTRIBUTING.md"];

export type DocPage = {
  slug: string[]; // url parts, e.g. ["technology", "rlnc"]
  file: string; // path inside the repo, e.g. "technology/rlnc.md"
  title: string;
  lastVerified?: string;
  status?: string;
};

// Turns "technology/rlnc.md" into its page info. Our helper.
function readMeta(file: string): DocPage {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), "utf8");
  const { data, content } = matter(raw);
  const heading = content.match(/^#\s+(.+)$/m)?.[1];
  return {
    slug: file.replace(/\.md$/, "").split("/"),
    file,
    title: data.title ?? heading ?? file,
    lastVerified: data.last_verified ? String(data.last_verified instanceof Date ? data.last_verified.toISOString().slice(0, 10) : data.last_verified) : undefined,
    status: data.status,
  };
}

// Every page grouped for the sidebar. Our helper.
export function getNav(): { title: string; pages: DocPage[] }[] {
  const groups = SECTIONS.map((s) => ({
    title: s.title,
    pages: fs
      .readdirSync(path.join(CONTENT_ROOT, s.dir))
      .filter((f) => f.endsWith(".md"))
      .sort()
      .map((f) => readMeta(`${s.dir}/${f}`)),
  }));
  groups.push({ title: "Meta", pages: META_FILES.map(readMeta) });
  return groups;
}

export function getAllPages(): DocPage[] {
  return getNav().flatMap((g) => g.pages);
}

const TAG_CLASS: Record<string, string> = { confirmed: "tag-confirmed", claimed: "tag-claimed", "third-party": "tag-third" };

// Renders one repo file to HTML: fixes relative links and turns [confirmed] etc into badges. Our helper.
export function renderFile(file: string): { meta: DocPage; html: string; toc: TocItem[]; section?: string } {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), "utf8");
  const { content } = matter(raw);
  const dir = path.posix.dirname(file);

  const html = marked.parse(content, {
    async: false,
    walkTokens(token) {
      if (token.type !== "link" && token.type !== "image") return;
      const href = token.href;
      const RAW = "https://raw.githubusercontent.com/QuyTu9868/optimum-knowledge/main/"; // our constant
      if (token.type === "image" && href.startsWith(RAW)) {
        token.href = "/kb/" + href.slice(RAW.length); // serve repo photos from our own copy
        return;
      }
      if (/^(https?:|mailto:|#)/.test(href)) return; // external links stay as they are
      const [target, hash] = href.split("#");
      const resolved = path.posix.normalize(path.posix.join(dir, target));
      if (resolved.endsWith(".md")) {
        const route = resolved === "README.md" ? "/" : "/" + resolved.replace(/\.md$/, "");
        token.href = route + (hash ? `#${hash}` : "");
      } else if (/\.(jpe?g|png|webp|gif|svg)$/i.test(resolved)) {
        token.href = "/kb/" + resolved; // photos copied into public/kb by fetch-content
      } else {
        token.href = `https://github.com/QuyTu9868/optimum-knowledge/blob/main/${resolved}`; // anything else: view on GitHub
      }
    },
  }) as string;

  const withBadges = html.replace(/\[(confirmed|claimed|third-party)\]/g, (_, t: string) => `<span class="tag ${TAG_CLASS[t]}">${t}</span>`);

  // Give h2/h3 an id so the "On this page" list can link to them. toc is our own list.
  const toc: TocItem[] = [];
  const withIds = withBadges.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    toc.push({ id, text, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  // Our own diagram for this page (web only, not in the knowledge repo), placed right after the h1.
  const diagram = DIAGRAMS[file];
  const withDiagram = diagram
    ? withIds.replace(/<\/h1>/, `</h1><figure class="diagram"><img src="/diagrams/${diagram.src}" alt="${diagram.alt}" /><figcaption>${diagram.caption} <span class="diagram-note">Diagram drawn by the site author from the facts on this page.</span></figcaption></figure>`)
    : withIds;

  const meta = file === "README.md" ? { ...readMeta(file), slug: [] } : readMeta(file);
  const section = getNav().find((g) => g.pages.some((p) => p.file === file))?.title; // for the label above the title
  return { meta, html: withDiagram, toc, section };
}

export type SearchDoc = { title: string; href: string; section: string; text: string }; // our type

// Plain-text copy of every page for the search box. Built once at build time. Our helper.
export function getSearchIndex(): SearchDoc[] {
  return getNav().flatMap((g) =>
    g.pages.map((p) => {
      const { content } = matter(fs.readFileSync(path.join(CONTENT_ROOT, p.file), "utf8"));
      const text = content
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // drop images
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // keep link text, drop urls
        .replace(/\[(confirmed|claimed|third-party)\]/g, " ") // tags are noise in snippets
        .replace(/[#*`|>_]+|-{3,}/g, " ") // markdown symbols and table rules, but keep hyphens in dates
        .replace(/\s+/g, " ")
        .trim();
      return { title: p.title, href: "/" + p.slug.join("/"), section: g.title, text };
    }),
  );
}

// Which page gets which SVG from public/diagrams. Our own data; filled in as diagrams are drawn.
const DIAGRAMS: Record<string, { src: string; alt: string; caption: string }> = {
  "technology/rlnc.md": {
    src: "rlnc.svg",
    alt: "Source node splits a message into randomly mixed coded shards; two relay nodes mix shards into new coded shards without decoding and forward them; the receiver decodes the original message from any k independent shards.",
    caption: "Relays mix the shards they hold into new coded shards without decoding, and a receiver rebuilds the message from any k independent shards.",
  },
  "technology/mump2p-and-gossipsub.md": {
    src: "mump2p-gossipsub.svg",
    alt: "Plain GossipSub forwards full copies; mump2p sends coded shards that relays recode; a mump2p validator uses coded gossip with mump2p peers and standard GossipSub with other peers.",
    caption: "mump2p builds on GossipSub and sends coded shards instead of full copies. Validators still use standard GossipSub with peers that do not run mump2p.",
  },
  "technology/sidecar-gateway.md": {
    src: "sidecar-gateway.svg",
    alt: "On the validator host, the Optimum Gateway runs beside the beacon node and its libp2p stack, which keeps its existing gossip mesh. ProbeLab found signing logic, beacon state and attestation duties untouched; Optimum says validator keys are not accessed.",
    caption: "Optimum Gateway runs beside the beacon node, in parallel to its libp2p stack. ProbeLab found it does not touch signing, beacon state or duties; Optimum also says it does not access validator keys.",
  },
  "team/timeline.md": {
    src: "timeline.svg",
    alt: "Timeline from core RLNC papers (2002-2006) to Optimum founded (2024), launch and seed (2025-04-15), Hoodi tests report, Gateway source public, Lido PERCH call, ProbeLab audit, Gateway v1.3.2, and a disputed Optimum mainnet status.",
    caption: "Milestones from the sources on this page. Dashed nodes are company claims; mainnet status is disputed.",
  },
  "technology/flexnodes.md": {
    src: "flexnodes.svg",
    alt: "Flexnode operators run Flexnodes that propagate data with coded gossip. In the planned Latency Marketplace, validators would pay for coded equations and operators would be rewarded. Marked planned, not final.",
    caption: "Flexnode operators would be rewarded when validators pay for coded data. The Latency Marketplace is planned and not final.",
  },
};

export type TocItem = { id: string; text: string; level: number };
