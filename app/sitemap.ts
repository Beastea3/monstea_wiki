import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { slugToWikiPath } from "@/lib/wiki-paths";
import { getAllWikiDocs } from "@/lib/wiki";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  const wikiDocs = getAllWikiDocs();

  const entries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...wikiDocs.map((doc) => ({
      url: `${base}${slugToWikiPath(doc.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: doc.slug.length ? 0.8 : 0.85,
    })),
  ];

  return entries;
}
