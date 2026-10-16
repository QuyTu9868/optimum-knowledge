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
            An AI model (Gemini) reads the files on this site and answers from them only, with the source file and tag
            for each fact. It can still make mistakes: open the cited file before you quote anything.
          </p>
        </div>
        <AskPanel />
      </article>
    </div>
  );
}
