import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl, cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  /** Use `light` on deep-purple surfaces */
  tone?: "dark" | "light";
}) {
  const light = tone === "light";

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          light ? "text-lavender/55" : "text-muted",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    light ? "text-muted-amber/60" : "text-purple-primary/50",
                  )}
                  aria-hidden
                />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "font-medium underline-offset-2 transition hover:underline focus-ring rounded",
                    light
                      ? "text-lavender hover:text-muted-amber"
                      : "text-purple-deep hover:text-purple-primary",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast
                      ? light
                        ? "font-semibold text-warm-ivory"
                        : "font-semibold text-warm-charcoal"
                      : "font-medium",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: absoluteUrl(item.href === "/" ? "/" : item.href) }
        : {}),
    })),
  };
}
