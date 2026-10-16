import type { Metadata } from "next";

export const metadata: Metadata = { title: "Roadmap - Optimum Knowledge" };

// Placeholder until Optimum publishes an official roadmap. Content to be added later.
export default function Roadmap() {
  return (
    <div className="doc-wrap">
      <article className="doc">
        <p className="crumb">Meta</p>
        <div className="prose">
          <h1>Roadmap</h1>
          <p>
            Optimum has not published an official roadmap yet (as of 2026-10-11). This page will be filled in once one
            is public, with a source link for every item.
          </p>
          <p>
            Until then, see <a href="/technology/overview">What Optimum is</a> for what is described as live or upcoming,
            and <a href="/team/timeline">Timeline</a> for past milestones.
          </p>
        </div>
      </article>
    </div>
  );
}
