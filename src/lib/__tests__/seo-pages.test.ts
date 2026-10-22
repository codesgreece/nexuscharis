import { describe, expect, it } from "vitest";
import {
  buildServicePages,
  getAllBuildServiceSlugs,
  homepageServiceLink,
  servicesIndex,
} from "@/content/build-services";
import { faqItems } from "@/content/faq";
import { footerServiceLinks } from "@/content/footer";
import { buildServices } from "@/content/navigation";
import { getPublicIndexableRoutes } from "@/content/public-routes";
import { resolveHomeSeo } from "@/content/seo";
import {
  buildGlobalGraph,
  buildServiceStructuredData,
  toInternationalPhone,
} from "@/lib/structured-data";

const PRIVATE_PREFIXES = ["/admin", "/api", "/uploads"];

function pageText(page: (typeof buildServicePages)[number]) {
  return [
    page.seoTitle,
    page.seoDescription,
    page.h1,
    ...page.lead,
    page.indexBlurb,
    page.audienceIntro,
    ...page.audience,
    ...page.benefits.flatMap((item) => [item.title, item.text]),
    ...page.features,
    page.processIntro,
    ...page.process.flatMap((step) => [step.title, step.text]),
    page.fitNote,
  ].join("\n");
}

describe("public service SEO", () => {
  it("publishes one page per real build service and keeps copy unique", () => {
    expect(getAllBuildServiceSlugs()).toEqual([
      "web-design",
      "landing-pages",
      "ecommerce",
      "web-applications",
      "mobile-apps",
      "windows-apps",
      "admin-panels",
    ]);

    const titles = buildServicePages.map((page) => page.seoTitle);
    const descriptions = buildServicePages.map((page) => page.seoDescription);
    const headings = buildServicePages.map((page) => page.h1);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(new Set(headings).size).toBe(headings.length);
    expect(new Set(buildServicePages.map((page) => page.lead[0])).size).toBe(
      buildServicePages.length,
    );

    for (const description of [servicesIndex.seoDescription, ...descriptions]) {
      expect(description.length).toBeGreaterThan(80);
      expect(description.length).toBeLessThan(180);
    }

    for (const page of buildServicePages) {
      expect(page.h1.trim().length).toBeGreaterThan(10);
      expect(page.lead.length).toBeGreaterThan(1);
      expect(page.benefits.length).toBeGreaterThan(1);
      expect(page.process.length).toBeGreaterThan(2);
    }
  });

  it("covers the target phrases on the pages where the intent belongs", () => {
    const bySlug = Object.fromEntries(buildServicePages.map((page) => [page.slug, pageText(page)]));
    expect(bySlug["web-design"]).toMatch(/κατασκευή ιστοσελίδων/i);
    expect(bySlug["web-design"]).toMatch(/κατασκευή ιστοσελίδων για επιχειρήσεις/i);
    expect(bySlug["landing-pages"]).toMatch(/δημιουργία landing page/i);
    expect(bySlug["ecommerce"]).toMatch(/κατασκευή e-shop/i);
    expect(bySlug["web-applications"]).toMatch(/ανάπτυξη web εφαρμογών/i);
    expect(bySlug["web-applications"]).toMatch(/web development στην Ελλάδα/i);
    expect(bySlug["mobile-apps"]).toMatch(/κατασκευή εφαρμογών/i);
    expect(bySlug["admin-panels"]).toMatch(/custom admin panel/i);
    expect(bySlug["windows-apps"]).not.toMatch(/κατασκευή e-shop/i);
    expect(bySlug["landing-pages"]).not.toMatch(/web development στην Ελλάδα/i);
  });

  it("lists every service page in the sitemap and keeps private routes out", () => {
    const paths = getPublicIndexableRoutes().map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("/");
    expect(paths).toContain("/services");
    for (const slug of getAllBuildServiceSlugs()) {
      expect(paths).toContain(`/services/${slug}`);
    }
    for (const path of paths) {
      expect(PRIVATE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))).toBe(
        false,
      );
    }
  });

  it("points navigation, footer, and homepage cards at real service routes", () => {
    const paths = new Set(getPublicIndexableRoutes().map((route) => route.path));
    for (const link of [...buildServices, ...footerServiceLinks]) {
      expect(paths.has(link.href.split("#")[0] || "/")).toBe(true);
    }
    expect(homepageServiceLink("Κατασκευή Ιστοσελίδων")?.href).toBe("/services/web-design");
    expect(homepageServiceLink("Full Websites")?.href).toBe("/services/web-design");
    expect(homepageServiceLink("E-Commerce")?.href).toBe("/services/ecommerce");
    expect(homepageServiceLink("Android / Phone Apps")?.href).toBe("/services/mobile-apps");
    expect(homepageServiceLink("Άγνωστη υπηρεσία")).toBeUndefined();
  });

  it("keeps FAQ answers intact and links them only to known routes", () => {
    const paths = new Set(getPublicIndexableRoutes().map((route) => route.path));
    expect(faqItems.find((item) => item.id === "cost")?.answer[0]).toBe(
      "Το κόστος εξαρτάται από το είδος και τις ανάγκες κάθε project.",
    );
    for (const item of faqItems) {
      for (const link of item.related ?? []) {
        const path = link.href.split("#")[0] || "/";
        expect(paths.has(path)).toBe(true);
        expect(link.label.trim().length).toBeGreaterThan(3);
      }
    }
  });

  it("does not invent ratings, reviews, or a street address", () => {
    const graph = JSON.stringify(
      buildGlobalGraph(
        "https://www.nexusdevstudio.gr",
        {
          email: "nexusdevstudio@outlook.com",
          telephone: "6936732844",
          founderName: "Χριστόπουλος Χαράλαμπος",
          founderImage: "https://www.nexusdevstudio.gr/images/founder.jpg",
          logo: "https://www.nexusdevstudio.gr/images/logo.svg",
          sameAs: [],
          address: null,
        },
        "Περιγραφή",
      ),
    );
    expect(graph).not.toContain("aggregateRating");
    expect(graph).not.toContain("reviewCount");
    expect(graph).not.toContain("streetAddress");
    expect(graph).not.toContain("LocalBusiness");
    expect(graph).toContain("+306936732844");

    const service = JSON.stringify(
      buildServiceStructuredData("https://www.nexusdevstudio.gr", buildServicePages[0]),
    );
    expect(service).not.toContain("aggregateRating");
    expect(service).not.toContain("Offer");
    expect(service).toContain("BreadcrumbList");
  });

  it("rejects a non-production canonical and keeps the nationwide homepage title", () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.nexusdevstudio.gr";
    const resolved = resolveHomeSeo({
      title: "NEXUS Athens",
      metaDescription: "Σύντομη περιγραφή χωρίς γεωγραφία",
      canonicalUrl: "https://nexuscharis.vercel.app",
      ogTitle: "NEXUS DEV STUDIO GREECE",
    });
    expect(resolved.title).toContain("Κατασκευή Ιστοσελίδων");
    expect(resolved.canonical).toBe("https://www.nexusdevstudio.gr/");
    expect(resolved.ogTitle).toContain("Κατασκευή Ιστοσελίδων");
    expect(
      resolveHomeSeo({ canonicalUrl: "https://nexusdevstudio.gr/services/web-design" }).canonical,
    ).toBe("https://www.nexusdevstudio.gr/services/web-design");
    process.env.NEXT_PUBLIC_SITE_URL = previous;
  });
});

describe("toInternationalPhone", () => {
  it("formats the published Greek mobile number", () => {
    expect(toInternationalPhone("6936732844")).toBe("+306936732844");
    expect(toInternationalPhone("+306936732844")).toBe("+306936732844");
  });
});
