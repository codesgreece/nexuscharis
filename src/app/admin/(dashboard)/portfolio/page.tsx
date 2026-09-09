import { DeleteButton } from "@/components/admin/DeleteButton";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, PageHeader, RowActions } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { deletePortfolioAction } from "@/server/actions/portfolio";
import Link from "next/link";

export default async function PortfolioPage() {
  const items = await prisma.portfolioProject.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <PageHeader
        title="Portfolio"
        description="Manage real client projects only. The public site shows published items."
        action={
          <Link href="/admin/portfolio/new">
            <Button size="sm">New project</Button>
          </Link>
        }
      />
      {items.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Portfolio stays empty until you add real work — no placeholders."
          actionHref="/admin/portfolio/new"
          actionLabel="Add real project"
        />
      ) : (
        <DataTable headers={["Title", "Category", "Status", ""]}>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3 font-medium text-purple-deep">{item.title}</td>
              <td className="px-4 py-3 text-muted">{item.category}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  <Badge tone={item.published ? "success" : "warning"}>
                    {item.published ? "Published" : "Draft"}
                  </Badge>
                  {item.featured ? <Badge tone="purple">Featured</Badge> : null}
                </div>
              </td>
              <td className="px-4 py-3">
                <RowActions>
                  <EditLink href={`/admin/portfolio/${item.id}`} />
                  <DeleteButton id={item.id} action={deletePortfolioAction} confirmTitle="Delete project?" />
                </RowActions>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
