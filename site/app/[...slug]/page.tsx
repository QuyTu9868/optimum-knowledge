import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPages, renderFile } from "@/lib/content";
import DocView from "../DocView";

type Props = { params: Promise<{ slug: string[] }> };

// Pre-builds one static page per Markdown file.
export function generateStaticParams() {
  return getAllPages().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false; // unknown urls go to 404

// Finds the repo file behind a url. Our helper.
function fileFor(slug: string[]) {
  return getAllPages().find((p) => p.slug.join("/") === slug.join("/"))?.file;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const file = fileFor((await params).slug);
  return file ? { title: `${renderFile(file).meta.title} - Optimum Knowledge` } : {};
}

export default async function DocPage({ params }: Props) {
  const file = fileFor((await params).slug);
  if (!file) notFound();
  const doc = renderFile(file);
  return <DocView {...doc} />;
}
