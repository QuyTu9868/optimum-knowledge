import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { getNav } from "@/lib/content";
import Sidebar from "./Sidebar";
import Search from "./Search";
import "./globals.css";

const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Optimum Knowledge - community docs",
  description: "Source-cited facts about Optimum, rendered from a community knowledge repo. Not an official Optimum site.",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = getNav().map((g) => ({ // sidebar groups, read from ./content at build time
    title: g.title,
    pages: g.pages.map((p) => ({ file: p.file, title: p.title, href: "/" + p.slug.join("/") })),
  }));
  nav.find((g) => g.title === "Meta")?.pages.unshift({ file: "roadmap", title: "Roadmap", href: "/roadmap" }); // our placeholder page, not from the repo

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            <img src="/logo.jpg" alt="" width={28} height={28} />
            <span>Optimum Knowledge</span>
          </Link>
          <div className="topbar-right">
            <Search />
            <span className="community-pill">Community project</span>
          </div>
        </header>

        <div className="shell">
          <Sidebar nav={nav} />

          <main className="content">{children}</main>
        </div>

        <footer className="footer">
          <p>
            This site is built and maintained by a community member. It is not made, run or endorsed by the Optimum team.
            Facts come from the{" "}
            <a href="https://github.com/QuyTu9868/optimum-knowledge">optimum-knowledge</a> repo, each with its source
            link. For official information see <a href="https://www.getoptimum.xyz/">getoptimum.xyz</a>.
          </p>
        </footer>
      </body>
    </html>
  );
}
