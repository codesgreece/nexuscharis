/** Homepage SEO strategy — nationwide Greece (not city-first). */
export const HOME_SEO = {
  title: "Κατασκευή Ιστοσελίδων & Εφαρμογών στην Ελλάδα | NEXUS DEV STUDIO",
  description:
    "Κατασκευή ιστοσελίδων, e-shops, landing pages και εφαρμογών για επιχειρήσεις και επαγγελματίες σε όλη την Ελλάδα. NEXUS DEV STUDIO GREECE.",
  ogTitle: "Κατασκευή Ιστοσελίδων & Εφαρμογών στην Ελλάδα | NEXUS DEV STUDIO",
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
