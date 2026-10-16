import type { DocPage, TocItem } from "@/lib/content";

const REPO_BLOB = "https://github.com/QuyTu9868/optimum-knowledge/blob/main/"; // our constant

type Props = { meta: DocPage; html: string; toc: TocItem[]; section?: string };

// One rendered doc: section label, meta line, Markdown body, and the "On this page" column.
export default function DocView({ meta, html, toc, section }: Props) {
  return (
    <div className="doc-wrap">
      <article className="doc">
        {section && <p className="crumb">{section}</p>}
        {(meta.lastVerified || meta.status) && (
          <div className="doc-meta">
            {meta.lastVerified && <span>Last verified {meta.lastVerified}</span>}
            {meta.status && <span>Status: {meta.status}</span>}
            <a href={REPO_BLOB + meta.file}>View source file</a>
          </div>
        )}
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      {toc.length > 1 && (
        <aside className="toc" aria-label="On this page">
          <p className="toc-title">On this page</p>
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
