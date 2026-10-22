import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { ConsentProvider } from "@/components/legal/ConsentProvider";
import { resolveHomeSeo } from "@/content/seo";
import { absoluteUrl, getSiteUrl, isSafeExternalUrl } from "@/lib/utils";
import { buildGlobalGraph } from "@/lib/structured-data";
import { getPublicSiteData } from "@/server/services/content";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "greek"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPublicSiteData();
  const seo = resolveHomeSeo(data.seo);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: seo.title,
      template: "%s | NEXUS DEV STUDIO GREECE",
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: data.settings?.founderName || "Χριστόπουλος Χαράλαμπος" }],
    creator: "NEXUS DEV STUDIO GREECE",
    publisher: "NEXUS DEV STUDIO GREECE",
    applicationName: "NEXUS DEV STUDIO GREECE",
    category: "technology",
    openGraph: {
      type: "website",
      locale: "el_GR",
      siteName: "NEXUS DEV STUDIO GREECE",
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: "NEXUS DEV STUDIO GREECE — Χριστόπουλος Χαράλαμπος, Founder & Developer",
        },
      ],
    },
    twitter: {
      card: seo.twitterCard === "summary" ? "summary" : "summary_large_image",
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [seo.ogImage],
    },
    robots: seo.robots || {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPublicSiteData();
  const settings = data.settings;
  const seo = resolveHomeSeo(data.seo);
  const sameAs = [
    settings?.facebookUrl,
    settings?.instagramUrl,
    settings?.linkedinUrl,
    settings?.twitterUrl,
    settings?.dribbbleUrl,
  ].filter((url): url is string => isSafeExternalUrl(url));
  const address = settings?.address?.trim();

  const graph = buildGlobalGraph(getSiteUrl(), {
    email: settings?.email || "nexusdevstudio@outlook.com",
    telephone: settings?.phone || "6936732844",
    founderName: settings?.founderName || "Χριστόπουλος Χαράλαμπος",
    founderImage: absoluteUrl(settings?.founderImageUrl || "/images/founder.jpg"),
    logo: absoluteUrl(settings?.logoUrl || "/images/logo.svg"),
    sameAs,
    address: address && address.length >= 12 ? address : null,
  }, seo.description);

  return (
    <html lang="el" className={`${manrope.variable} h-full antialiased`}>
      <head>
        <JsonLd data={graph} />
      </head>
      <body className="min-h-full bg-warm-ivory text-warm-charcoal font-sans">
        <ConsentProvider>{children}</ConsentProvider>
      </body>
    </html>
  );
}
