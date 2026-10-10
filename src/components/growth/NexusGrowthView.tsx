import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { nexusGrowth, growthFaqItems } from "@/content/growth-services";
import { Breadcrumbs } from "@/components/growth/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";

const includes = [
  "SEO",
  "Website Maintenance",
  "Content Updates",
  "Technical Optimization",
  "SEO Monitoring",
  "Monthly Reporting",
  "Priority Support",
];

const whyItems = [
  "Δεν χρειάζεται να ασχολείσαι με τεχνικά θέματα",
  "Το website παραμένει ενημερωμένο",
  "Συνεχής τεχνική βελτιστοποίηση",
  "SEO monitoring",
  "Μηνιαία υποστήριξη",
];

const monthlyProcess = [
  { step: "01", title: "Έλεγχος", body: "Τεχνικός και SEO έλεγχος της τρέχουσας κατάστασης." },
  {
    step: "02",
    title: "Βελτιστοποίηση",
    body: "Βελτιώσεις απόδοσης, τεχνικού SEO και σταθερότητας.",
  },
  {
    step: "03",
    title: "Ενημερώσεις",
    body: "Ενημερώσεις περιεχομένου και συντήρηση όπου χρειάζεται.",
  },
  {
    step: "04",
    title: "Monitoring",
    body: "Παρακολούθηση SEO σημάτων και βασικών τεχνικών δεικτών.",
  },
  {
    step: "05",
    title: "Report",
    body: "Σύντομη μηνιαία αναφορά για όσα έγιναν και τι ακολουθεί.",
  },
];

export function NexusGrowthView() {
  return (
    <>
      <section className="surface-deep section-texture relative overflow-hidden pb-12 pt-8 sm:pb-14 sm:pt-10">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-muted-amber/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-purple-electric/25 blur-3xl" />

        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Breadcrumbs
              tone="light"
              items={[
                { label: "Αρχική", href: "/" },
                { label: "Grow Your Business", href: "/grow-your-business" },
                { label: "NEXUS Growth" },
              ]}
            />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-lavender shadow-sm">
                  <span className="rounded-full bg-muted-amber px-2 py-0.5 text-purple-deep">
                    BEST VALUE
                  </span>
                  Monthly recurring
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-muted-amber">
                  NEXUS GROWTH
                </p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-warm-ivory sm:text-4xl lg:text-5xl">
                  Το website σου δεν χρειάζεται απλώς να υπάρχει.
                  <span className="mt-2 block text-lavender">
                    Πρέπει να δουλεύει για την επιχείρησή σου.
                  </span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-lavender/70 sm:text-lg">
                  {nexusGrowth.description} Ολοκληρωμένη μηνιαία υπηρεσία με SEO, συντήρηση και
                  συνεχή υποστήριξη.
                </p>
                <p className="mt-6 text-4xl font-extrabold text-warm-ivory sm:text-5xl">
                  119€
                  <span className="ml-2 text-lg font-bold text-lavender/55">/μήνα</span>
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="cta-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-purple-primary to-purple-bright px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
                  >
                    Ξεκίνα με NEXUS Growth →
                  </Link>
                  <a
                    href="#includes"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-semibold text-lavender transition hover:bg-white/12 focus-ring"
                  >
                    Δες τι περιλαμβάνει
                  </a>
                </div>
              </div>

              {/* Decorative status panel — illustrative only */}
              <aside
                className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm"
                aria-hidden="true"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-lavender/50">
                  Service overview
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: "Website status", value: "Maintained" },
                    { label: "SEO monitoring", value: "Active" },
                    { label: "Performance", value: "Optimized" },
                    { label: "Monthly reporting", value: "Included" },
                  ].map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
                    >
                      <span className="text-sm text-lavender/70">{row.label}</span>
                      <span className="text-sm font-semibold text-muted-amber">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="includes" className="scroll-mt-28 bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl">
              Τι περιλαμβάνει
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Ένα μηνιαίο πακέτο που καλύπτει τα βασικά για να παραμένει το website σου ενεργό,
              ενημερωμένο και τεχνικά σε καλή κατάσταση.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((item, i) => (
              <Reveal key={item} delay={i * 40}>
                <div className="flex items-start gap-3 rounded-[1.25rem] border border-border-soft bg-lavender-light/60 px-5 py-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-primary" aria-hidden />
                  <span className="text-sm font-semibold text-[#171717]">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lavender-light py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl">
              Γιατί NEXUS Growth
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => (
              <Reveal key={item} delay={i * 40}>
                <li className="rounded-[1.25rem] border border-border-soft bg-white/90 p-5 shadow-[0_16px_40px_-34px_rgba(76,29,149,0.35)]">
                  <p className="text-sm font-semibold leading-relaxed text-[#171717]">{item}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl">
              Τι κάνουμε κάθε μήνα
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Μια σταθερή διαδικασία ώστε να υπάρχει συνέπεια — χωρίς υποσχέσεις για συγκεκριμένη
              θέση στη Google.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {monthlyProcess.map((item, i) => (
              <Reveal key={item.step} delay={i * 50}>
                <li className="relative h-full rounded-[1.25rem] border border-border-soft bg-lavender-light/50 p-5">
                  <p className="text-xs font-extrabold tracking-[0.14em] text-purple-primary">
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-base font-bold text-[#171717]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-lavender-light py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-[1.75rem] border-2 border-purple-primary bg-gradient-to-b from-white via-lavender-soft to-white p-7 text-center shadow-[0_32px_64px_-34px_rgba(109,40,217,0.55)] sm:p-10">
              <span className="inline-flex rounded-full bg-purple-deep px-3 py-1 text-[11px] font-bold text-white">
                BEST VALUE
              </span>
              <h2 className="mt-5 text-2xl font-extrabold text-[#171717] sm:text-3xl">
                Pricing
              </h2>
              <p className="mt-4 text-5xl font-extrabold text-purple-deep">119€</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted">
                Μηνιαία συνδρομή · recurring monthly service
              </p>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
                Χωρίς μακροχρόνια δέσμευση. Ξεκινάς όταν είναι σωστό για την επιχείρησή σου.
              </p>
              <Link
                href="/#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-purple-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-bright focus-ring"
              >
                Ζήτησε NEXUS Growth →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl">
              FAQ
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {growthFaqItems.slice(0, 5).map((item, i) => (
              <Reveal key={item.id} delay={i * 40}>
                <details className="group rounded-[1.25rem] border border-border-soft bg-lavender-light/40 px-5 py-4 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer list-none font-semibold text-[#171717] marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {item.question}
                      <span className="text-purple-primary transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                    {item.answer.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lavender-light pb-14 pt-4 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] border border-purple-primary/15 bg-gradient-to-br from-white via-lavender-soft to-white px-6 py-8 shadow-[0_20px_50px_-36px_rgba(109,40,217,0.45)] sm:flex-row sm:items-center sm:px-10">
              <div className="max-w-xl">
                <h2 className="text-xl font-extrabold tracking-tight text-[#171717] sm:text-2xl">
                  Έτοιμος να αφήσεις το website σου να δουλεύει για την επιχείρησή σου;
                </h2>
                <p className="mt-3 text-sm text-muted sm:text-base">
                  Επικοινώνησε μαζί μας για να δούμε αν το NEXUS Growth ταιριάζει στις ανάγκες σου.
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-purple-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_-16px_rgba(109,40,217,0.7)] transition hover:-translate-y-0.5 hover:bg-purple-bright focus-ring"
              >
                Ζήτησε NEXUS Growth →
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
