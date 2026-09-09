import { DeleteButton } from "@/components/admin/DeleteButton";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, PageHeader, RowActions } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/db";
import { deleteOfferAction } from "@/server/actions/offers";
import Link from "next/link";

export default async function OffersPage() {
  const items = await prisma.offer.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader
        title="Offers"
        description="Promotional offers and limited-time pricing."
        action={
          <Link href="/admin/offers/new">
            <Button size="sm">New offer</Button>
          </Link>
        }
      />
      {items.length === 0 ? (
        <EmptyState title="No offers" actionHref="/admin/offers/new" actionLabel="New offer" />
      ) : (
        <DataTable headers={["Title", "Price", "Status", ""]}>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3 font-medium text-purple-deep">{item.title}</td>
              <td className="px-4 py-3 text-muted">{item.price || "—"}</td>
              <td className="px-4 py-3">
                <Badge tone={item.active ? "success" : "neutral"}>{item.active ? "Active" : "Off"}</Badge>
              </td>
              <td className="px-4 py-3">
                <RowActions>
                  <EditLink href={`/admin/offers/${item.id}`} />
                  <DeleteButton id={item.id} action={deleteOfferAction} />
                </RowActions>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
