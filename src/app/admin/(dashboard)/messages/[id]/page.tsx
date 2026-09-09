import { DeleteButton } from "@/components/admin/DeleteButton";
import { AdminCard, Badge, PageHeader } from "@/components/admin/DataTable";
import { MessageStatusForm } from "@/components/admin/forms/MessageStatusForm";
import { prisma } from "@/lib/db";
import { deleteMessageAndRedirectAction } from "@/server/actions/messages";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.contactMessage.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <PageHeader
        title={item.name}
        description={item.email}
        action={
          <DeleteButton
            id={item.id}
            action={deleteMessageAndRedirectAction}
            confirmTitle="Delete this message?"
          />
        }
      />

      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <AdminCard>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge tone="purple">{item.status}</Badge>
            {item.service ? <Badge>{item.service}</Badge> : null}
            {item.phone ? <Badge tone="neutral">{item.phone}</Badge> : null}
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-purple-deep">{item.message}</p>
          <p className="mt-6 text-xs text-muted">
            Received {format(item.createdAt, "dd MMM yyyy HH:mm")}
          </p>
        </AdminCard>
        <MessageStatusForm item={item} />
      </div>
    </div>
  );
}
