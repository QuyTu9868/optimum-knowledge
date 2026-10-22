import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { getNav, getViPages, SECTIONS, SECTION_VI } from "@/lib/content";
import Sidebar from "./Sidebar";
import LangSwitch from "./LangSwitch";
import ThemeToggle from "./ThemeToggle";
import Search from "./Search";
import Mascot from "./Mascot";
import "./globals.css";

const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono" });

const DESCRIPTION = "Source-cited facts about Optimum, rendered from a community knowledge repo. Not an official Optimum site."; // our constant

export const metadata: Metadata = {
  metadataBase: new URL("https://optimum-knowledge.vercel.app"), // so share-image links become absolute
  title: "Optimum Knowledge - community docs",
  description: DESCRIPTION,
  icons: { icon: "/logo.jpg" },
  openGraph: { title: "Optimum Knowledge - community docs", description: DESCRIPTION, siteName: "Optimum Knowledge", type: "website" }, // image: app/opengraph-image.png
  twitter: { card: "summary_large_image", title: "Optimum Knowledge - community docs", description: DESCRIPTION }, // image: app/twitter-image.png
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = getNav().map((g) => ({ // sidebar groups, read from ./content at build time
    title: g.title,
    pages: g.pages.map((p) => ({ file: p.file, title: p.title, href: "/" + p.slug.join("/") })),
  }));
  nav.find((g) => g.title === "Meta")?.pages.unshift({ file: "roadmap", title: "Roadmap", href: "/roadmap" }); // our placeholder page, not from the repo

  // Vietnamese pages grouped like the English ones, for the sidebar under /vi. Titles are the pages' own Vietnamese headings.
  const viPages = getViPages();
  const viNav = [
    ...(viPages.some((p) => p.file === "vi/README.md") ? [{ title: "Trang chủ", pages: [{ file: "vi/README.md", title: "Giới thiệu", href: "/vi" }] }] : []),
    ...SECTIONS.map((s) => ({
      title: SECTION_VI[s.title],
      pages: viPages.filter((p) => p.file.startsWith(`vi/${s.dir}/`)).map((p) => ({ file: p.file, title: p.title, href: "/" + p.slug.join("/") })),
    })).filter((g) => g.pages.length > 0),
  ];
  const viHrefs = viPages.map((p) => "/" + p.slug.join("/").replace(/^vi/, "")).filter((h) => h !== "/"); // english urls that have a Vietnamese copy

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before the first paint so the page does not flash the wrong colours. */}
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }} />
      </head>
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            <img src="/logo.jpg" alt="" width={28} height={28} />
            <span>Optimum Knowledge</span>
          </Link>
          <div className="topbar-right">
            <Search />
            <LangSwitch viHrefs={viHrefs} />
            <ThemeToggle />
            <span className="community-pill">Community<span className="pill-extra"> project</span></span>
          </div>
        </header>

        <div className="shell">
          <Sidebar nav={nav} viNav={viNav} />

          <main className="content">{children}</main>
        </div>

        <Mascot />

        <footer className="footer">
          <p>
            This site is built and maintained by a community member. It is not made, run or endorsed by the Optimum team.
            Facts come from the{" "}
            <a href="https://github.com/QuyTu9868/optimum-knowledge">optimum-knowledge</a> repo, each with its source
            link. For official information see <a href="https://www.getoptimum.xyz/">getoptimum.xyz</a>. The mascot Op is a community creation, not an official Optimum character.
          </p>
          <p lang="vi">
            Site này do một thành viên cộng đồng xây dựng, không phải của đội ngũ Optimum. Bản tiếng Việt là bản dịch cộng đồng, bản tiếng Anh là bản gốc.
          </p>
        </footer>
      </body>
    </html>
  );
}
