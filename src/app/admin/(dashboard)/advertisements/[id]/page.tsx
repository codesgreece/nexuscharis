import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdvertisementForm } from "@/components/admin/forms/AdvertisementForm";
export default async function EditAdvertisementsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.advertisement.findUnique({ where: { id } });
  if (!item) notFound();
  return (<div className="mx-auto max-w-3xl space-y-6"><h1 className="text-2xl font-extrabold">Edit</h1><AdvertisementForm item={item} /></div>);
}
