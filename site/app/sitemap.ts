import type { MetadataRoute } from "next";
import { getAllPages, getViPages } from "@/lib/content";

export const dynamic = "force-static"; // written once at build time

const SITE_URL = "https://optimum-knowledge.vercel.app"; // our constant: production address

// Every page, plus the Ask page. English pages that have a Vietnamese copy list it as an alternate language. Our helper.
export default function sitemap(): MetadataRoute.Sitemap {
  const vi = new Set(getViPages().map((p) => "/" + p.slug.join("/")));
  const english = getAllPages().map((p) => {
    const url = "/" + p.slug.join("/");
    const viUrl = "/vi" + url;
    return { url: SITE_URL + url, lastModified: p.lastVerified, ...(vi.has(viUrl) ? { alternates: { languages: { en: SITE_URL + url, vi: SITE_URL + viUrl } } } : {}) };
  });
  const viPages = getViPages().map((p) => ({ url: SITE_URL + "/" + p.slug.join("/"), lastModified: p.lastVerified }));
  return [{ url: SITE_URL + "/" }, ...english, ...viPages, { url: SITE_URL + "/ask" }];
}
