"use client"; // needs the current url to highlight the open page

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavGroup = { title: string; pages: { file: string; title: string; href: string }[] }; // our type

// Left menu: collapsible groups, current page highlighted, its group open. Under /vi it lists the Vietnamese pages.
export default function Sidebar({ nav, viNav }: { nav: NavGroup[]; viNav: NavGroup[] }) {
  const pathname = usePathname(); // e.g. "/technology/rlnc"
  const isVi = pathname === "/vi" || pathname.startsWith("/vi/");
  const groups = isVi ? viNav : nav;

  return (
    <nav className="sidebar" aria-label="Docs">
      {groups.map((group) => {
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
      {isVi && (
        <p className="nav-note">
          Các trang khác chưa có bản dịch. <Link href="/">Xem bản tiếng Anh đầy đủ</Link>
        </p>
      )}
    </nav>
  );
}
