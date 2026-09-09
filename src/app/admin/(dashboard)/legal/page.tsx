import { PageHeader } from "@/components/admin/DataTable";
import { LegalAdminPanel } from "@/components/admin/forms/LegalAdminPanel";
import { prisma } from "@/lib/db";
import { ensureLegalDefaults } from "@/server/services/legal";

export default async function LegalAdminPage() {
  await ensureLegalDefaults();
  const [pages, business] = await Promise.all([
    prisma.legalPage.findMany({ orderBy: { pageKey: "asc" } }),
    prisma.legalBusinessInfo.findFirst(),
  ]);

  return (
    <div>
      <PageHeader
        title="Legal & Compliance"
        description="Manage Privacy, Cookies, Terms, Services Terms, Copyright, and legal business placeholders."
      />
      <LegalAdminPanel pages={pages} business={business} />
    </div>
  );
}
