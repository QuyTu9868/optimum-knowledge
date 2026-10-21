// Reads Markdown files from ./content (the cloned knowledge repo) and turns them into pages.
import fs from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { marked } from "marked";

const CONTENT_ROOT = path.join(process.cwd(), "content"); // our constant

// Splits the front matter (the YAML block between two --- lines) from the Markdown body. Our helper.
function matter(raw: string): { data: Record<string, any>; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return m ? { data: (parseYaml(m[1]) as Record<string, any>) ?? {}, content: raw.slice(m[0].length) } : { data: {}, content: raw };
}

// Sidebar order, matching the README sections. Our own data.
export const SECTIONS: { title: string; dir: string }[] = [
  { title: "Technology", dir: "technology" },
  { title: "Products", dir: "products" },
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
  lang?: string; // "vi" for Vietnamese copies
  translationOf?: string; // vi pages: the English file this is a translation of
  sourceSha?: string; // vi pages: short hash of that English file when it was translated
};

// Turns "technology/rlnc.md" into its page info. Our helper.
function readMeta(file: string): DocPage {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), "utf8");
  const { data, content } = matter(raw);
  const heading = content.match(/^#\s+(.+)$/m)?.[1];
  return {
    slug: file.replace(/\.md$/, "").split("/"),
    file,
    title: (file.startsWith("vi/") ? heading : data.title) ?? heading ?? file, // Vietnamese pages show their own heading
    lastVerified: data.last_verified ? String(data.last_verified instanceof Date ? data.last_verified.toISOString().slice(0, 10) : data.last_verified) : undefined,
    status: data.status,
    lang: data.lang,
    translationOf: data.translation_of,
    sourceSha: data.source_sha ? String(data.source_sha) : undefined,
  };
}

// Short hash of an English file, used to notice when a Vietnamese copy is older than its source. Our helper.
export function shaOf(file: string): string {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), "utf8").replace(/\r\n/g, "\n");
  return createHash("sha256").update(raw).digest("hex").slice(0, 12);
}

// Vietnamese pages found in content/vi (home first, then the same order as the English sections). Our helper.
export function getViPages(): DocPage[] {
  const viRoot = path.join(CONTENT_ROOT, "vi");
  if (!fs.existsSync(viRoot)) return [];
  const out: DocPage[] = [];
  if (fs.existsSync(path.join(viRoot, "README.md"))) out.push({ ...readMeta("vi/README.md"), slug: ["vi"] });
  for (const s of SECTIONS) {
    const dir = path.join(viRoot, s.dir);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md")).sort()) out.push(readMeta(`vi/${s.dir}/${f}`));
  }
  return out;
}

