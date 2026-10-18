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

// Heading text to the id used for it in the page and in "On this page". Our helper.
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

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
    const id = slugify(text);
    toc.push({ id, text, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  // Our own diagrams for this page (web only, not in the knowledge repo). Each goes right after its h2 heading, or after the h1.
  let withDiagram = withIds;
  for (const d of DIAGRAMS[file] ?? []) {
    const fig = `<figure class="diagram"><img src="/diagrams/${d.src}" alt="${d.alt}" /><figcaption>${d.caption} <span class="diagram-note">Diagram drawn by the site author from the facts on this page.</span></figcaption></figure>`;
    // Find the heading by its text (no regular expression, so no escaping problems), then put the figure after it.
    const tag = d.after ? `<h2 id="${slugify(d.after)}">${d.after}</h2>` : "</h1>";
    const at = withDiagram.indexOf(tag);
    if (at >= 0) withDiagram = withDiagram.slice(0, at + tag.length) + fig + withDiagram.slice(at + tag.length);
  }

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
type Diagram = { src: string; alt: string; caption: string; after?: string }; // our type: after = the h2 text it goes under
const DIAGRAMS: Record<string, Diagram[]> = {
  "technology/rlnc.md": [
    {
      src: "rlnc.svg",
      alt: "Three original pieces are turned into coded shards, which are random mixes of the pieces. A relay mixes the shards it holds into a new shard without decoding. The receiver needs any k independent mixes and solves for the original pieces.",
      caption: "From pieces to mixes and back: relays mix shards without decoding, and a receiver rebuilds the data from any k independent mixes.",
    },
    {
      src: "rlnc-equations.svg",
      after: "A worked example",
      alt: "With plain copies a receiver can hold x1 twice and still wait for x3. With three different mixes such as 3x1 + 2x2 + x3, any three independent mixes are enough to solve for x1, x2 and x3.",
      caption: "Copies repeat, mixes all count (Medard's whiteboard example, numbers for illustration).",
    },
    {
      src: "rlnc-recoding.svg",
      after: "Recoding at relay nodes",
      alt: "On a chain source, relay 1, relay 2, receiver with a loss on every link: with end-to-end coding the losses of all hops add up, with recoding each hop repairs its own loss. Optimum's own shorter example (source, relay, receiver): 9 transmissions forward-only, 8 in 8 slots with decode and re-encode, 8 in 5 slots with recoding.",
      caption: "Recoding repairs loss hop by hop. The transmission counts are Optimum's own chain example.",
    },
  ],
  "technology/mump2p-and-gossipsub.md": [
    {
      src: "why-gossip-slow.svg",
      after: "Why Optimum says gossip needs fixing",
      alt: "An Ethereum slot lasts 12 seconds and about 4 seconds go to validators agreeing on the head of the chain. Validators far from the block source see older information and suffer more from repeated copies, which creates a premium for colocation. Coded mixes make every incoming piece count.",
      caption: "Why repeated data hurts, according to Medard's argument. It is Optimum's reasoning, not a measurement.",
    },
    {
      src: "publish-path.svg",
      after: "How publishing and relaying work",
      alt: "A publisher pads and splits a message into k fragments and creates ShredFactor times PublisherShardMultiplier coded shards, sending different shards to different mesh peers. A receiving node drops redundant shards, decodes at k unique shards, follows one of two forwarding rules: publisher shards go out at once, and shards from peers are recoded after a threshold. Control messages: IDONTWANT, IHAVE, IWANT, GRAFT and PRUNE.",
      caption: "The publish and relay path as described on the docs p2p page.",
    },
  ],
  "technology/sidecar-gateway.md": [
    {
      src: "sidecar-gateway.svg",
      alt: "The consensus client keeps its normal libp2p stack and peers with the Optimum Gateway. The Gateway has a libp2p host on port 33212 facing the client, a dedup cache with SSZ re-encoding, and a mump2p host on port 33213 facing the mump2p mesh of other gateways.",
      caption: "The Gateway is a separate program that bridges the client's gossip and the mump2p mesh. Details from the Gateway README.",
    },
  ],
  "technology/flexnodes.md": [
    {
      src: "flexnodes.svg",
      alt: "A proposer sends a block to Flexnodes, which regenerate new coded equations on the path and pass them to receivers such as validators and block builders. In the plan, receivers pay the Flexnodes. Flexnodes are described as helping propagation, and no slashing is planned.",
      caption: "Where Flexnodes sit in the topology, as Optimum's videos describe them. The payment loop is planned, not running.",
    },
  ],
  "technology/network-topologies.md": [
    {
      src: "tx-lifecycle.svg",
      after: "Journey of a transaction",
      alt: "A transaction goes from a device over Wi-Fi and an access point, then shared fiber, switches and routers, to a block builder, then to a proposer who must reach many validators. About 1,000 validators (the real number is higher) would need roughly a million dedicated lines.",
      caption: "The journey of a transaction, from Optimum's lifecycle video.",
    },
    {
      src: "topologies.svg",
      after: "Ways to reach many nodes",
      alt: "Four of the ways to reach many receivers: one connection per receiver (star), multicast tree, gossip mesh and coded mesh where every connection can carry equations.",
      caption: "Four of the ways to reach many nodes, as Optimum explains them (the daisy chain is covered in the text). These are teaching models, not measurements.",
    },
  ],
  "team/timeline.md": [
    {
      src: "timeline.svg",
      alt: "Timeline from core RLNC papers (2002-2006) to Optimum founded (2024), launch and seed (2025-04-15), Hoodi tests report, Gateway source public, Lido PERCH call, ProbeLab audit, Gateway v1.3.2, and a disputed Optimum mainnet status.",
      caption: "Milestones from the sources on this page. Dashed nodes are company claims; mainnet status is disputed.",
    },
  ],
};

export type TocItem = { id: string; text: string; level: number };
