import { absoluteUrl } from "@/lib/utils";

/** Homepage SEO strategy — nationwide Greece (not city-first). */
export const HOME_SEO = {
  title: "NEXUS DEV STUDIO GREECE | Κατασκευή Ιστοσελίδων & Εφαρμογών",
  description:
    "Το NEXUS DEV STUDIO GREECE δημιουργεί επαγγελματικές ιστοσελίδες, landing pages, e-shops, web εφαρμογές και custom digital solutions για επιχειρήσεις και επαγγελματίες σε όλη την Ελλάδα.",
  ogTitle: "NEXUS DEV STUDIO GREECE | Κατασκευή Ιστοσελίδων & Εφαρμογών",
  h1: "Κατασκευή Ιστοσελίδων & Εφαρμογών στην Ελλάδα",
  keywords: [
    "κατασκευή ιστοσελίδων",
    "κατασκευή ιστοσελίδων Ελλάδα",
    "web development Ελλάδα",
    "web design",
    "κατασκευή e-shop",
    "landing pages",
    "κατασκευή εφαρμογών",
    "Android apps",
    "Windows apps",
    "custom digital solutions",
    "επαγγελματική ιστοσελίδα",
    "website για επιχείρηση",
  ],
} as const;

/** Stable in-page anchors for homepage service linking. */
export const SERVICE_ANCHORS: Record<string, string> = {
  "Κατασκευή Ιστοσελίδων": "website-development",
  "Landing Pages": "landing-pages",
  "Full Websites": "full-websites",
  "E-Commerce": "ecommerce",
  "Windows Apps": "windows-apps",
  "Android / Phone Apps": "android-apps",
  "Admin Panels": "admin-panels",
};

export function serviceAnchorId(title: string): string {
  return (
    SERVICE_ANCHORS[title] ||
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

export function prefersNationwideSeo(value: string | null | undefined): boolean {
  if (!value?.trim()) return false;
  return /ελλάδ/i.test(value);
}

export type HomeSeoRecord = {
  title?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterCard?: string | null;
  robots?: string | null;
  canonicalUrl?: string | null;
};

function pickOgTitle(candidate: string | null | undefined, pageTitle: string) {
  const value = candidate?.trim();
  if (!value) return HOME_SEO.ogTitle;
  if (value.length < 24 || value.toUpperCase() === "NEXUS DEV STUDIO GREECE") {
    return HOME_SEO.ogTitle;
  }
  if (!prefersNationwideSeo(value)) return HOME_SEO.ogTitle;
  return value || pageTitle;
}

function safeHomeCanonical(candidate: string | null | undefined) {
  const fallback = absoluteUrl("/");
  if (!candidate) return fallback;
  if (!candidate.startsWith("https://") || !candidate.includes("nexusdevstudio.gr")) {
    return fallback;
  }
  return candidate.replace("://nexusdevstudio.gr", "://www.nexusdevstudio.gr");
}

/** Resolves public homepage metadata. CMS values are used only when they stay nationwide. */
export function resolveHomeSeo(seo: HomeSeoRecord | null | undefined) {
  const title = prefersNationwideSeo(seo?.title) ? seo!.title!.trim() : HOME_SEO.title;
  const description = prefersNationwideSeo(seo?.metaDescription)
    ? seo!.metaDescription!.trim()
    : HOME_SEO.description;
  const keywords = seo?.keywords
    ?.split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return {
    title,
    description,
    ogTitle: pickOgTitle(seo?.ogTitle, title),
    ogDescription: prefersNationwideSeo(seo?.ogDescription)
      ? seo!.ogDescription!.trim()
      : description,
    ogImage: absoluteUrl(seo?.ogImage || "/images/founder.jpg"),
    twitterCard: (seo?.twitterCard === "summary"
      ? "summary"
      : "summary_large_image") satisfies "summary" | "summary_large_image",
    canonical: safeHomeCanonical(seo?.canonicalUrl),
    keywords: keywords && keywords.length > 0 ? keywords : [...HOME_SEO.keywords],
    robots: seo?.robots?.trim() || null,
  };
}
