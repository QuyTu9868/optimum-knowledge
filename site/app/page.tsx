import { renderFile } from "@/lib/content";
import DocView from "./DocView";

// Home page: the knowledge repo's README.
export default function Home() {
  const doc = renderFile("README.md");
  return <DocView {...doc} />;
}
