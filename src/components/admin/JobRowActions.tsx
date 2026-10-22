"use client";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatusBanner } from "@/components/admin/StatusBanner";
import {
  archiveJobAction,
  duplicateJobAction,
  setJobStatusAction,
} from "@/server/actions/careers";
import type { ActionResult } from "@/server/actions/helpers";
import type { JobStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

function ActionBtn({
  children,
  onClick,
  href,
  tone = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  tone?: "default" | "danger";
}) {
  const className =
    tone === "danger"
      ? "rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
      : "rounded-xl border border-border-soft bg-white px-3 py-1.5 text-xs font-semibold text-purple-deep transition hover:border-purple-electric hover:bg-lavender-light";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function JobRowActions({
  id,
  status,
  applicationCount,
}: {
  id: string;
  status: JobStatus;
  applicationCount: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function run(
    action: () => Promise<ActionResult<unknown>>,
    onOk?: (result: ActionResult<unknown>) => void,
  ) {
    startTransition(async () => {
      try {
        const result = await action();
        if (!result.success) {
          setError(result.error || "Η ενέργεια απέτυχε");
          return;
        }
        onOk?.(result);
        router.refresh();
      } catch {
        setError("Η ενέργεια απέτυχε");
      }
    });
  }

  return (
    <>
      {error ? <StatusBanner type="error" message={error} onDismiss={() => setError(null)} /> : null}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <ActionBtn href={`/admin/careers/${id}`}>Edit</ActionBtn>
        <ActionBtn href={`/admin/careers/${id}/applications`}>Applications</ActionBtn>
        <ActionBtn href={`/admin/careers/${id}/preview`}>Preview</ActionBtn>
        <ActionBtn
          onClick={() =>
            run(() => duplicateJobAction(id), (result) => {
              const newId = result.data && typeof result.data === "object" && "id" in result.data
                ? String((result.data as { id: string }).id)
                : null;
              if (newId) router.push(`/admin/careers/${newId}`);
            })
          }
        >
          Duplicate
        </ActionBtn>
        {status === "ACTIVE" ? (
          <ActionBtn onClick={() => run(() => setJobStatusAction(id, "CLOSED"))}>
            Deactivate
          </ActionBtn>
        ) : status === "CLOSED" || status === "DRAFT" ? (
          <ActionBtn onClick={() => run(() => setJobStatusAction(id, "ACTIVE"))}>
            Activate
          </ActionBtn>
        ) : null}
        <ActionBtn tone="danger" onClick={() => setConfirmDelete(true)}>
          Delete
        </ActionBtn>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Θέλεις πραγματικά να διαγράψεις αυτή τη θέση;"
        description={
          applicationCount > 0
            ? "Η θέση έχει αιτήσεις υποψηφίων. Η διαγραφή της μπορεί να επηρεάσει το ιστορικό των αιτήσεων. Η θέση θα αρχειοθετηθεί (soft delete)."
            : "Η θέση θα αρχειοθετηθεί και δεν θα εμφανίζεται πλέον στο admin list ή δημόσια."
        }
        loading={pending}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          run(async () => {
            const result = await archiveJobAction(id);
            setConfirmDelete(false);
            return result;
          });
        }}
      />
    </>
  );
}
