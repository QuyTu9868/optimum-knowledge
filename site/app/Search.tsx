"use client"; // runs in the browser: typing, keyboard shortcut, results list

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchDoc } from "@/lib/content";

type Hit = SearchDoc & { snippet: string }; // our type

// Finds pages containing every typed word; title matches rank first. Our helper.
function search(docs: SearchDoc[], query: string): Hit[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return docs
    .map((d) => {
      const hay = (d.title + " " + d.text).toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      const titleHits = words.filter((w) => d.title.toLowerCase().includes(w)).length;
      const at = d.text.toLowerCase().indexOf(words[0]);
      const start = Math.max(0, at - 50);
      const snippet = at < 0 ? d.text.slice(0, 120) : (start > 0 ? "..." : "") + d.text.slice(start, at + 90) + "...";
      return { ...d, snippet, score: titleHits };
    })
    .filter((h): h is Hit & { score: number } => h !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export default function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null); // null = not loaded yet
  const [loadError, setLoadError] = useState(false);
  const [active, setActive] = useState(0); // highlighted result index
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K / Cmd+K opens the box, Escape closes it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Load the index the first time the box opens.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.select(); // focus and select the old query so typing replaces it
    if (docs) return;
    fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setDocs)
      .catch(() => setLoadError(true));
  }, [open, docs]);

  const hits = docs ? search(docs, query) : [];

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <>
      <button type="button" className="search-trigger" onClick={() => setOpen(true)}>
        <span>Search...</span>
        <kbd>Ctrl K</kbd>
      </button>

      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)}>
          <div className="search-panel" role="dialog" aria-label="Search docs" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              value={query}
              placeholder="Search the knowledge base"
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, hits.length - 1));
                if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
                if (e.key === "Enter" && hits[active]) go(hits[active].href);
              }}
            />
            <div className="search-results">
              {loadError && <p className="search-empty">Could not load the search index. Reload the page and try again.</p>}
              {!loadError && !docs && <p className="search-empty">Loading pages...</p>}
              {docs && query && hits.length === 0 && (
                <p className="search-empty">No page mentions &quot;{query}&quot;. Try a shorter word, or check unverified.md for claims without a source.</p>
              )}
              {hits.map((h, i) => (
                <button
                  type="button"
                  key={h.href}
                  className={"search-hit" + (i === active ? " active" : "")}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(h.href)}
                >
                  <span className="hit-section">{h.section}</span>
                  <span className="hit-title">{h.title}</span>
                  <span className="hit-snippet">{h.snippet}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