// Group titles in Vietnamese for the sidebar and the label above a page title. Our data.
export const SECTION_VI: Record<string, string> = {
  Technology: "Công nghệ",
  Products: "Sản phẩm",
  "Team and history": "Đội ngũ và lịch sử",
  Results: "Kết quả",
  Ecosystem: "Hệ sinh thái",
  Code: "Mã nguồn",
  Meta: "Khác",
};

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
export function renderFile(file: string): { meta: DocPage; html: string; toc: TocItem[]; section?: string; stale?: boolean } {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), "utf8");
  const { content } = matter(raw);
  const dir = path.posix.dirname(file);
  const isVi = file.startsWith("vi/");

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
      let resolved = path.posix.normalize(path.posix.join(dir, target));
      // A Vietnamese file links like the English one. If there is no Vietnamese copy of the target, point at the English file.
      if (isVi && resolved.startsWith("vi/") && !fs.existsSync(path.join(CONTENT_ROOT, resolved))) resolved = resolved.slice(3);
      if (resolved.endsWith(".md")) {
        const route = resolved === "README.md" ? "/" : resolved === "vi/README.md" ? "/vi" : "/" + resolved.replace(/\.md$/, "");
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
  const englishFile = isVi ? (readMeta(file).translationOf ?? "") : file;
  const englishH2 = isVi && englishFile ? [...matter(fs.readFileSync(path.join(CONTENT_ROOT, englishFile), "utf8")).content.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim()) : [];
  for (const d of DIAGRAMS[englishFile] ?? []) {
    const text = isVi ? (DIAGRAM_VI[d.src] ?? d) : d;
    const note = isVi ? "Sơ đồ do tác giả site vẽ từ các dữ kiện trong trang này." : "Diagram drawn by the site author from the facts on this page.";
    const fig = `<figure class="diagram"><img src="/diagrams/${isVi ? d.src.replace(".svg", "-vi.svg") : d.src}" alt="${text.alt}" /><figcaption>${text.caption} <span class="diagram-note">${note}</span></figcaption></figure>`;
    let at = -1;
    let len = 0;
    if (!d.after) {
      at = withDiagram.indexOf("</h1>");
      len = 5;
    } else if (isVi) {
      // Same heading position as in the English page: the n-th h2.
      const n = englishH2.findIndex((h) => slugify(h) === slugify(d.after!));
      const heads = [...withDiagram.matchAll(/<h2 id="[^"]*">.*?<\/h2>/g)];
      if (n >= 0 && heads[n]) {
        at = heads[n].index!;
        len = heads[n][0].length;
      }
    } else {
      const tag = `<h2 id="${slugify(d.after)}">${d.after}</h2>`; // find by text, no regular expression escaping needed
      at = withDiagram.indexOf(tag);
      len = tag.length;
    }
    if (at >= 0) withDiagram = withDiagram.slice(0, at + len) + fig + withDiagram.slice(at + len);
  }

  let meta = file === "README.md" ? { ...readMeta(file), slug: [] } : readMeta(file);
  if (file === "vi/README.md") meta = { ...meta, slug: ["vi"] };
  const sectionKey = isVi ? SECTIONS.find((x) => x.dir === file.split("/")[1])?.title : getNav().find((g) => g.pages.some((p) => p.file === file))?.title;
  const section = isVi && sectionKey ? SECTION_VI[sectionKey] : sectionKey; // for the label above the title
  const stale = isVi && !!meta.translationOf && meta.sourceSha !== shaOf(meta.translationOf); // English changed after this translation
  return { meta, html: withDiagram, toc, section, stale };
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
      alt: "Timeline from core RLNC papers (2002-2006) to Optimum founded (2024), launch and seed (2025-04-15), Hoodi tests report, Gateway source public, Lido PERCH call, ProbeLab audit, Gateway v1.3.2, and the 2026-10-20 announcement that mump2p is live on Ethereum mainnet.",
      caption: "Milestones from the sources on this page. Dashed nodes are company claims; the mainnet launch is Optimum's own announcement and its speed and stake figures differ by source.",
    },
  ],
};

