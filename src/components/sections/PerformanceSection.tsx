import { Reveal } from "@/components/ui/Reveal";

/** Illustrative performance dashboard visuals — not live metrics. */
function SpeedVisual() {
  return (
    <svg viewBox="0 0 120 72" className="h-16 w-full" aria-hidden>
      <path
        d="M20 56 A40 40 0 0 1 100 56"
        fill="none"
        stroke="#EDE4FF"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M20 56 A40 40 0 0 1 88 28"
        fill="none"
        stroke="#6D28D9"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="60" cy="56" r="3.5" fill="#D99A55" />
      <line x1="60" y1="56" x2="82" y2="32" stroke="#D99A55" strokeWidth="2.5" strokeLinecap="round" />
      <text x="60" y="48" textAnchor="middle" fill="#241535" fontSize="11" fontWeight="800">
        Fast
      </text>
    </svg>
  );
}

function ResponsiveVisual() {
  return (
    <svg viewBox="0 0 120 72" className="h-16 w-full" aria-hidden>
      <rect x="8" y="18" width="52" height="38" rx="4" fill="#FFFCF7" stroke="#6D28D9" strokeWidth="1.4" />
      <rect x="14" y="24" width="28" height="4" rx="1" fill="#6D28D9" opacity="0.25" />
      <rect x="14" y="32" width="40" height="3" rx="1" fill="#6D28D9" opacity="0.12" />
      <rect x="68" y="12" width="22" height="42" rx="4" fill="#EDE4FF" stroke="#6D28D9" strokeWidth="1.4" />
      <rect x="72" y="18" width="14" height="28" rx="2" fill="#FFFCF7" />
      <rect x="96" y="22" width="16" height="28" rx="3" fill="#FFFCF7" stroke="#D99A55" strokeWidth="1.3" />
    </svg>
  );
}

function SeoVisual() {
  return (
    <svg viewBox="0 0 120 72" className="h-16 w-full" aria-hidden>
      <circle cx="48" cy="36" r="22" fill="#EDE4FF" stroke="#6D28D9" strokeWidth="1.5" />
      <circle cx="48" cy="36" r="14" fill="#FFFCF7" stroke="#6D28D9" strokeWidth="1.2" />
      <path d="M64 52 L78 66" stroke="#D99A55" strokeWidth="3.5" strokeLinecap="round" />
      <text x="48" y="40" textAnchor="middle" fill="#6D28D9" fontSize="9" fontWeight="800">
        SEO
      </text>
    </svg>
  );
}

function GraphVisual() {
  return (
    <svg viewBox="0 0 120 72" className="h-16 w-full" aria-hidden>
      <rect x="10" y="10" width="100" height="52" rx="6" fill="#FFFCF7" stroke="#6D28D9" strokeWidth="1.2" />
      <path
        d="M22 48 C38 44, 42 28, 54 32 S72 50, 84 30 S100 22, 102 20"
        fill="none"
        stroke="#6D28D9"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 48 C38 44, 42 28, 54 32 S72 50, 84 30 S100 22, 102 20 V54 H22 Z"
        fill="#EDE4FF"
        opacity="0.55"
      />
      <circle cx="84" cy="30" r="3" fill="#D99A55" />
    </svg>
  );
}

const features = [
  {
    title: "FAST LOADING",
    description:
      "Βελτιστοποιημένη φόρτωση και σωστή διαχείριση assets για καλύτερη εμπειρία χρήσης.",
    Visual: SpeedVisual,
  },
  {
    title: "RESPONSIVE",
    description:
      "Σχεδιασμός που προσαρμόζεται σωστά σε κινητά, tablets και desktop.",
    Visual: ResponsiveVisual,
  },
  {
    title: "SEO READY",
    description:
      "Καθαρή τεχνική δομή, metadata, semantic HTML, sitemap και σωστή indexability.",
    Visual: SeoVisual,
  },
  {
    title: "PERFORMANCE",
    description:
      "Βελτιστοποίηση εικόνων, fonts, scripts και components με στόχο καλύτερη απόδοση.",
    Visual: GraphVisual,
  },
] as const;

export function PerformanceSection() {
  return (
    <section
      id="performance"
      className="surface-ivory section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="performance-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(217,154,85,0.1),transparent_70%)]"
        aria-hidden
      />
      <div className="perf-line pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Performance</p>
          <h2 id="performance-heading" className="section-title mt-3">
            FAST. RESPONSIVE. OPTIMIZED.
          </h2>
          <p className="section-lead">
            Η ταχύτητα και η σωστή τεχνική δομή αποτελούν μέρος κάθε σύγχρονου website.
          </p>
        </Reveal>

        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Visual = feature.Visual;
            return (
              <li key={feature.title}>
                <Reveal delay={i * 70}>
                  <article className="group relative h-full overflow-hidden rounded-[1.35rem] border border-soft-border bg-warm-ivory/95 p-5 shadow-[0_14px_36px_-28px_rgba(65,42,66,0.16)] transition duration-300 hover:-translate-y-1 hover:border-purple-primary/30 hover:shadow-[0_22px_50px_-28px_rgba(109,40,217,0.22)]">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-purple-primary via-muted-amber to-transparent transition duration-500 group-hover:scale-x-100"
                      aria-hidden
                    />
                    <div className="rounded-xl border border-purple-primary/10 bg-lavender/40 px-2 py-2 transition duration-300 group-hover:bg-lavender/70">
                      <Visual />
                    </div>
                    <h3 className="mt-4 text-sm font-extrabold tracking-[0.12em] text-purple-deep">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {feature.description}
                    </p>
                    <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-muted/50">
                      Illustrative graphic
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
