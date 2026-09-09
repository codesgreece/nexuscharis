import { DeleteButton } from "@/components/admin/DeleteButton";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge, DataTable, EditLink, PageHeader, RowActions } from "@/components/admin/DataTable";
import { prisma } from "@/lib/db";
import { deleteMessageAction } from "@/server/actions/messages";
import { formatDistanceToNow } from "date-fns";

function statusTone(status: string) {
  if (status === "NEW") return "purple" as const;
  if (status === "READ") return "neutral" as const;
  if (status === "REPLIED") return "success" as const;
  return "warning" as const;
}

export default async function MessagesPage() {
  const items = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader title="Contact messages" description="Inbound messages from the public contact form." />
      {items.length === 0 ? (
        <EmptyState title="No messages yet" description="New contact form submissions will appear here." />
      ) : (
        <DataTable headers={["From", "Service", "Status", "Received", ""]}>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-lavender-light/40">
              <td className="px-4 py-3">
                <p className="font-medium text-purple-deep">{item.name}</p>
                <p className="text-xs text-muted">{item.email}</p>
              </td>
              <td className="px-4 py-3 text-muted">{item.service || "—"}</td>
              <td className="px-4 py-3">
                <Badge tone={statusTone(item.status)}>{item.status}</Badge>
              </td>
              <td className="px-4 py-3 text-muted">
                {formatDistanceToNow(item.createdAt, { addSuffix: true })}
              </td>
              <td className="px-4 py-3">
                <RowActions>
                  <EditLink href={`/admin/messages/${item.id}`} />
                  <DeleteButton id={item.id} action={deleteMessageAction} confirmTitle="Delete message?" />
                </RowActions>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
