import { Inbox } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border-soft bg-lavender-light/60 px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-primary shadow-sm">
        <Inbox className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-purple-deep">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted">{description}</p>
      ) : null}
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="mt-6">
          <Button type="button" size="sm">
            {actionLabel}
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
