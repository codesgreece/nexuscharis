"use client";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatusBanner } from "@/components/admin/StatusBanner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ActionResult } from "@/server/actions/helpers";

function isNextRedirect(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    String((error as { digest: string }).digest).startsWith("NEXT_REDIRECT")
  );
}

export function DeleteButton({
  id,
  label = "Delete",
  confirmTitle = "Delete item?",
  confirmDescription = "This action cannot be undone.",
  action,
}: {
  id: string;
  label?: string;
  confirmTitle?: string;
  confirmDescription?: string;
  action: (id: string) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <>
      {error ? <StatusBanner type="error" message={error} onDismiss={() => setError(null)} /> : null}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
      >
        {label}
      </button>
      <ConfirmDialog
        open={open}
        title={confirmTitle}
        description={confirmDescription}
        loading={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          startTransition(async () => {
            try {
              const result = await action(id);
              if (!result.success) {
                setError(result.error || "Delete failed");
                setOpen(false);
                return;
              }
              setOpen(false);
              router.refresh();
            } catch (err) {
              if (isNextRedirect(err)) {
                setOpen(false);
                return;
              }
              setError("Delete failed");
              setOpen(false);
            }
          });
        }}
      />
    </>
  );
}
