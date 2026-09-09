import { DeleteButton } from "@/components/admin/DeleteButton";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, PageHeader, RowActions } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { deleteServiceAction } from "@/server/actions/services";
import Link from "next/link";

export default async function ServicesPage() {
  const items = await prisma.service.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <PageHeader
        title="Services"
        description="Services shown on the public homepage."
        action={
          <Link href="/admin/services/new">
            <Button size="sm">New service</Button>
          </Link>
        }
      />
      {items.length === 0 ? (
        <EmptyState title="No services" actionHref="/admin/services/new" actionLabel="New service" />
      ) : (
        <DataTable headers={["Title", "Icon", "Order", "Status", ""]}>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3 font-medium text-purple-deep">{item.title}</td>
              <td className="px-4 py-3 text-muted">{item.icon}</td>
              <td className="px-4 py-3 text-muted">{item.order}</td>
              <td className="px-4 py-3">
                <Badge tone={item.active ? "success" : "neutral"}>{item.active ? "Active" : "Hidden"}</Badge>
              </td>
              <td className="px-4 py-3">
                <RowActions>
                  <EditLink href={`/admin/services/${item.id}`} />
                  <DeleteButton id={item.id} action={deleteServiceAction} />
                </RowActions>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
