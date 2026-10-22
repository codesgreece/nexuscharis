import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicSiteFrame } from "@/components/layout/PublicSiteFrame";
import { JsonLd } from "@/components/seo/JsonLd";
import { BuildServicePageView } from "@/components/services/BuildServicePageView";
import { getAllBuildServiceSlugs, getBuildServiceBySlug } from "@/content/build-services";
import { buildServiceStructuredData } from "@/lib/structured-data";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { getPublicSiteData } from "@/server/services/content";

export const revalidate = 60;
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBuildServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getBuildServiceBySlug(slug);
  if (!page) {
    return {
      title: { absolute: "Η υπηρεσία δεν βρέθηκε | NEXUS DEV STUDIO GREECE" },
      robots: { index: false, follow: false },
    };
  }

  const url = absoluteUrl(`/services/${page.slug}`);
  return {
    title: { absolute: `${page.seoTitle} | NEXUS DEV STUDIO GREECE` },
    description: page.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url,
      locale: "el_GR",
      type: "website",
      siteName: "NEXUS DEV STUDIO GREECE",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.seoDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BuildServiceRoutePage({ params }: Props) {
  const { slug } = await params;
  const page = getBuildServiceBySlug(slug);
  if (!page) notFound();

  const data = await getPublicSiteData();
  const settings = data.settings!;

  return (
    <>
      <JsonLd data={buildServiceStructuredData(getSiteUrl(), page)} />
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
        <BuildServicePageView
          page={page}
          phone={settings.phone || "6936732844"}
          email={settings.email || "nexusdevstudio@outlook.com"}
        />
      </PublicSiteFrame>
    </>
  );
}
