import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Single-page marketing site: the canonical URL is the homepage. Primary
 * on-page sections are anchor targets on that same URL, so they don't need
 * separate sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
