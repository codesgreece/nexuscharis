import type { Metadata } from "next";
import { buildLegalMetadata, LegalRoutePage } from "@/components/legal/LegalRoutePage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return buildLegalMetadata("COOKIES");
}

export default function CookiesPage() {
  return <LegalRoutePage pageKey="COOKIES" showCookieInventory />;
}
