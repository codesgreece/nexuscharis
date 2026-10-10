/**
 * Site header / mobile navigation config.
 * Keep hrefs pointed at real routes or existing homepage anchors only.
 */

export type NavLinkItem = {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
};

export type NavDropdownItem = NavLinkItem & {
  description?: string;
};

export type GrowFeaturedItem = {
  href: string;
  label: string;
  description: string;
  price: string;
  badge: string;
  cta: string;
};

export const buildServices: NavDropdownItem[] = [
  {
    href: "/#website-development",
    label: "Websites",
    description: "Επαγγελματικές ιστοσελίδες για επιχειρήσεις",
  },
  {
    href: "/#landing-pages",
    label: "Landing Pages",
    description: "Σελίδες που στοχεύουν σε συγκεκριμένη ενέργεια",
  },
  {
    href: "/#ecommerce",
    label: "E-Commerce",
    description: "Ηλεκτρονικά καταστήματα με παραγγελίες",
  },
  {
    href: "/#services",
    label: "Web Applications",
    description: "Custom εφαρμογές και admin panels",
  },
];

export const growServices: NavDropdownItem[] = [
  {
    href: "/grow-your-business/seo",
    label: "SEO",
    description: "Βελτίωσε την παρουσία σου στη Google",
  },
  {
    href: "/grow-your-business/website-care",
    label: "Website Care",
    description: "Κράτα το website σου ενημερωμένο",
  },
  {
    href: "/grow-your-business/local-seo",
    label: "Local SEO",
    description: "Βρες περισσότερους πελάτες στην περιοχή σου",
  },
  {
    href: "/grow-your-business/speed-boost",
    label: "Speed Boost",
    description: "Κάνε το website σου ταχύτερο",
  },
  {
    href: "/grow-your-business/branding",
    label: "Branding",
    description: "Δημιούργησε ισχυρή εταιρική εικόνα",
  },
  {
    href: "/grow-your-business/professional-email",
    label: "Professional Email",
    description: "Επαγγελματικό email με το domain σου",
  },
  {
    href: "/grow-your-business/seo-content",
    label: "SEO Content",
    description: "Περιεχόμενο που βοηθά την οργανική ανάπτυξη",
  },
  {
    href: "/grow-your-business/social-media",
    label: "Social Media Content",
    description: "Σταθερή παρουσία στα social media",
  },
];

export const growFeatured: GrowFeaturedItem = {
  href: "/nexus-growth",
  label: "NEXUS Growth",
  description: "Όλα σε ένα. Μηνιαία ανάπτυξη για την επιχείρησή σου.",
  price: "119€/μήνα",
  badge: "BEST VALUE",
  cta: "Δες το NEXUS Growth →",
};

export const primaryNav = [
  { href: "/#home", label: "Αρχική", kind: "link" as const, hash: "#home" },
  { href: "/#about", label: "Σχετικά", kind: "link" as const, hash: "#about" },
  {
    href: "/#services",
    label: "Υπηρεσίες",
    kind: "services" as const,
    hash: "#services",
  },
  { href: "/#packages", label: "Πακέτα", kind: "link" as const, hash: "#packages" },
  {
    href: "/grow-your-business",
    label: "Grow Your Business",
    kind: "grow" as const,
  },
  { href: "/#portfolio", label: "Portfolio", kind: "link" as const, hash: "#portfolio" },
  { href: "/careers", label: "Careers", kind: "route" as const },
  { href: "/#faq", label: "FAQ", kind: "link" as const, hash: "#faq" },
  { href: "/#contact", label: "Επικοινωνία", kind: "link" as const, hash: "#contact" },
];

export const headerCta = {
  href: "/#contact",
  label: "Ζήτησε Προσφορά",
} as const;

/** Homepage section ids used for scroll-spy active state. */
export const homepageHashIds = [
  "home",
  "about",
  "services",
  "website-development",
  "landing-pages",
  "ecommerce",
  "packages",
  "portfolio",
  "faq",
  "contact",
] as const;

export function isGrowNavActive(pathname: string) {
  return (
    pathname === "/grow-your-business" ||
    pathname.startsWith("/grow-your-business/") ||
    pathname === "/nexus-growth" ||
    pathname.startsWith("/nexus-growth/")
  );
}

export function isServicesNavActive(pathname: string, hash: string) {
  if (pathname.startsWith("/services")) return true;
  if (pathname !== "/" && pathname !== "") return false;
  const h = hash.startsWith("#") ? hash.slice(1) : hash;
  return (
    h === "services" ||
    h === "website-development" ||
    h === "landing-pages" ||
    h === "full-websites" ||
    h === "ecommerce" ||
    h === "windows-apps" ||
    h === "android-apps" ||
    h === "admin-panels"
  );
}

export function isCareersNavActive(pathname: string) {
  return pathname === "/careers" || pathname.startsWith("/careers/");
}
