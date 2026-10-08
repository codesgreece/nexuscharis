import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { GROW_PAGE, nexusGrowth } from "@/content/growth-services";
import { Reveal } from "@/components/ui/Reveal";

export function GrowTeaserSection() {
  return (
    <section
      id="grow"
      className="relative overflow-hidden bg-lavender-light py-12 sm:py-14 lg:py-16"
      aria-labelledby="grow-teaser-heading"
    >
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-purple-primary/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-purple-electric/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            {GROW_PAGE.eyebrow}
          </p>
          <h2
            id="grow-teaser-heading"
            className="mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
          >
            Grow Your Business
          </h2>
          <p className="mt-4 max-w-2xl text-muted">{GROW_PAGE.subtitle}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <article className="rounded-[1.5rem] border border-border-soft bg-white p-5 shadow-[0_16px_40px_-30px_rgba(76,29,149,0.3)] sm:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-soft text-purple-primary">
                <Rocket className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#171717]">
                SEO, Website Care, Speed Boost &amp; περισσότερα
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Μετά την κατασκευή της ιστοσελίδας, η NEXUS συνεχίζει με μηνιαία και εφάπαξ
                υπηρεσίες: SEO, Website Care, Dedicated Support, Local SEO, Branding και το
                πακέτο {nexusGrowth.title} από {nexusGrowth.price}.
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-[#171717] sm:grid-cols-2">
                <li className="rounded-xl bg-lavender-light px-3 py-2">Μηνιαία πακέτα support</li>
                <li className="rounded-xl bg-lavender-light px-3 py-2">Εφάπαξ αλλαγές από 25€</li>
                <li className="rounded-xl bg-lavender-light px-3 py-2">SEO &amp; Local SEO</li>
                <li className="rounded-xl bg-lavender-light px-3 py-2">
                  {nexusGrowth.badge}: {nexusGrowth.title}
                </li>
              </ul>
              <Link
                href={GROW_PAGE.path}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-purple-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-bright focus-ring"
              >
                Δες όλες τις υπηρεσίες growth
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>

            <aside className="flex flex-col justify-between rounded-[1.5rem] border-2 border-purple-primary bg-gradient-to-br from-purple-deep to-purple-primary p-5 text-white shadow-[0_28px_60px_-34px_rgba(109,40,217,0.55)] sm:p-6">
              <div>
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                  {nexusGrowth.badge}
                </span>
                <h3 className="mt-4 text-2xl font-extrabold">{nexusGrowth.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {nexusGrowth.description}
                </p>
                <p className="mt-5 text-3xl font-extrabold">{nexusGrowth.price}</p>
              </div>
              <Link
                href={`${GROW_PAGE.path}#nexus-growth`}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-purple-deep transition hover:bg-lavender-soft focus-ring"
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
