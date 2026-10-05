import { Gauge, Search, Smartphone, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  {
    title: "FAST LOADING",
    description:
      "Βελτιστοποιημένη φόρτωση και σωστή διαχείριση assets για καλύτερη εμπειρία χρήσης.",
    icon: Zap,
  },
  {
    title: "RESPONSIVE",
    description:
      "Σχεδιασμός που προσαρμόζεται σωστά σε κινητά, tablets και desktop.",
    icon: Smartphone,
  },
  {
    title: "SEO READY",
    description:
      "Καθαρή τεχνική δομή, metadata, semantic HTML, sitemap και σωστή indexability.",
    icon: Search,
  },
  {
    title: "PERFORMANCE",
    description:
      "Βελτιστοποίηση εικόνων, fonts, scripts και components με στόχο καλύτερη απόδοση.",
    icon: Gauge,
  },
] as const;

export function PerformanceSection() {
  return (
    <section
      id="performance"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
      aria-labelledby="performance-heading"
    >
      {/* Decorative grid — GPU-friendly CSS only */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="perf-line pointer-events-none absolute inset-x-0 top-0 h-px"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Performance
          </p>
          <h2
            id="performance-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl"
          >
            FAST. RESPONSIVE. OPTIMIZED.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Η ταχύτητα και η σωστή τεχνική δομή αποτελούν μέρος κάθε σύγχρονου website.
          </p>
        </Reveal>

        <ul className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <li key={feature.title}>
                <Reveal delay={i * 70}>
                  <article className="group relative h-full overflow-hidden rounded-[1.35rem] border border-border-soft bg-white/90 p-6 shadow-[0_14px_36px_-28px_rgba(76,29,149,0.28)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-purple-primary/30 hover:shadow-[0_22px_50px_-28px_rgba(76,29,149,0.42)]">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-purple-primary via-purple-electric to-transparent transition duration-500 group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-primary/15 bg-lavender-soft text-purple-primary transition duration-300 group-hover:border-purple-primary/30 group-hover:bg-purple-primary group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-sm font-extrabold tracking-[0.12em] text-purple-deep">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
