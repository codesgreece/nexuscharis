import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { GROW_PAGE, nexusGrowth } from "@/content/growth-services";
import { Reveal } from "@/components/ui/Reveal";

/** Decorative dashboard preview — illustrative only, not real client metrics */
function GrowthDashboardPreview() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-white/15 bg-white/8 p-3">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-lavender/60">
        <span>NEXUS Growth</span>
        <span className="inline-flex items-center gap-1 text-muted-amber">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-amber" />
          Active
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { label: "Website", value: "Healthy" },
          { label: "SEO", value: "Monitoring" },
          { label: "Care", value: "Monthly" },
          { label: "Report", value: "Ready" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2"
          >
            <p className="text-[9px] uppercase tracking-wide text-lavender/45">{item.label}</p>
            <p className="mt-0.5 text-xs font-semibold text-lavender">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GrowTeaserSection() {
  return (
    <section
      id="grow"
      className="surface-lavender section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="grow-teaser-heading"
    >
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-purple-primary/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-muted-amber/10 blur-3xl" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">{GROW_PAGE.eyebrow}</p>
          <h2
            id="grow-teaser-heading"
            className="section-title mt-3 max-w-2xl"
          >
            Grow Your Business
          </h2>
          <p className="section-lead">{GROW_PAGE.subtitle}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <article className="rounded-[1.5rem] border border-soft-border bg-warm-ivory/95 p-5 shadow-[0_16px_40px_-30px_rgba(65,42,66,0.18)] sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender text-purple-primary">
                <Rocket className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-bold text-warm-charcoal">
                SEO, Website Care, Speed Boost &amp; περισσότερα
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Μετά την κατασκευή της ιστοσελίδας, η NEXUS συνεχίζει με μηνιαία και εφάπαξ
                υπηρεσίες: SEO, Website Care, Dedicated Support, Local SEO, Branding και το
                πακέτο {nexusGrowth.title} από {nexusGrowth.price}.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-warm-charcoal sm:grid-cols-2">
                <li className="rounded-xl bg-soft-cream px-3 py-2">Μηνιαία πακέτα support</li>
                <li className="rounded-xl bg-soft-cream px-3 py-2">Εφάπαξ αλλαγές από 25€</li>
                <li className="rounded-xl bg-soft-cream px-3 py-2">SEO &amp; Local SEO</li>
                <li className="rounded-xl bg-soft-cream px-3 py-2">
                  {nexusGrowth.badge}: {nexusGrowth.title}
                </li>
              </ul>
              <Link
                href={GROW_PAGE.path}
                className="cta-glow mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
              >
                Δες όλες τις υπηρεσίες growth
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>

            <aside className="relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-purple-deep via-[#2e1a4a] to-purple-primary p-5 text-white shadow-[0_28px_60px_-34px_rgba(36,21,53,0.55)] sm:p-6">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-muted-amber/20 blur-2xl"
                aria-hidden
              />
              <div className="relative">
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                  {nexusGrowth.badge}
                </span>
                <h3 className="mt-4 text-2xl font-extrabold">{nexusGrowth.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {nexusGrowth.description}
                </p>
                <p className="mt-5 text-3xl font-extrabold">{nexusGrowth.price}</p>
                <GrowthDashboardPreview />
              </div>
              <Link
                href={`${GROW_PAGE.path}#nexus-growth`}
                className="relative mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-warm-ivory px-4 py-3 text-sm font-semibold text-purple-deep transition hover:bg-lavender focus-ring"
              >
                Μάθε για το NEXUS Growth
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
