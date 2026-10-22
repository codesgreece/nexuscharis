import type { Metadata } from "next";
import { PublicSiteFrame } from "@/components/layout/PublicSiteFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesIndexView } from "@/components/services/ServicesIndexView";
import { servicesIndex } from "@/content/build-services";
import { buildServicesIndexStructuredData } from "@/lib/structured-data";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { getPublicSiteData } from "@/server/services/content";

export const revalidate = 60;

const pageUrl = absoluteUrl(servicesIndex.path);

export function generateMetadata(): Metadata {
  return {
    title: { absolute: `${servicesIndex.seoTitle} | NEXUS DEV STUDIO GREECE` },
    description: servicesIndex.seoDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: servicesIndex.seoTitle,
      description: servicesIndex.seoDescription,
      url: pageUrl,
      locale: "el_GR",
      type: "website",
      siteName: "NEXUS DEV STUDIO GREECE",
    },
    twitter: {
      card: "summary_large_image",
      title: servicesIndex.seoTitle,
      description: servicesIndex.seoDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicesIndexPage() {
  const data = await getPublicSiteData();
  const settings = data.settings!;

  return (
    <>
      <JsonLd data={buildServicesIndexStructuredData(getSiteUrl(), servicesIndex.seoDescription)} />
      <PublicSiteFrame
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
      >
        <ServicesIndexView packages={data.packages} />
      </PublicSiteFrame>
    </>
  );
}
