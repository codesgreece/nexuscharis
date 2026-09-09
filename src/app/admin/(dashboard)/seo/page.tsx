import { PageHeader } from "@/components/admin/DataTable";
import { SeoForm } from "@/components/admin/forms/SeoForm";
import { prisma } from "@/lib/db";

export default async function SeoAdminPage() {
  const items = await prisma.sEOSettings.findMany({ orderBy: { pageKey: "asc" } });

  return (
    <div>
      <PageHeader title="SEO" description="Per-page title, meta description, and Open Graph fields." />
      <div className="grid gap-6">
        {items.map((item) => (
          <SeoForm key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
