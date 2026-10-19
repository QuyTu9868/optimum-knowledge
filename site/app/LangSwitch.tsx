"use client"; // needs the current url to know which language is showing

import Link from "next/link";
import { usePathname } from "next/navigation";

// EN | VI toggle. On a page that has a Vietnamese copy it jumps to that copy, otherwise to the Vietnamese home.
export default function LangSwitch({ viHrefs }: { viHrefs: string[] }) {
  const pathname = usePathname(); // e.g. "/technology/rlnc" or "/vi/technology/rlnc"
  const isVi = pathname === "/vi" || pathname.startsWith("/vi/");
  const enHref = isVi ? pathname.replace(/^\/vi/, "") || "/" : pathname;
  const viHref = isVi ? pathname : viHrefs.includes(pathname) ? "/vi" + pathname : "/vi";
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <Link href={enHref} className={isVi ? undefined : "active"} lang="en" hrefLang="en">EN</Link>
      <Link href={viHref} className={isVi ? "active" : undefined} lang="vi" hrefLang="vi">VI</Link>
    </div>
  );
}
