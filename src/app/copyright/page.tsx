import type { Metadata } from "next";
import { buildLegalMetadata, LegalRoutePage } from "@/components/legal/LegalRoutePage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return buildLegalMetadata("COPYRIGHT");
}

export default function CopyrightPage() {
  return <LegalRoutePage pageKey="COPYRIGHT" />;
}
