import { PageHeader } from "@/components/admin/DataTable";
import { AboutForm } from "@/components/admin/forms/ContentForms";
import { prisma } from "@/lib/db";

export default async function AboutAdminPage() {
  const item = await prisma.aboutContent.findFirst();
  return (
    <div>
      <PageHeader title="About" description="Founder story and timeline." />
      <AboutForm item={item} />
    </div>
  );
}
