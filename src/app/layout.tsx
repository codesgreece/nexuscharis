import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { prisma } from "@/lib/db";
import { ConsentProvider } from "@/components/legal/ConsentProvider";

export const dynamic = "force-dynamic";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "greek"],
  display: "swap",
});

const FALLBACK_TITLE =
  "NEXUS DEV STUDIO GREECE | Κατασκευή Ιστοσελίδων & Εφαρμογών";
const FALLBACK_DESCRIPTION =
  "Το NEXUS DEV STUDIO GREECE δημιουργεί σύγχρονες ιστοσελίδες, landing pages, e-shops, Windows και mobile εφαρμογές και custom admin panels.";

export async function generateMetadata(): Promise<Metadata> {
  let seo: {
    title?: string | null;
    metaDescription?: string | null;
    keywords?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: string | null;
    twitterCard?: string | null;
    robots?: string | null;
    canonicalUrl?: string | null;
  } | null = null;

  try {
    seo = await prisma.sEOSettings.findUnique({ where: { pageKey: "home" } });
  } catch {
    seo = null;
  }

  const title = seo?.title || FALLBACK_TITLE;
  const description = seo?.metaDescription || FALLBACK_DESCRIPTION;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: "%s | NEXUS DEV STUDIO GREECE",
    },
    description,
    keywords: seo?.keywords?.split(",").map((k) => k.trim()) || [
      "κατασκευή ιστοσελίδων",
      "web developer Ελλάδα",
      "κατασκευή e-shop",
      "landing page",
      "κατασκευή εφαρμογών",
    ],
    authors: [{ name: "Χριστόπουλος Χαράλαμπος" }],
    creator: "NEXUS DEV STUDIO GREECE",
    openGraph: {
      type: "website",
      locale: "el_GR",
      url: absoluteUrl("/"),
      siteName: "NEXUS DEV STUDIO GREECE",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [{ url: absoluteUrl(seo?.ogImage || "/images/founder.jpg") }],
    },
    twitter: {
      card: (seo?.twitterCard as "summary_large_image") || "summary_large_image",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [absoluteUrl(seo?.ogImage || "/images/founder.jpg")],
    },
    robots: seo?.robots || "index, follow",
    alternates: {
      canonical: seo?.canonicalUrl || absoluteUrl("/"),
    },
  };
}

function JsonLd() {
  const site = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: site,
        name: "NEXUS DEV STUDIO GREECE",
        inLanguage: "el-GR",
        publisher: { "@id": `${site}/#organization` },
      },
      {
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": `${site}/#organization`,
        name: "NEXUS DEV STUDIO GREECE",
        url: site,
        logo: absoluteUrl("/images/logo.svg"),
        image: absoluteUrl("/images/founder.jpg"),
        email: "nexusdevstudio@outlook.com",
        telephone: "+306936732844",
        areaServed: "GR",
        address: {
          "@type": "PostalAddress",
          addressCountry: "GR",
        },
        sameAs: [],
        founder: { "@id": `${site}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${site}/#person`,
        name: "Χριστόπουλος Χαράλαμπος",
        jobTitle: "Founder & Developer",
        worksFor: { "@id": `${site}/#organization` },
        image: absoluteUrl("/images/founder.jpg"),
        email: "nexusdevstudio@outlook.com",
        telephone: "+306936732844",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${manrope.variable} h-full antialiased`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full bg-white text-[#171717] font-sans">
        <ConsentProvider>{children}</ConsentProvider>
      </body>
    </html>
  );
}
