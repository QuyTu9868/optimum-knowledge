"use client"; // runs in the browser: typing, keyboard shortcut, results list

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchDoc } from "@/lib/content";

type Hit = SearchDoc & { snippet: string }; // our type
type Item = { kind: "page"; hit: Hit } | { kind: "ask" }; // our type: a result row is a page or the "ask AI" row

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

  // One list for pages and "ask AI". A question (ends with ? or has 5+ words) puts "ask AI" first, a keyword puts pages first.
  const q = query.trim();
  const looksLikeQuestion = /\?\s*$/.test(q) || q.split(/\s+/).length >= 5;
  const askItem: Item[] = q ? [{ kind: "ask" }] : [];
  const pageItems: Item[] = hits.map((hit) => ({ kind: "page", hit }));
  const items: Item[] = looksLikeQuestion ? [...askItem, ...pageItems] : [...pageItems, ...askItem];

  function openItem(item: Item) {
    go(item.kind === "ask" ? `/ask?q=${encodeURIComponent(q)}` : item.hit.href);
  }

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <>
      <button type="button" className="search-trigger" onClick={() => setOpen(true)}>
        <span>Search or ask AI...</span>
        <kbd>Ctrl K</kbd>
      </button>

      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)}>
          <div className="search-panel" role="dialog" aria-label="Search the docs or ask AI" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              value={query}
              placeholder="Search the docs, or type a question for the AI"
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, items.length - 1));
                if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
                if (e.key === "Enter" && items[active]) openItem(items[active]);
              }}
            />
            <div className="search-results">
              {loadError && <p className="search-empty">Could not load the search index. Reload the page and try again.</p>}
              {!loadError && !docs && <p className="search-empty">Loading pages...</p>}
              {docs && query && hits.length === 0 && (
                <p className="search-empty">No page mentions &quot;{query}&quot;. Try a shorter word, or ask the AI below.</p>
              )}
              {!q && (
                <button type="button" className="search-hit" onClick={() => go("/ask")}>
                  <span className="hit-section">Ask AI</span>
                  <span className="hit-title">Open the AI assistant</span>
                  <span className="hit-snippet">Type a question above, or open the assistant page.</span>
                </button>
              )}
              {items.map((item, i) => (
                <button
                  type="button"
                  key={item.kind === "ask" ? "ask" : item.hit.href}
                  className={"search-hit" + (i === active ? " active" : "")}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => openItem(item)}
                >
                  {item.kind === "ask" ? (
                    <>
                      <span className="hit-section">Ask AI</span>
                      <span className="hit-title">Ask: &quot;{q}&quot;</span>
                      <span className="hit-snippet">The AI answers only from this knowledge base and names the file for each fact.</span>
                    </>
                  ) : (
                    <>
                      <span className="hit-section">{item.hit.section}</span>
                      <span className="hit-title">{item.hit.title}</span>
                      <span className="hit-snippet">{item.hit.snippet}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
