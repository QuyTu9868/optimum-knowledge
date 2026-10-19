import type { MetadataRoute } from "next";

// Everything may be crawled except the Ask API (it costs quota per call).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://optimum-knowledge.vercel.app/sitemap.xml",
  };
}
