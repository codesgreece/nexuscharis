import { DeleteButton } from "@/components/admin/DeleteButton";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, PageHeader, RowActions } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { deleteAdvertisementAction } from "@/server/actions/advertisements";
import Link from "next/link";

export default async function AdvertisementsPage() {
  const items = await prisma.advertisement.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader
        title="Advertisements"
        description="In-page advertisement placements."
        action={
          <Link href="/admin/advertisements/new">
            <Button size="sm">New advertisement</Button>
          </Link>
        }
      />
      {items.length === 0 ? (
        <EmptyState
          title="No advertisements"
          actionHref="/admin/advertisements/new"
          actionLabel="New advertisement"
        />
      ) : (
        <DataTable headers={["Title", "Position", "Status", ""]}>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3 font-medium text-purple-deep">{item.title}</td>
              <td className="px-4 py-3 text-muted">{item.position}</td>
              <td className="px-4 py-3">
                <Badge tone={item.active ? "success" : "neutral"}>{item.active ? "Active" : "Off"}</Badge>
              </td>
              <td className="px-4 py-3">
                <RowActions>
                  <EditLink href={`/admin/advertisements/${item.id}`} />
                  <DeleteButton id={item.id} action={deleteAdvertisementAction} />
                </RowActions>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
