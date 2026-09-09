import type { Metadata } from "next";
import { buildLegalMetadata, LegalRoutePage } from "@/components/legal/LegalRoutePage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return buildLegalMetadata("SERVICES_TERMS");
}

export default function ServicesTermsPage() {
  return <LegalRoutePage pageKey="SERVICES_TERMS" />;
}
