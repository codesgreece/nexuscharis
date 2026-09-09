"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

export function StatusBanner({
  type,
  message,
  onDismiss,
}: {
  type: "success" | "error";
  message: string;
  onDismiss?: () => void;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHidden(true);
      onDismiss?.();
    }, 4500);
    return () => clearTimeout(t);
  }, [message, type, onDismiss]);

  if (hidden || !message) return null;

  return (
    <div
      role="status"
      className={cn(
        "mb-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-sm",
        type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-red-200 bg-red-50 text-red-900",
      )}
    >
      {type === "success" ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <p className="flex-1 leading-relaxed">{message}</p>
      <button
        type="button"
        className="rounded-lg p-1 opacity-60 hover:opacity-100"
        onClick={() => {
          setHidden(true);
          onDismiss?.();
        }}
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
