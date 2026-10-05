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
  "Κατασκευή σύγχρονων ιστοσελίδων, landing pages, e-shops, εφαρμογών και custom digital solutions από το NEXUS DEV STUDIO GREECE.";
const FALLBACK_OG_TITLE =
  "NEXUS DEV STUDIO GREECE | Web Development & Digital Solutions";

function pickOgTitle(candidate: string | null | undefined, pageTitle: string) {
  const value = candidate?.trim();
  if (!value) return FALLBACK_OG_TITLE;
  // Avoid weak CMS values that are just the brand name
  if (value.length < 24 || value.toUpperCase() === "NEXUS DEV STUDIO GREECE") {
    return FALLBACK_OG_TITLE;
  }
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

  const title = seo?.title?.trim() || FALLBACK_TITLE;
  const description = seo?.metaDescription?.trim() || FALLBACK_DESCRIPTION;
  const ogTitle = pickOgTitle(seo?.ogTitle, title);
  const ogDescription = seo?.ogDescription?.trim() || description;
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
    keywords: seo?.keywords?.split(",").map((k) => k.trim()).filter(Boolean) || [
      "κατασκευή ιστοσελίδων",
      "κατασκευή ιστοσελίδων Ελλάδα",
      "web development Ελλάδα",
      "κατασκευή e-shop",
      "landing page",
      "κατασκευή εφαρμογών",
      "mobile app development",
      "custom website",
      "admin panel",
    ],
    authors: [{ name: "Χριστόπουλος Χαράλαμπος" }],
    creator: "NEXUS DEV STUDIO GREECE",
    publisher: "NEXUS DEV STUDIO GREECE",
    applicationName: "NEXUS DEV STUDIO GREECE",
    category: "technology",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: ["/favicon.ico"],
    },
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
        description: FALLBACK_DESCRIPTION,
        inLanguage: "el-GR",
        publisher: { "@id": `${site}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${site}/#webpage`,
        url: `${site}/`,
        name: FALLBACK_TITLE,
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#organization` },
        description: FALLBACK_DESCRIPTION,
        inLanguage: "el-GR",
      },
      {
        // Organization only — no LocalBusiness without a real street address
        "@type": ["Organization", "ProfessionalService"],
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
