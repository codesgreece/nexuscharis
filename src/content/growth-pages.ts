import {
  monthlyServices,
  nexusGrowth,
  oneTimeServices,
  type GrowthService,
} from "@/content/growth-services";

export type GrowthPageDef = {
  slug: string;
  serviceId: string;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  heroEyebrow: string;
};

/** Individual Grow Your Business service landing pages. */
export const growthServicePages: GrowthPageDef[] = [
  {
    slug: "seo",
    serviceId: "seo",
    navLabel: "SEO",
    seoTitle: "SEO Υπηρεσίες | Grow Your Business",
    seoDescription:
      "Μηνιαία SEO υπηρεσία από τη NEXUS DEV STUDIO: technical SEO, on-page βελτιστοποίηση, monitoring και αναφορές για επιχειρήσεις στην Ελλάδα.",
    heroEyebrow: "Grow Your Business · SEO",
  },
  {
    slug: "website-care",
    serviceId: "website-care",
    navLabel: "Website Care",
    seoTitle: "Website Care | Μηνιαία Υποστήριξη Website",
    seoDescription:
      "Website Care από τη NEXUS: μηνιαίες ενημερώσεις περιεχομένου, τεχνική συντήρηση και priority support χωρίς μακροχρόνια δέσμευση.",
    heroEyebrow: "Grow Your Business · Website Care",
  },
  {
    slug: "local-seo",
    serviceId: "local-seo-monthly",
    navLabel: "Local SEO",
    seoTitle: "Local SEO | Google Business & Τοπική Προβολή",
    seoDescription:
      "Local SEO για επιχειρήσεις στην Ελλάδα: βελτιστοποίηση Google Business Profile, τοπικά keywords και συνεχής τοπική παρουσία.",
    heroEyebrow: "Grow Your Business · Local SEO",
  },
  {
    slug: "speed-boost",
    serviceId: "speed-boost",
    navLabel: "Speed Boost",
    seoTitle: "Speed Boost | Επιτάχυνση Website",
    seoDescription:
      "Speed Boost από τη NEXUS: βελτιστοποίηση Core Web Vitals, εικόνων και απόδοσης για ταχύτερο website και καλύτερη εμπειρία επισκεπτών.",
    heroEyebrow: "Grow Your Business · Speed Boost",
  },
  {
    slug: "branding",
    serviceId: "branding",
    navLabel: "Branding",
    seoTitle: "Branding | Logo & Εταιρική Ταυτότητα",
    seoDescription:
      "Branding πακέτα από τη NEXUS DEV STUDIO: logo, χρώματα, τυπογραφία και brand kit για συνεπή εταιρική εικόνα.",
    heroEyebrow: "Grow Your Business · Branding",
  },
  {
    slug: "professional-email",
    serviceId: "professional-email",
    navLabel: "Professional Email",
    seoTitle: "Professional Email Setup | Domain Email",
    seoDescription:
      "Ρύθμιση επαγγελματικού email με το domain σου: DNS, SPF, DKIM, DMARC και σύνδεση με Outlook ή Gmail.",
    heroEyebrow: "Grow Your Business · Professional Email",
  },
  {
    slug: "seo-content",
    serviceId: "seo-content",
    navLabel: "SEO Content",
    seoTitle: "SEO Content | Άρθρα & Οργανική Ανάπτυξη",
    seoDescription:
      "Μηνιαία SEO άρθρα και περιεχόμενο από τη NEXUS: keyword research, on-page SEO formatting και στρατηγική περιεχομένου.",
    heroEyebrow: "Grow Your Business · SEO Content",
  },
  {
    slug: "social-media",
    serviceId: "social-media",
    navLabel: "Social Media Content",
    seoTitle: "Social Media Content | Posts & Content Calendar",
    seoDescription:
      "Social Media Content από τη NEXUS: μηνιαία posts, captions και γραφικά για σταθερή παρουσία στα social media.",
    heroEyebrow: "Grow Your Business · Social Media",
  },
];

const allServices: GrowthService[] = [nexusGrowth, ...monthlyServices, ...oneTimeServices];

export function getGrowthPageBySlug(slug: string): GrowthPageDef | undefined {
  return growthServicePages.find((p) => p.slug === slug);
}

export function getGrowthServiceForPage(page: GrowthPageDef): GrowthService | undefined {
  return allServices.find((s) => s.id === page.serviceId);
}

export function getAllGrowthServiceSlugs(): string[] {
  return growthServicePages.map((p) => p.slug);
}
