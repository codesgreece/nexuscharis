import type { Metadata } from "next";
import type { LegalPageKey } from "@prisma/client";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { absoluteUrl } from "@/lib/utils";
import { getLegalContactDefaults, getLegalPage } from "@/server/services/legal";
import { LEGAL_META } from "@/content/legal/meta";

export function buildLegalMetadata(pageKey: LegalPageKey): Metadata {
  const meta = LEGAL_META[pageKey];
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: absoluteUrl(meta.path) },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(meta.path),
      locale: "el_GR",
      type: "website",
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
      showCookieInventory={showCookieInventory}
    />
  );
}
