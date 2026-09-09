import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PortfolioForm } from "@/components/admin/forms/PortfolioForm";

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.portfolioProject.findUnique({ where: { id } });
  if (!project) notFound();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-extrabold">Edit project</h1>
      <PortfolioForm item={project} />
    </div>
  );
}
