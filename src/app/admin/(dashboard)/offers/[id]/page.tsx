import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { OfferForm } from "@/components/admin/forms/OfferForm";
export default async function EditOffersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.offer.findUnique({ where: { id } });
  if (!item) notFound();
  return (<div className="mx-auto max-w-3xl space-y-6"><h1 className="text-2xl font-extrabold">Edit</h1><OfferForm item={item} /></div>);
}
