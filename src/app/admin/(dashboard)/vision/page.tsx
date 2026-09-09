import { PageHeader } from "@/components/admin/DataTable";
import { VisionForm } from "@/components/admin/forms/ContentForms";
import { prisma } from "@/lib/db";

export default async function VisionAdminPage() {
  const item = await prisma.visionContent.findFirst();
  return (
    <div>
      <PageHeader title="Vision" description="Studio vision statement and principles." />
      <VisionForm item={item} />
    </div>
  );
}
