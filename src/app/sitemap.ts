import type { MetadataRoute } from "next";
import { getAllGrowthServiceSlugs } from "@/content/growth-pages";
import { getSiteUrl } from "@/lib/utils";

/** Indexable public URLs only — no hash sections, admin, or API routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const now = new Date();

  const pages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/grow-your-business", changeFrequency: "monthly", priority: 0.85 },
    { path: "/nexus-growth", changeFrequency: "monthly", priority: 0.9 },
    ...getAllGrowthServiceSlugs().map((slug) => ({
      path: `/grow-your-business/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.4 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
    { path: "/services-terms", changeFrequency: "yearly", priority: 0.4 },
    { path: "/copyright", changeFrequency: "yearly", priority: 0.3 },
  ];

  return pages.map((page) => ({
    url: page.path === "/" ? `${site}/` : `${site}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
