import { Check } from "lucide-react";
import type { GrowthService } from "@/content/growth-services";
import { growthIconMap } from "@/components/growth/growthIcons";
import { cn } from "@/lib/utils";

export function ServicePackageCard({
  service,
  className,
}: {
  service: GrowthService;
  className?: string;
}) {
  const Icon = growthIconMap[service.icon];
  const isFeatured = Boolean(service.highlighted);

  return (
    <article
      id={service.id}
      className={cn(
        "relative flex h-full scroll-mt-28 flex-col rounded-[1.5rem] border p-6 transition duration-300 hover:-translate-y-1",
        isFeatured
          ? "border-2 border-purple-primary/40 bg-gradient-to-br from-purple-deep via-[#2e1a4a] to-purple-primary p-7 text-warm-ivory shadow-[0_32px_64px_-34px_rgba(36,21,53,0.55)] sm:p-8"
          : "border-soft-border bg-warm-ivory shadow-[0_16px_40px_-30px_rgba(65,42,66,0.16)] hover:border-purple-primary/25 hover:shadow-[0_22px_50px_-28px_rgba(65,42,66,0.22)]",
        className,
      )}
    >
      {service.badge && (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold text-white",
            isFeatured ? "bg-muted-amber text-purple-deep" : "bg-purple-primary",
          )}
        >
          {service.badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            isFeatured
              ? "bg-white/15 text-lavender"
              : "bg-lavender text-purple-primary",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
            isFeatured
              ? "bg-white/10 text-lavender"
              : service.billing === "one-time"
                ? "bg-warm-ivory text-purple-deep ring-1 ring-purple-primary/20"
                : service.billing === "hybrid"
                  ? "bg-lavender text-purple-deep"
                  : "bg-purple-primary/10 text-purple-deep",
          )}
        >
          {service.billingLabel}
        </span>
      </div>

      <h3
        className={cn(
          "mt-5 font-bold",
          isFeatured ? "text-2xl text-warm-ivory sm:text-3xl" : "text-xl text-warm-charcoal",
        )}
      >
        {service.title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          isFeatured ? "text-lavender/70" : "text-muted",
        )}
      >
        {service.description}
      </p>

      <div className="mt-5">
        <p
          className={cn(
            "font-extrabold",
            isFeatured ? "text-4xl text-warm-ivory" : "text-3xl text-purple-deep",
          )}
        >
          {service.price}
        </p>
      </div>

      {service.features && service.features.length > 0 && (
        <ul className="mt-6 flex-1 space-y-2.5">
          {service.features.map((feature) => (
            <li
              key={feature}
              className={cn(
                "flex items-start gap-2 text-sm",
                isFeatured ? "text-lavender/85" : "text-warm-charcoal",
              )}
            >
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  isFeatured ? "text-muted-amber" : "text-purple-primary",
                )}
                aria-hidden
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {service.examples && service.examples.length > 0 && (
        <ul className="mt-6 flex-1 space-y-2.5">
          {service.examples.map((example) => (
            <li
              key={example}
              className={cn(
                "flex items-start gap-2 text-sm",
                isFeatured ? "text-lavender/85" : "text-warm-charcoal",
              )}
            >
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  isFeatured ? "text-muted-amber" : "text-purple-primary",
                )}
                aria-hidden
              />
              <span>{example}</span>
            </li>
          ))}
        </ul>
      )}

      {service.packages && service.packages.length > 0 && (
        <div className="mt-6 flex-1 space-y-4">
          {service.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "rounded-2xl border p-4",
                isFeatured
                  ? "border-white/12 bg-white/8"
                  : "border-soft-border bg-lavender/50",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4
                  className={cn(
                    "text-sm font-bold",
                    isFeatured ? "text-warm-ivory" : "text-warm-charcoal",
                  )}
                >
                  {pkg.title}
                </h4>
                <p
                  className={cn(
                    "text-sm font-extrabold",
                    isFeatured ? "text-muted-amber" : "text-purple-deep",
                  )}
                >
                  {pkg.price}
                </p>
              </div>
              <ul className="mt-3 space-y-1.5">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-2 text-xs sm:text-sm",
                      isFeatured ? "text-lavender/75" : "text-warm-charcoal",
                    )}
                  >
                    <Check
                      className={cn(
                        "mt-0.5 h-3.5 w-3.5 shrink-0",
                        isFeatured ? "text-muted-amber" : "text-purple-primary",
                      )}
                      aria-hidden
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {service.notes && service.notes.length > 0 && (
        <div className="mt-5 space-y-1.5">
          {service.notes.map((note) => (
            <p
              key={note}
              className={cn(
                "text-xs font-medium leading-relaxed",
                isFeatured ? "text-lavender/60" : "text-purple-deep/80",
              )}
            >
              {note}
            </p>
          ))}
        </div>
      )}

      {service.extraWork && (
        <p
          className={cn(
            "mt-3 text-xs font-semibold",
            isFeatured ? "text-lavender/50" : "text-muted",
          )}
        >
          {service.extraWork}
        </p>
      )}

      <a
        href={service.ctaHref}
        className={cn(
          "mt-8 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus-ring",
          isFeatured
            ? "bg-warm-ivory text-purple-deep hover:bg-lavender"
            : "border border-purple-primary/25 text-purple-deep hover:bg-lavender",
        )}
      >
        {service.ctaText}
      </a>
    </article>
  );
}
