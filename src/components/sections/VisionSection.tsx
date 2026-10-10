import { Reveal } from "@/components/ui/Reveal";
import { BadgeCheck, HeartHandshake, Wallet } from "lucide-react";

type Principle = { number: string; title: string; description: string };

const icons = [Wallet, BadgeCheck, HeartHandshake];

export function VisionSection({
  title,
  statement,
  description,
  principles,
}: {
  title: string;
  statement: string;
  description: string;
  principles: Principle[];
}) {
  const paragraphs = description.split("\n").filter(Boolean);

  return (
    <section
      id="vision"
      className="surface-lavender section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="vision-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,154,85,0.1),transparent_45%)]" />
      <div className="relative z-[1] mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8">
        <Reveal>
          <p className="eyebrow">{title}</p>
          <h2
            id="vision-heading"
            className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-warm-charcoal sm:text-3xl"
          >
            {statement}
          </h2>
          <div className="mt-6 space-y-4">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <a
            href="#contact"
            className="cta-glow mt-8 inline-flex rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
          >
            Διάβασε όλο το όραμά μου
          </a>
        </Reveal>

        <div className="space-y-4">
          {principles.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.number} delay={i * 90}>
                <article className="rounded-[1.25rem] border border-soft-border bg-warm-ivory/90 p-5 shadow-[0_16px_40px_-28px_rgba(65,42,66,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-28px_rgba(65,42,66,0.22)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lavender text-purple-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-amber">{item.number}</p>
                      <h3 className="mt-1 text-lg font-bold text-warm-charcoal">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
