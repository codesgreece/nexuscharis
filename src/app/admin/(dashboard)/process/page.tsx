import { DeleteButton } from "@/components/admin/DeleteButton";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, PageHeader, RowActions } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { deleteProcessStepAction } from "@/server/actions/process";
import Link from "next/link";

export default async function ProcessPage() {
  const items = await prisma.processStep.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <PageHeader
        title="Process"
        description="Steps explaining how collaboration works."
        action={
          <Link href="/admin/process/new">
            <Button size="sm">New step</Button>
          </Link>
        }
      />
      {items.length === 0 ? (
        <EmptyState title="No process steps" actionHref="/admin/process/new" actionLabel="New step" />
      ) : (
        <DataTable headers={["#", "Title", "Order", "Status", ""]}>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3 text-muted">{item.number}</td>
              <td className="px-4 py-3 font-medium text-purple-deep">{item.title}</td>
              <td className="px-4 py-3 text-muted">{item.order}</td>
              <td className="px-4 py-3">
                <Badge tone={item.active ? "success" : "neutral"}>{item.active ? "Active" : "Hidden"}</Badge>
              </td>
              <td className="px-4 py-3">
                <RowActions>
                  <EditLink href={`/admin/process/${item.id}`} />
                  <DeleteButton id={item.id} action={deleteProcessStepAction} />
                </RowActions>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
