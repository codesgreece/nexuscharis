import { PageHeader } from "@/components/admin/DataTable";
import { ProcessForm } from "@/components/admin/forms/ProcessForm";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditProcessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.processStep.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <PageHeader title="Edit process step" description={item.title} />
      <ProcessForm item={item} />
    </div>
  );
}