// Vietnamese alt text and captions for the same diagrams, keyed by svg file. Our data.
const DIAGRAM_VI: Record<string, { alt: string; caption: string }> = {
  "rlnc.svg": {
    alt: "Ba mảnh dữ liệu gốc được biến thành các shard, mỗi shard là một tổ hợp ngẫu nhiên của các mảnh. Relay trộn các shard đang giữ thành một shard mới mà không cần giải mã. Bên nhận cần k tổ hợp độc lập tuyến tính bất kỳ rồi giải ra các mảnh gốc.",
    caption: "Từ mảnh đến tổ hợp và ngược lại: relay trộn shard mà không giải mã, bên nhận dựng lại dữ liệu từ k tổ hợp độc lập tuyến tính bất kỳ.",
  },
  "rlnc-equations.svg": {
    alt: "Với bản sao thuần túy, bên nhận có thể giữ x1 hai lần mà vẫn chờ x3. Với ba tổ hợp khác nhau như 3x1 + 2x2 + x3, ba tổ hợp độc lập bất kỳ là đủ để giải ra x1, x2 và x3.",
    caption: "Bản sao lặp lại không thêm gì, còn mọi tổ hợp đều có giá trị (ví dụ trên bảng của Médard, số liệu chỉ để minh họa).",
  },
  "rlnc-recoding.svg": {
    alt: "Trên chuỗi nguồn - relay 1 - relay 2 - bên nhận, mỗi chặng đều có mất gói. Với mã hóa đầu cuối, mất mát của mọi chặng cộng dồn; với tái mã hóa, mỗi chặng tự bù phần mất của mình. Ví dụ ngắn hơn của Optimum (nguồn, một relay, bên nhận): 9 lượt truyền nếu chỉ chuyển tiếp, 8 lượt trong 8 bước nếu giải mã rồi mã hóa lại, 8 lượt trong 5 bước nếu tái mã hóa.",
    caption: "Tái mã hóa bù mất mát theo từng chặng. Số lần truyền là ví dụ riêng của Optimum.",
  },
  "why-gossip-slow.svg": {
    alt: "Một slot Ethereum dài 12 giây, trong đó khoảng 4 giây là lúc validator thống nhất về head của chuỗi. Validator ở xa nguồn khối thấy thông tin cũ hơn và chịu thiệt nhiều hơn vì các bản sao lặp lại, tạo ra lợi thế cho việc đặt máy cùng vị trí (colocation) gần nguồn. Các tổ hợp mã hóa khiến mọi mảnh nhận được đều có giá trị.",
    caption: "Vì sao dữ liệu lặp lại gây hại, theo lập luận của Médard. Đây là cách lý giải của Optimum, không phải số đo.",
  },
  "publish-path.svg": {
    alt: "Publisher đệm và chia thông điệp thành k mảnh rồi tạo ShredFactor nhân PublisherShardMultiplier shard, gửi các shard khác nhau cho các peer khác nhau trong mesh. Nút nhận loại bỏ shard dư, giải mã khi có k shard độc lập, và theo một trong hai quy tắc chuyển tiếp: shard từ publisher đi ngay, shard từ peer được tái mã hóa sau một ngưỡng. Thông điệp điều khiển: IDONTWANT, IHAVE, IWANT, GRAFT và PRUNE.",
    caption: "Đường phát hành và chuyển tiếp như mô tả trên trang p2p của docs.",
  },
  "sidecar-gateway.svg": {
    alt: "Client đồng thuận vẫn giữ stack libp2p thường và kết nối với Optimum Gateway. Gateway có host libp2p ở cổng 33212 hướng về client, bộ nhớ đệm chống trùng kèm mã hóa lại SSZ, và host mump2p ở cổng 33213 hướng về mesh mump2p của các gateway khác.",
    caption: "Gateway là chương trình riêng, bắc cầu giữa gossip của client và mesh mump2p. Chi tiết lấy từ README của Gateway.",
  },
  "flexnodes.svg": {
    alt: "Proposer gửi khối tới các Flexnode, các Flexnode tạo phương trình mã hóa mới ngay trên đường đi và chuyển cho bên nhận như validator và block builder. Theo kế hoạch, bên nhận trả tiền cho Flexnode. Flexnode được mô tả là hỗ trợ lan truyền và không có kế hoạch slashing.",
    caption: "Vị trí của Flexnode trong topology, theo mô tả trong video của Optimum. Vòng thanh toán mới là kế hoạch, chưa chạy.",
  },
  "tx-lifecycle.svg": {
    alt: "Giao dịch đi từ thiết bị qua Wi-Fi và điểm truy cập, rồi cáp quang dùng chung, switch và router tới block builder, sau đó tới proposer, nút này phải gửi được tới nhiều validator. Khoảng 1,000 validator (con số thật cao hơn) cần khoảng một triệu đường riêng.",
    caption: "Hành trình của một giao dịch, theo video về vòng đời giao dịch của Optimum.",
  },
  "topologies.svg": {
    alt: "Bốn trong số các cách để đến được nhiều bên nhận: mỗi bên nhận một kết nối (sao), cây multicast, mesh gossip, và mesh mã hóa nơi mọi kết nối đều có thể mang phương trình.",
    caption: "Bốn trong số các cách đến được nhiều nút, theo giải thích của Optimum (daisy chain có trong phần chữ). Đây là mô hình để giảng giải, không phải số đo.",
  },
  "timeline.svg": {
    alt: "Dòng thời gian từ các bài báo RLNC nền tảng (2002-2006) đến Optimum thành lập (2024), ra mắt và vòng seed (2025-04-15), báo cáo thử nghiệm Hoodi, mã nguồn Gateway công khai, cuộc gọi Lido PERCH, kiểm toán ProbeLab, Gateway v1.3.2, và thông báo ngày 2026-10-20 rằng mump2p đã chạy trên mainnet Ethereum.",
    caption: "Các mốc từ nguồn trên trang này. Nút nét đứt là tuyên bố của công ty; việc ra mắt mainnet là thông báo của chính Optimum, còn số liệu tốc độ và stake khác nhau tùy nguồn.",
  },
};

export type TocItem = { id: string; text: string; level: number };
