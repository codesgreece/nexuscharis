import type { MetadataRoute } from "next";
import { getPublicIndexableRoutes } from "@/content/public-routes";
import { getSiteUrl } from "@/lib/utils";

/** Indexable public URLs only — no hash sections, admin, or API routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const now = new Date();

  return getPublicIndexableRoutes().map((page) => ({
    url: page.path === "/" ? site : `${site}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
