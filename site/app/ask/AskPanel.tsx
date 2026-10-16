"use client"; // needs typing, sending and showing answers in the browser

import { useState } from "react";

type Turn = { question: string; html?: string; error?: string }; // our type: one question and its answer

const EXAMPLES = ["What is RLNC?", "Who are the co-founders?", "Is Optimum on mainnet?"]; // our starter questions

// Question box plus the list of answers. Each question is answered on its own (no chat memory).
export default function AskPanel() {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);

  async function send(q: string) {
    const text = q.trim();
    if (!text || busy) return;
    setBusy(true);
    setQuestion("");
    setTurns((t) => [{ question: text }, ...t]);
    let next: Turn;
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      next = res.ok ? { question: text, html: data.html } : { question: text, error: data.error };
    } catch {
      next = { question: text, error: "Could not reach the server. Check your connection, then ask again." };
    }
    setTurns((t) => [next, ...t.slice(1)]);
    setBusy(false);
  }

  return (
    <div className="ask">
      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault();
          send(question);
        }}
      >
        <textarea
          value={question}
          maxLength={500}
          rows={3}
          placeholder="Ask about Optimum, e.g. how fast is it on mainnet?"
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(question);
            }
          }}
        />
        <div className="ask-row">
          <div className="ask-examples">
            {EXAMPLES.map((ex) => (
              <button type="button" key={ex} onClick={() => send(ex)} disabled={busy}>
                {ex}
              </button>
            ))}
          </div>
          <button type="submit" className="ask-send" disabled={busy || !question.trim()}>
            {busy ? "Answering..." : "Ask"}
          </button>
        </div>
      </form>

      {turns.map((t, i) => (
        <section key={turns.length - i} className="ask-turn">
          <p className="ask-q">{t.question}</p>
          {t.html && <div className="prose ask-a" dangerouslySetInnerHTML={{ __html: t.html }} />}
          {t.error && <p className="ask-error">{t.error}</p>}
          {!t.html && !t.error && <p className="ask-pending">Reading the knowledge base...</p>}
        </section>
      ))}
    </div>
  );
}
