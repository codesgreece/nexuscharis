import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";
import { prisma } from "@/lib/db";
import { ConsentProvider } from "@/components/legal/ConsentProvider";
import { HOME_SEO, prefersNationwideSeo } from "@/content/seo";

export const dynamic = "force-dynamic";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "greek"],
  display: "swap",
});

function pickOgTitle(candidate: string | null | undefined, pageTitle: string) {
  const value = candidate?.trim();
  if (!value) return HOME_SEO.ogTitle;
  if (value.length < 24 || value.toUpperCase() === "NEXUS DEV STUDIO GREECE") {
    return HOME_SEO.ogTitle;
  }
  if (!prefersNationwideSeo(value)) return HOME_SEO.ogTitle;
  return value || pageTitle;
}

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

  const title = prefersNationwideSeo(seo?.title) ? seo!.title!.trim() : HOME_SEO.title;
  const description = prefersNationwideSeo(seo?.metaDescription)
    ? seo!.metaDescription!.trim()
    : HOME_SEO.description;
  const ogTitle = pickOgTitle(seo?.ogTitle, title);
  const ogDescription = prefersNationwideSeo(seo?.ogDescription)
    ? seo!.ogDescription!.trim()
    : description;
  const ogImage = absoluteUrl(seo?.ogImage || "/images/founder.jpg");
  const canonical = absoluteUrl("/");

  // Never trust a CMS canonical pointing at vercel/localhost
  const safeCanonical =
    seo?.canonicalUrl &&
    seo.canonicalUrl.includes("nexusdevstudio.gr") &&
    seo.canonicalUrl.startsWith("https://")
      ? seo.canonicalUrl.replace("://nexusdevstudio.gr", "://www.nexusdevstudio.gr")
      : canonical;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: "%s | NEXUS DEV STUDIO GREECE",
    },
    description,
    keywords: seo?.keywords?.split(",").map((k) => k.trim()).filter(Boolean).length
      ? seo!.keywords!.split(",").map((k) => k.trim()).filter(Boolean)
      : [...HOME_SEO.keywords],
    authors: [{ name: "Χριστόπουλος Χαράλαμπος" }],
    creator: "NEXUS DEV STUDIO GREECE",
    publisher: "NEXUS DEV STUDIO GREECE",
    applicationName: "NEXUS DEV STUDIO GREECE",
    category: "technology",
    // Icons come from App Router file conventions:
    // src/app/favicon.ico, icon.png, icon.svg, apple-icon.png
    openGraph: {
      type: "website",
      locale: "el_GR",
      url: safeCanonical,
      siteName: "NEXUS DEV STUDIO GREECE",
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "NEXUS DEV STUDIO GREECE — Χριστόπουλος Χαράλαμπος, Founder & Developer",
        },
      ],
    },
    twitter: {
      card: (seo?.twitterCard as "summary_large_image") || "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    robots: seo?.robots || {
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
    alternates: {
      canonical: safeCanonical,
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
        url: `${site}/`,
        name: "NEXUS DEV STUDIO GREECE",
        description: HOME_SEO.description,
        inLanguage: "el-GR",
        publisher: { "@id": `${site}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${site}/#webpage`,
        url: `${site}/`,
        name: HOME_SEO.title,
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#organization` },
        description: HOME_SEO.description,
        inLanguage: "el-GR",
      },
      {
        // Organization — nationwide digital studio, not a local storefront
        "@type": "Organization",
        "@id": `${site}/#organization`,
        name: "NEXUS DEV STUDIO GREECE",
        url: `${site}/`,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/logo.svg"),
        },
        image: absoluteUrl("/images/founder.jpg"),
        email: "nexusdevstudio@outlook.com",
        telephone: "+306936732844",
        areaServed: {
          "@type": "Country",
          name: "Greece",
        },
        founder: { "@id": `${site}/#person` },
        sameAs: [],
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
        url: `${site}/#about`,
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
