import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PackageForm } from "@/components/admin/forms/PackageForm";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await prisma.package.findUnique({ where: { id } });
  if (!pkg) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-extrabold">Edit package</h1>
      <PackageForm item={pkg} />
    </div>
  );
}
