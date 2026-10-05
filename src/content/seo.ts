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
