"use client"; // needs the current url to highlight the open page

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavGroup = { title: string; pages: { file: string; title: string; href: string }[] }; // our type

// Left menu: collapsible groups, current page highlighted, its group open.
export default function Sidebar({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname(); // e.g. "/technology/rlnc"

  return (
    <nav className="sidebar" aria-label="Docs">
      {nav.map((group) => {
        const hasActive = group.pages.some((p) => p.href === pathname);
        return (
          <details key={group.title} className="nav-group" open={hasActive || undefined}>
            <summary className="nav-title">{group.title}</summary>
            <ul>
              {group.pages.map((p) => (
                <li key={p.file}>
                  <Link href={p.href} className={p.href === pathname ? "active" : undefined}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </nav>
  );
}
