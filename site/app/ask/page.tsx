import type { Metadata } from "next";
import AskPanel from "./AskPanel";

export const metadata: Metadata = { title: "Ask AI - Optimum Knowledge" };

export default function AskPage() {
  return (
    <div className="doc-wrap">
      <article className="doc">
        <p className="crumb">Assistant</p>
        <div className="prose">
          <h1>Ask the knowledge base</h1>
          <p>
            An AI model (Gemini) reads the files on this site and answers from them only. Each fact has a number that points to the exact line it came from,
            with its tag and original source link. It can still make mistakes: check the source line before you quote anything.
          </p>
        </div>
        <AskPanel />
      </article>
    </div>
  );
}
