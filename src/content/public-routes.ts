import { getAllBuildServiceSlugs, SERVICES_INDEX_PATH } from "@/content/build-services";
import { getAllGrowthServiceSlugs } from "@/content/growth-pages";
import { getAllActiveJobSlugs } from "@/content/jobs";

export type PublicChangeFrequency = "weekly" | "monthly" | "yearly";

export type PublicIndexableRoute = {
  path: string;
  changeFrequency: PublicChangeFrequency;
  priority: number;
};

/** Canonical public URLs that should appear in sitemap.xml. No admin, API, or hash URLs. */
export function getPublicIndexableRoutes(): PublicIndexableRoute[] {
  return [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: SERVICES_INDEX_PATH, changeFrequency: "monthly", priority: 0.9 },
    ...getAllBuildServiceSlugs().map((slug) => ({
      path: `/services/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    { path: "/grow-your-business", changeFrequency: "monthly", priority: 0.8 },
    { path: "/nexus-growth", changeFrequency: "monthly", priority: 0.85 },
    ...getAllGrowthServiceSlugs().map((slug) => ({
      path: `/grow-your-business/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/careers", changeFrequency: "weekly", priority: 0.6 },
    ...getAllActiveJobSlugs().map((slug) => ({
      path: `/careers/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/services-terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/copyright", changeFrequency: "yearly", priority: 0.2 },
  ];
}
