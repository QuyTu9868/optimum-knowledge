import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPages, getViPages, renderFile } from "@/lib/content";
import DocView from "../DocView";

type Props = { params: Promise<{ slug: string[] }> };

// Pre-builds one static page per Markdown file, English and Vietnamese.
export function generateStaticParams() {
  return [...getAllPages(), ...getViPages()].map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false; // unknown urls go to 404

// Finds the repo file behind a url. Our helper.
function fileFor(slug: string[]) {
  return [...getAllPages(), ...getViPages()].find((p) => p.slug.join("/") === slug.join("/"))?.file;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const file = fileFor(slug);
  if (!file) return {};
  const meta = renderFile(file).meta;
  // English and Vietnamese copies point at each other so search engines serve the right language.
  const here = "/" + slug.join("/");
  const isVi = slug[0] === "vi";
  const enUrl = isVi ? (meta.translationOf ? "/" + meta.translationOf.replace(/\.md$/, "") : "/") : here;
  const viUrl = isVi ? here : "/vi" + here;
  const hasPair = isVi ? true : getViPages().some((p) => "/" + p.slug.join("/") === viUrl);
  return {
    title: `${meta.title} - Optimum Knowledge`,
    alternates: { canonical: here, ...(hasPair ? { languages: { en: enUrl, vi: viUrl } } : {}) },
  };
}

export default async function DocPage({ params }: Props) {
  const file = fileFor((await params).slug);
  if (!file) notFound();
  const doc = renderFile(file);
  return <DocView {...doc} />;
}
