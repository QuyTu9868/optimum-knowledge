import Link from "next/link";
import type { DocPage, TocItem } from "@/lib/content";

const REPO_BLOB = "https://github.com/QuyTu9868/optimum-knowledge/blob/main/"; // our constant

type Props = { meta: DocPage; html: string; toc: TocItem[]; section?: string; stale?: boolean };

// One rendered doc: section label, meta line, Markdown body, and the "On this page" column. Vietnamese copies get Vietnamese labels.
export default function DocView({ meta, html, toc, section, stale }: Props) {
  const vi = meta.lang === "vi";
  const enHref = vi && meta.translationOf ? "/" + meta.translationOf.replace(/\.md$/, "").replace(/^README$/, "") : "/";
  return (
    <div className="doc-wrap">
      <article className="doc" lang={vi ? "vi" : undefined}>
        {section && <p className="crumb">{section}</p>}
        {vi && (
          <p className="translation-note">
            Bản dịch cộng đồng. Bản tiếng Anh là bản gốc.{" "}
            <Link href={meta.translationOf ? enHref : "/"} lang="en">Read the English original</Link>
            {stale && <strong> Bản tiếng Anh đã được cập nhật sau lần dịch này, nội dung dưới đây có thể đã cũ.</strong>}
          </p>
        )}
        {(meta.lastVerified || meta.status) && (
          <div className="doc-meta">
            {meta.lastVerified && <span>{vi ? "Xác minh lần cuối" : "Last verified"} {meta.lastVerified}</span>}
            {meta.status && <span>{vi ? "Trạng thái" : "Status"}: {meta.status}</span>}
            <a href={REPO_BLOB + meta.file}>{vi ? "Xem file nguồn" : "View source file"}</a>
          </div>
        )}
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      {toc.length > 1 && (
        <aside className="toc" aria-label={vi ? "Trong trang này" : "On this page"}>
          <p className="toc-title">{vi ? "Trong trang này" : "On this page"}</p>
          <ul>
            {toc.map((t) => (
              <li key={t.id} className={t.level === 3 ? "toc-sub" : undefined}>
                <a href={`#${t.id}`}>{t.text}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
