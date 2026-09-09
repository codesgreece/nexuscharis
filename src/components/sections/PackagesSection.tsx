import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type PackageItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  oldPrice: string | null;
  discount: string | null;
  features: unknown;
  ctaText: string;
  ctaUrl: string;
  highlighted: boolean;
};

function asFeatures(features: unknown): string[] {
  if (Array.isArray(features)) return features.map(String);
  return [];
}

export function PackagesSection({ packages }: { packages: PackageItem[] }) {
  return (
    <section id="packages" className="bg-white py-20 sm:py-24" aria-labelledby="packages-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Πακέτα & Τιμές
          </p>
          <h2
            id="packages-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
          >
            Διάλεξε το πακέτο που σου ταιριάζει
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Οι τιμές ενημερώνονται δυναμικά. Ζήτησε προσφορά για να λάβεις ακριβή κοστολόγηση
            βάσει των αναγκών σου.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {packages.map((pkg, i) => {
            const features = asFeatures(pkg.features);
            return (
              <Reveal key={pkg.id} delay={i * 70}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-[1.5rem] border bg-white p-6 transition hover:-translate-y-1",
                    pkg.highlighted
                      ? "border-2 border-purple-primary shadow-[0_28px_60px_-34px_rgba(109,40,217,0.55)]"
                      : "border-border-soft shadow-[0_16px_40px_-30px_rgba(76,29,149,0.3)]",
                  )}
                >
                  {pkg.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-primary px-3 py-1 text-[11px] font-bold text-white">
                      Πιο Δημοφιλές
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#171717]">{pkg.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.description}</p>

                  <div className="mt-5">
                    {pkg.oldPrice && (
                      <p className="text-sm text-muted line-through">{pkg.oldPrice}</p>
                    )}
                    <p className="text-3xl font-extrabold text-purple-deep">{pkg.price}</p>
                    {pkg.discount && (
                      <p className="mt-1 text-xs font-semibold text-purple-primary">{pkg.discount}</p>
                    )}
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[#171717]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-primary" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={pkg.ctaUrl || "#contact"}
                    className={cn(
                      "mt-8 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus-ring",
                      pkg.highlighted
                        ? "bg-purple-primary text-white hover:bg-purple-bright"
                        : "border border-purple-primary/25 text-purple-deep hover:bg-lavender-soft",
                    )}
                  >
                    {pkg.ctaText}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
