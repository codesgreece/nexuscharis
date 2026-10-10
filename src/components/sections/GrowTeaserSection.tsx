import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { GROW_PAGE, nexusGrowth } from "@/content/growth-services";
import { Reveal } from "@/components/ui/Reveal";
import { GrowthDashboard } from "@/components/growth/GrowthDashboard";

const growthBenefits = [
  "SEO",
  "Website Care",
  "Content Updates",
  "Technical Optimization",
  "SEO Monitoring",
  "Basic Monthly Reporting",
  "Priority Support",
];

export function GrowTeaserSection() {
  return (
    <section
      id="grow"
      className="surface-deep section-texture relative overflow-hidden py-14 sm:py-16 lg:py-20"
      aria-labelledby="grow-teaser-heading"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-muted-amber/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-purple-electric/20 blur-3xl" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-amber">
            {GROW_PAGE.eyebrow}
          </p>
          <h2
            id="grow-teaser-heading"
            className="mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-warm-ivory sm:text-3xl lg:text-4xl"
          >
            NEXUS Growth
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-lavender/70 sm:text-lg">
            Το website σου δεν τελειώνει όταν δημοσιευτεί.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-lavender/55">
            {nexusGrowth.description}
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <Reveal>
            <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5 backdrop-blur-sm sm:p-7">
              <span className="inline-flex rounded-full bg-muted-amber px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-purple-deep">
                {nexusGrowth.badge}
              </span>
              <p className="mt-5 text-4xl font-extrabold text-warm-ivory sm:text-5xl">
                {nexusGrowth.price}
              </p>
              <p className="mt-2 text-sm text-lavender/55">Ολοκληρωμένη μηνιαία ψηφιακή φροντίδα</p>

              <ul className="mt-7 space-y-2.5">
                {growthBenefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-lavender"
                  >
                    <Check className="h-4 w-4 shrink-0 text-muted-amber" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`${GROW_PAGE.path}#nexus-growth`}
                  className="cta-glow inline-flex min-h-11 items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
                >
                  Μάθε για το NEXUS Growth
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={GROW_PAGE.path}
                  className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-lavender transition hover:bg-white/10 focus-ring"
                >
                  Όλες οι growth υπηρεσίες
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <GrowthDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
