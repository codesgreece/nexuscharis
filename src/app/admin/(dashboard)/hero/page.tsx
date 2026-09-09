import { PageHeader } from "@/components/admin/DataTable";
import { HeroForm } from "@/components/admin/forms/ContentForms";
import { prisma } from "@/lib/db";

export default async function HeroAdminPage() {
  const item = await prisma.heroContent.findFirst();
  return (
    <div>
      <PageHeader title="Hero" description="Homepage hero copy, CTAs, and stats." />
      <HeroForm item={item} />
    </div>
  );
}
