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
        "relative flex h-full scroll-mt-28 flex-col rounded-[1.5rem] border bg-white p-6 transition duration-300 hover:-translate-y-1",
        isFeatured
          ? "border-2 border-purple-primary bg-gradient-to-b from-lavender-soft via-white to-white p-7 shadow-[0_32px_64px_-34px_rgba(109,40,217,0.6)] sm:p-8"
          : "border-border-soft shadow-[0_16px_40px_-30px_rgba(76,29,149,0.3)] hover:border-purple-primary/25 hover:shadow-[0_22px_50px_-28px_rgba(76,29,149,0.4)]",
        className,
      )}
    >
      {service.badge && (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold text-white",
            isFeatured ? "bg-purple-deep" : "bg-purple-primary",
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
              ? "bg-purple-primary text-white"
              : "bg-lavender-soft text-purple-primary",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
            service.billing === "one-time"
              ? "bg-white text-purple-deep ring-1 ring-purple-primary/20"
              : service.billing === "hybrid"
                ? "bg-lavender-soft text-purple-deep"
                : "bg-purple-primary/10 text-purple-deep",
          )}
        >
          {service.billingLabel}
        </span>
      </div>

      <h3
        className={cn(
          "mt-5 font-bold text-[#171717]",
          isFeatured ? "text-2xl sm:text-3xl" : "text-xl",
        )}
      >
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>

      <div className="mt-5">
        <p
          className={cn(
            "font-extrabold text-purple-deep",
            isFeatured ? "text-4xl" : "text-3xl",
          )}
        >
          {service.price}
        </p>
      </div>

      {service.features && service.features.length > 0 && (
        <ul className="mt-6 flex-1 space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-[#171717]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-primary" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {service.examples && service.examples.length > 0 && (
        <ul className="mt-6 flex-1 space-y-2.5">
          {service.examples.map((example) => (
            <li key={example} className="flex items-start gap-2 text-sm text-[#171717]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-primary" aria-hidden />
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
              className="rounded-2xl border border-border-soft bg-lavender-light/80 p-4"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-sm font-bold text-[#171717]">{pkg.title}</h4>
                <p className="text-sm font-extrabold text-purple-deep">{pkg.price}</p>
              </div>
              <ul className="mt-3 space-y-1.5">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs text-[#171717] sm:text-sm"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-primary"
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
            <p key={note} className="text-xs font-medium leading-relaxed text-purple-deep/80">
              {note}
            </p>
          ))}
        </div>
      )}

      {service.extraWork && (
        <p className="mt-3 text-xs font-semibold text-muted">{service.extraWork}</p>
      )}

      <a
        href={service.ctaHref}
        className={cn(
          "mt-8 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus-ring",
          isFeatured
            ? "bg-purple-primary text-white shadow-[0_14px_36px_-16px_rgba(109,40,217,0.7)] hover:bg-purple-bright"
            : "border border-purple-primary/25 text-purple-deep hover:bg-lavender-soft",
        )}
      >
        {service.ctaText}
      </a>
    </article>
  );
}
