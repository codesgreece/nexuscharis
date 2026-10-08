import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrowYourBusinessView } from "@/components/growth/GrowYourBusinessView";
import {
  GROW_PAGE,
  monthlyServices,
  nexusGrowth,
  oneTimeServices,
} from "@/content/growth-services";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { getPublicSiteData } from "@/server/services/content";

export const dynamic = "force-dynamic";

const pageUrl = absoluteUrl(GROW_PAGE.path);

export function generateMetadata(): Metadata {
  return {
    title: { absolute: `${GROW_PAGE.seo.title} | NEXUS DEV STUDIO GREECE` },
    description: GROW_PAGE.seo.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: GROW_PAGE.seo.title,
      description: GROW_PAGE.seo.description,
      url: pageUrl,
      locale: "el_GR",
      type: "website",
      siteName: "NEXUS DEV STUDIO GREECE",
    },
    twitter: {
      card: "summary_large_image",
      title: GROW_PAGE.seo.title,
      description: GROW_PAGE.seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function buildServiceJsonLd() {
  const catalog = [nexusGrowth, ...monthlyServices, ...oneTimeServices];
  const site = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NEXUS Grow Your Business Services",
    description: GROW_PAGE.seo.description,
    url: pageUrl,
    itemListElement: catalog.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: "NEXUS DEV STUDIO GREECE",
          url: site,
        },
        areaServed: {
          "@type": "Country",
          name: "Greece",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${pageUrl}#${service.id}`,
          description: service.price,
        },
      },
    })),
  };
}

export default async function GrowYourBusinessPage() {
  const data = await getPublicSiteData();
  const settings = data.settings!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceJsonLd()) }}
      />
      <Header />
      <main className="bg-white pt-[72px]">
        <GrowYourBusinessView />
      </main>
      <Footer
        siteName={settings.siteName || "NEXUS DEV STUDIO GREECE"}
        tagline={settings.tagline || "Digital solutions designed around your business."}
        phone={settings.phone || "6936732844"}
        email={settings.email || "nexusdevstudio@outlook.com"}
      />
    </>
  );
}
