import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn(className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-[0.18em]",
            dark ? "text-muted-amber" : "text-purple-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "mt-2.5 text-2xl font-extrabold tracking-tight sm:text-3xl",
          dark ? "text-warm-ivory" : "text-warm-charcoal",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <div
          className={cn(
            "mt-3 max-w-2xl text-sm leading-relaxed sm:text-base",
            dark ? "text-lavender/70" : "text-muted",
          )}
        >
          {lead}
        </div>
      ) : null}
    </div>
  );
}
