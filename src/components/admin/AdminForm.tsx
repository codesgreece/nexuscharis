"use client";

import { StatusBanner } from "@/components/admin/StatusBanner";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionResult } from "@/server/actions/helpers";
import { useActionState } from "react";

type Action = (prev: ActionResult | null, formData: FormData) => Promise<ActionResult>;

export function AdminForm({
  action,
  children,
  submitLabel = "Save changes",
  className,
}: {
  action: Action;
  children: React.ReactNode;
  submitLabel?: string;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, null);

  const banner =
    state == null
      ? null
      : state.success
        ? { type: "success" as const, message: "Saved successfully." }
        : state.error
          ? {
              type: "error" as const,
              message: state.fieldErrors
                ? `${state.error} — ${Object.entries(state.fieldErrors)
                    .map(([k, v]) => `${k}: ${v.join(", ")}`)
                    .join(" · ")}`
                : state.error,
            }
          : null;

  return (
    <form action={formAction} className={className}>
      {banner ? <StatusBanner type={banner.type} message={banner.message} /> : null}
      {children}
      <div className="mt-6 flex justify-end">
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
