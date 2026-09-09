import { PageHeader } from "@/components/admin/DataTable";
import { IntroForm } from "@/components/admin/forms/ContentForms";
import { prisma } from "@/lib/db";

export default async function IntroAdminPage() {
  const item = await prisma.introContent.findFirst();
  return (
    <div>
      <PageHeader title="Intro" description="Short intro block under the hero." />
      <IntroForm item={item} />
    </div>
  );
}
