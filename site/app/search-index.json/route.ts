import { getSearchIndex } from "@/lib/content";

export const dynamic = "force-static"; // written to a static file at build time

// Serves /search-index.json, loaded by the search box the first time it opens.
export function GET() {
  return Response.json(getSearchIndex());
}
