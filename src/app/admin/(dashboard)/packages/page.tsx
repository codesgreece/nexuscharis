import { DeleteButton } from "@/components/admin/DeleteButton";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, PageHeader, RowActions } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { deletePackageAction } from "@/server/actions/packages";
import Link from "next/link";

export default async function PackagesPage() {
  const items = await prisma.package.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <PageHeader
        title="Packages"
        description="Edit package prices, features, and visibility."
        action={
          <Link href="/admin/packages/new">
            <Button size="sm">New package</Button>
          </Link>
        }
      />
      {items.length === 0 ? (
        <EmptyState
          title="No packages yet"
          description="Create your first package to show pricing on the site."
          actionHref="/admin/packages/new"
          actionLabel="New package"
        />
      ) : (
        <DataTable headers={["Title", "Price", "Order", "Status", ""]}>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3 font-medium text-purple-deep">{item.title}</td>
              <td className="px-4 py-3 text-muted">{item.price}</td>
              <td className="px-4 py-3 text-muted">{item.order}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  <Badge tone={item.active ? "success" : "neutral"}>{item.active ? "Active" : "Hidden"}</Badge>
                  {item.highlighted ? <Badge tone="purple">Highlighted</Badge> : null}
                </div>
              </td>
              <td className="px-4 py-3">
                <RowActions>
                  <EditLink href={`/admin/packages/${item.id}`} />
                  <DeleteButton id={item.id} action={deletePackageAction} confirmTitle="Delete package?" />
                </RowActions>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
