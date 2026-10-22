import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CareersPageView } from "@/components/careers/CareersPageView";
import { CAREERS_PAGE } from "@/content/jobs";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { getPublicSiteData } from "@/server/services/content";
import { getActivePublicJobs } from "@/server/services/careers";

export const dynamic = "force-dynamic";

const pageUrl = absoluteUrl(CAREERS_PAGE.path);

export function generateMetadata(): Metadata {
  return {
    title: { absolute: `${CAREERS_PAGE.seo.title} | NEXUS DEV STUDIO GREECE` },
    description: CAREERS_PAGE.seo.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: CAREERS_PAGE.seo.title,
      description: CAREERS_PAGE.seo.description,
      url: pageUrl,
      locale: "el_GR",
      type: "website",
      siteName: "NEXUS DEV STUDIO GREECE",
    },
    twitter: {
      card: "summary_large_image",
      title: CAREERS_PAGE.seo.title,
      description: CAREERS_PAGE.seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function buildCareersJsonLd() {
  const active = await getActivePublicJobs();
  const site = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: CAREERS_PAGE.seo.title,
    description: CAREERS_PAGE.seo.description,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "NEXUS DEV STUDIO GREECE",
      url: site,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: active.map((job, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/careers/${job.slug}`),
        name: job.title,
      })),
    },
  };
}

export default async function CareersPage() {
  const [data, activeJobs, jsonLd] = await Promise.all([
    getPublicSiteData(),
    getActivePublicJobs(),
    buildCareersJsonLd(),
  ]);
  const settings = data.settings!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-warm-ivory pt-[72px]">
        <CareersPageView jobs={activeJobs} />
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
