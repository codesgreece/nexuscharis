import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrowthServicePageView } from "@/components/growth/GrowthServicePageView";
import { breadcrumbJsonLd } from "@/components/growth/Breadcrumbs";
import {
  getAllGrowthServiceSlugs,
  getGrowthPageBySlug,
  getGrowthServiceForPage,
} from "@/content/growth-pages";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { getPublicSiteData } from "@/server/services/content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGrowthServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGrowthPageBySlug(slug);
  if (!page) return {};
  const url = absoluteUrl(`/grow-your-business/${page.slug}`);
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

export default async function GrowthServiceRoutePage({ params }: Props) {
  const { slug } = await params;
  const page = getGrowthPageBySlug(slug);
  if (!page) notFound();
  const service = getGrowthServiceForPage(page);
  if (!service) notFound();

  const data = await getPublicSiteData();
  const settings = data.settings!;
  const site = getSiteUrl();
  const pageUrl = absoluteUrl(`/grow-your-business/${page.slug}`);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "NEXUS DEV STUDIO GREECE",
      url: site,
    },
    areaServed: { "@type": "Country", name: "Greece" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      description: service.price,
    },
  };

  const crumbs = breadcrumbJsonLd([
    { label: "Αρχική", href: "/" },
    { label: "Grow Your Business", href: "/grow-your-business" },
    { label: page.navLabel, href: `/grow-your-business/${page.slug}` },
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
        <GrowthServicePageView page={page} service={service} />
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
