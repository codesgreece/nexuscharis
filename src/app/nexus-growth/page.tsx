import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NexusGrowthView } from "@/components/growth/NexusGrowthView";
import { breadcrumbJsonLd } from "@/components/growth/Breadcrumbs";
import { nexusGrowth } from "@/content/growth-services";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { getPublicSiteData } from "@/server/services/content";

export const dynamic = "force-dynamic";

const pageUrl = absoluteUrl("/nexus-growth");

const SEO = {
  title: "NEXUS Growth | Μηνιαία Ανάπτυξη Website 119€",
  description:
    "NEXUS Growth: μηνιαία υπηρεσία 119€ με SEO, website maintenance, content updates, technical optimization, monitoring και priority support από τη NEXUS DEV STUDIO GREECE.",
};

export function generateMetadata(): Metadata {
  return {
    title: { absolute: `${SEO.title} | NEXUS DEV STUDIO GREECE` },
    description: SEO.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: SEO.title,
      description: SEO.description,
      url: pageUrl,
      locale: "el_GR",
      type: "website",
      siteName: "NEXUS DEV STUDIO GREECE",
    },
    twitter: {
      card: "summary_large_image",
      title: SEO.title,
      description: SEO.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function NexusGrowthPage() {
  const data = await getPublicSiteData();
  const settings = data.settings!;
  const site = getSiteUrl();

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: nexusGrowth.title,
    description: nexusGrowth.description,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "NEXUS DEV STUDIO GREECE",
      url: site,
    },
    areaServed: { "@type": "Country", name: "Greece" },
    offers: {
      "@type": "Offer",
      price: "119",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      description: "Monthly recurring website growth service",
    },
  };

  const crumbs = breadcrumbJsonLd([
    { label: "Αρχική", href: "/" },
    { label: "Grow Your Business", href: "/grow-your-business" },
    { label: "NEXUS Growth", href: "/nexus-growth" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Header />
      <main className="bg-white pt-[72px]">
        <NexusGrowthView />
      </main>
      <Footer
        siteName={settings.siteName || "NEXUS DEV STUDIO GREECE"}
        tagline={settings.tagline || "Digital solutions designed around your business."}
        phone={settings.phone || "6936732844"}
        email={settings.email || "nexusdevstudio@outlook.com"}
        social={{
          facebookUrl: settings.facebookUrl,
          instagramUrl: settings.instagramUrl,
          linkedinUrl: settings.linkedinUrl,
          twitterUrl: settings.twitterUrl,
          dribbbleUrl: settings.dribbbleUrl,
        }}
      />
    </>
  );
}
