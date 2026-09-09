import type { Metadata } from "next";
import { buildLegalMetadata, LegalRoutePage } from "@/components/legal/LegalRoutePage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return buildLegalMetadata("TERMS");
}

export default function TermsPage() {
  return <LegalRoutePage pageKey="TERMS" />;
}
