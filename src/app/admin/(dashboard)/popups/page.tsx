import { DeleteButton } from "@/components/admin/DeleteButton";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, PageHeader, RowActions } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { deletePopupAction } from "@/server/actions/popups";
import Link from "next/link";

export default async function PopupsPage() {
  const items = await prisma.popup.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader
        title="Popups"
        description="Site popups with delay and frequency controls."
        action={
          <Link href="/admin/popups/new">
            <Button size="sm">New popup</Button>
          </Link>
        }
      />
      {items.length === 0 ? (
        <EmptyState title="No popups" actionHref="/admin/popups/new" actionLabel="New popup" />
      ) : (
        <DataTable headers={["Title", "Frequency", "Status", ""]}>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3 font-medium text-purple-deep">{item.title}</td>
              <td className="px-4 py-3 text-muted">{item.displayFrequency}</td>
              <td className="px-4 py-3">
                <Badge tone={item.active ? "success" : "neutral"}>{item.active ? "Active" : "Off"}</Badge>
              </td>
              <td className="px-4 py-3">
                <RowActions>
                  <EditLink href={`/admin/popups/${item.id}`} />
                  <DeleteButton id={item.id} action={deletePopupAction} />
                </RowActions>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
