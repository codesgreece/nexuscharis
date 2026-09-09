import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Μη έγκυρο email"),
  password: z.string().min(8, "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Το όνομα είναι υποχρεωτικό").max(100),
  email: z.string().email("Μη έγκυρο email").max(200),
  phone: z.string().max(30).optional().or(z.literal("")),
  service: z.string().max(100).optional().or(z.literal("")),
  message: z.string().min(10, "Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες").max(5000),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
  privacyAccepted: z.literal(true, {
    error: "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου",
  }),
  marketingOptIn: z.boolean().optional().default(false),
});

export const packageSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(2000),
  price: z.string().min(1).max(80),
  oldPrice: z.string().max(80).optional().nullable(),
  discount: z.string().max(80).optional().nullable(),
  features: z.array(z.string().min(1).max(200)).min(1),
  ctaText: z.string().min(1).max(80),
  ctaUrl: z.string().min(1).max(500),
  highlighted: z.boolean(),
  active: z.boolean(),
  order: z.number().int().min(0).max(9999),
});

export const portfolioSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(2000),
  category: z.string().min(1).max(80),
  imageUrl: z.string().max(500).optional().nullable(),
  logoUrl: z.string().max(500).optional().nullable(),
  liveUrl: z
    .string()
    .url()
    .optional()
    .nullable()
    .or(z.literal(""))
    .transform((v) => (v === "" ? null : v)),
  caseStudyUrl: z
    .string()
    .url()
    .optional()
    .nullable()
    .or(z.literal(""))
    .transform((v) => (v === "" ? null : v)),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.number().int().min(0).max(9999),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(2000),
  icon: z.string().min(1).max(60),
  order: z.number().int().min(0).max(9999),
  active: z.boolean(),
});

export const offerSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(2000),
  discount: z.string().max(80).optional().nullable(),
  price: z.string().max(80).optional().nullable(),
  oldPrice: z.string().max(80).optional().nullable(),
  ctaText: z.string().min(1).max(80),
  ctaUrl: z.string().min(1).max(500),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
  active: z.boolean(),
});

export const popupSchema = z.object({
  title: z.string().min(1).max(160),
  content: z.string().min(1).max(5000),
  imageUrl: z.string().max(500).optional().nullable(),
  ctaText: z.string().max(80).optional().nullable(),
  ctaUrl: z.string().max(500).optional().nullable(),
  triggerDelayMs: z.number().int().min(0).max(120000),
  displayFrequency: z.enum(["ALWAYS", "ONCE_PER_SESSION", "ONCE_PER_DAY", "ONCE_EVER"]),
  active: z.boolean(),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
});

export const advertisementSchema = z.object({
  title: z.string().min(1).max(160),
  content: z.string().max(2000).optional().nullable(),
  imageUrl: z.string().max(500).optional().nullable(),
  url: z.string().max(500).optional().nullable(),
  position: z.enum([
    "HEADER",
    "HERO",
    "BEFORE_SERVICES",
    "BEFORE_PACKAGES",
    "BEFORE_PORTFOLIO",
    "BEFORE_CONTACT",
    "FOOTER",
    "SIDEBAR",
  ]),
  active: z.boolean(),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
});

export const seoSchema = z.object({
  title: z.string().min(1).max(200),
  metaDescription: z.string().min(1).max(500),
  keywords: z.string().max(500).optional().nullable(),
  canonicalUrl: z.string().max(500).optional().nullable(),
  ogTitle: z.string().max(200).optional().nullable(),
  ogDescription: z.string().max(500).optional().nullable(),
  ogImage: z.string().max(500).optional().nullable(),
  twitterCard: z.string().max(80).optional().nullable(),
  robots: z.string().max(120).optional().nullable(),
});

export const processStepSchema = z.object({
  number: z.string().min(1).max(20),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(2000),
  icon: z.string().min(1).max(60),
  order: z.number().int().min(0).max(9999),
  active: z.boolean(),
});

export const heroContentSchema = z.object({
  badge: z.string().min(1).max(120),
  title: z.string().min(1).max(300),
  subtitle: z.string().min(1).max(1000),
  primaryCtaText: z.string().min(1).max(80),
  primaryCtaUrl: z.string().min(1).max(500),
  secondaryCtaText: z.string().min(1).max(80),
  secondaryCtaUrl: z.string().min(1).max(500),
  trustLine: z.string().min(1).max(300),
  stats: z
    .array(
      z.object({
        value: z.string().min(1).max(40),
        label: z.string().min(1).max(120),
      }),
    )
    .min(1),
  enabled: z.boolean(),
});

export const aboutContentSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(10000),
  timeline: z
    .array(
      z.object({
        year: z.string().min(1).max(40),
        title: z.string().min(1).max(120),
        description: z.string().min(1).max(1000),
      }),
    )
    .min(1),
  enabled: z.boolean(),
});

export const visionContentSchema = z.object({
  title: z.string().min(1).max(200),
  statement: z.string().min(1).max(1000),
  description: z.string().min(1).max(10000),
  principles: z
    .array(
      z.object({
        number: z.string().min(1).max(20),
        title: z.string().min(1).max(120),
        description: z.string().min(1).max(1000),
      }),
    )
    .min(1),
  enabled: z.boolean(),
});

export const introContentSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(10000),
  highlight: z.string().min(1).max(500),
  enabled: z.boolean(),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1).max(160),
  tagline: z.string().min(1).max(300),
  phone: z.string().min(1).max(40),
  email: z.string().email().max(200),
  address: z.string().max(500).optional().nullable(),
  facebookUrl: z.string().max(500).optional().nullable(),
  instagramUrl: z.string().max(500).optional().nullable(),
  linkedinUrl: z.string().max(500).optional().nullable(),
  dribbbleUrl: z.string().max(500).optional().nullable(),
  twitterUrl: z.string().max(500).optional().nullable(),
  logoUrl: z.string().min(1).max(500),
  founderImageUrl: z.string().min(1).max(500),
  founderName: z.string().min(1).max(160),
  founderTitle: z.string().min(1).max(160),
  businessHours: z
    .array(
      z.object({
        day: z.string().min(1).max(40),
        hours: z.string().min(1).max(200),
      }),
    )
    .min(1),
});

export const messageStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]),
});

export const legalPageSchema = z.object({
  title: z.string().min(1).max(200),
  version: z.string().min(1).max(40),
  published: z.boolean(),
  sectionsJson: z.string().min(2).max(200000),
});

export const legalBusinessSchema = z.object({
  businessName: z.string().min(1).max(200),
  address: z.string().max(500).optional().nullable(),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(40),
  vatNumber: z.string().max(80).optional().nullable(),
  taxOffice: z.string().max(120).optional().nullable(),
  registryNumber: z.string().max(120).optional().nullable(),
  country: z.string().min(1).max(80),
  dpoEmail: z.string().email().max(200).optional().nullable().or(z.literal("")),
});
