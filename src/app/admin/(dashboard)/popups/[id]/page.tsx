import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PopupForm } from "@/components/admin/forms/PopupForm";
export default async function EditPopupsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.popup.findUnique({ where: { id } });
  if (!item) notFound();
  return (<div className="mx-auto max-w-3xl space-y-6"><h1 className="text-2xl font-extrabold">Edit</h1><PopupForm item={item} /></div>);
}
