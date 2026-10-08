/**
 * Compact monthly-service cards shown under main website packages.
 * Prices/features sourced from growth-services — do not invent values here.
 */
import { GROW_PAGE, monthlyServices } from "@/content/growth-services";

export type PackageMonthlyCard = {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  href: string;
};

function pickMonthly(
  id: string,
  overrides: Partial<Pick<PackageMonthlyCard, "title" | "description" | "features">>,
): PackageMonthlyCard {
  const source = monthlyServices.find((service) => service.id === id);
  if (!source) {
    throw new Error(`Missing monthly service config: ${id}`);
  }

  return {
    id: source.id,
    title: overrides.title ?? source.title,
    description: overrides.description ?? source.description,
    price: source.price,
    features: overrides.features ?? (source.features ?? []).slice(0, 3),
    href: `${GROW_PAGE.path}#${source.id}`,
  };
}

/** Secondary monthly offerings under the main construction packages. */
export const packageMonthlyCards: PackageMonthlyCard[] = [
  pickMonthly("website-care", {
    description: "Μηνιαία υποστήριξη & μικρές αλλαγές",
    features: ["Μικρές αλλαγές", "Content updates", "Technical maintenance"],
  }),
  pickMonthly("seo", {
    title: "SEO Care",
    description: "Συνεχής on-page SEO βελτιστοποίηση",
    features: ["Technical SEO", "Keyword optimization", "Monthly report"],
  }),
  pickMonthly("seo-content", {
    title: "Content Updates",
    description: "SEO άρθρα & περιεχόμενο κάθε μήνα",
    features: ["SEO articles", "Keyword research", "Internal linking"],
  }),
  pickMonthly("dedicated-support", {
    title: "Technical Support",
    description: "Προτεραιότητα σε fixes & updates",
    features: ["Technical fixes", "Performance monitoring", "Priority support"],
  }),
];
