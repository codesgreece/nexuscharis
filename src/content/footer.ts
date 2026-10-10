/**
 * Central footer link config — update URLs here when dedicated pages are added.
 * Only real, existing internal destinations (no placeholder hashes).
 */

export type FooterNavLink = {
  href: string;
  label: string;
};

/** Primary site navigation (column 2). */
export const footerNavigationLinks: FooterNavLink[] = [
  { href: "/", label: "Αρχική" },
  { href: "/#about", label: "Σχετικά" },
  { href: "/#packages", label: "Πακέτα" },
  { href: "/grow-your-business", label: "Grow Your Business" },
  { href: "/nexus-growth", label: "NEXUS Growth" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Επικοινωνία" },
];

/**
 * Service discovery links (column 3).
 * Homepage service anchors + Grow Your Business dedicated routes.
 */
export const footerServiceLinks: FooterNavLink[] = [
  { href: "/#website-development", label: "Ιστοσελίδες" },
  { href: "/#landing-pages", label: "Landing Pages" },
  { href: "/#ecommerce", label: "E-Commerce" },
  { href: "/#services", label: "Web Applications" },
  { href: "/grow-your-business/seo", label: "SEO" },
  { href: "/grow-your-business/website-care", label: "Website Care" },
  { href: "/grow-your-business/local-seo", label: "Local SEO" },
  { href: "/grow-your-business/branding", label: "Branding" },
  { href: "/nexus-growth", label: "NEXUS Growth" },
];

/** Existing legal routes only. */
export const footerLegalLinks: FooterNavLink[] = [
  { href: "/privacy", label: "Πολιτική Απορρήτου" },
  { href: "/cookies", label: "Πολιτική Cookies" },
  { href: "/terms", label: "Όροι Χρήσης" },
  { href: "/services-terms", label: "Όροι Υπηρεσιών" },
];

export const footerBrandLine = "Websites. Apps. Digital Growth.";

export const footerCta = {
  title: "Έχεις ένα project στο μυαλό σου;",
  body: "Ας δημιουργήσουμε κάτι που λειτουργεί για την επιχείρησή σου.",
  button: "Ξεκίνα ένα Project",
  href: "/#contact",
} as const;

export type FooterSocialKey =
  | "facebookUrl"
  | "instagramUrl"
  | "linkedinUrl"
  | "twitterUrl"
  | "dribbbleUrl";

export type FooterSocialInput = Partial<Record<FooterSocialKey, string | null | undefined>>;
