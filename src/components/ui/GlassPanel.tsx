import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassPanel({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "rounded-[1.35rem] border backdrop-blur-md",
        tone === "light"
          ? "border-soft-border/80 bg-warm-ivory/75 shadow-[0_16px_40px_-30px_rgba(65,42,66,0.18)]"
          : "border-white/12 bg-white/8 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
