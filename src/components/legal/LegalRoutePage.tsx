import type { Metadata } from "next";
import type { LegalPageKey } from "@prisma/client";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { absoluteUrl } from "@/lib/utils";
import { getLegalContactDefaults, getLegalPage } from "@/server/services/legal";
import { LEGAL_META } from "@/content/legal/meta";

export function buildLegalMetadata(pageKey: LegalPageKey): Metadata {
  const meta = LEGAL_META[pageKey];
  const canonical = absoluteUrl(meta.path);
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      locale: "el_GR",
      type: "website",
      siteName: "NEXUS DEV STUDIO GREECE",
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
  };
}

export async function LegalRoutePage({
  pageKey,
  showCookieInventory = false,
}: {
  pageKey: LegalPageKey;
  showCookieInventory?: boolean;
}) {
  const [page, contact] = await Promise.all([getLegalPage(pageKey), getLegalContactDefaults()]);

  return (
    <LegalPageView
      page={page}
      siteName={contact.businessName}
      tagline="Digital solutions designed around your business."
      phone={contact.phone}
      email={contact.email}
      social={{
        facebookUrl: contact.facebookUrl,
        instagramUrl: contact.instagramUrl,
        linkedinUrl: contact.linkedinUrl,
        twitterUrl: contact.twitterUrl,
        dribbbleUrl: contact.dribbbleUrl,
      }}
      showCookieInventory={showCookieInventory}
    />
  );
}
