import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ServiceForm } from "@/components/admin/forms/ServiceForm";
export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.service.findUnique({ where: { id } });
  if (!item) notFound();
  return (<div className="mx-auto max-w-3xl space-y-6"><h1 className="text-2xl font-extrabold">Edit service</h1><ServiceForm item={item} /></div>);
}
