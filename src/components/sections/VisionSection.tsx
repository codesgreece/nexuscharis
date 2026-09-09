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
      className="relative overflow-hidden bg-gradient-to-br from-lavender-soft via-white to-lavender-light py-20 sm:py-24"
      aria-labelledby="vision-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            {title}
          </p>
          <h2
            id="vision-heading"
            className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-4xl"
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
            className="mt-8 inline-flex rounded-2xl bg-purple-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-bright focus-ring"
          >
            Διάβασε όλο το όραμά μου
          </a>
        </Reveal>

        <div className="space-y-4">
          {principles.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.number} delay={i * 90}>
                <article className="rounded-[1.25rem] border border-border-soft bg-white p-5 shadow-[0_16px_40px_-28px_rgba(76,29,149,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-28px_rgba(76,29,149,0.4)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lavender-soft text-purple-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-purple-electric">{item.number}</p>
                      <h3 className="mt-1 text-lg font-bold text-[#171717]">{item.title}</h3>
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
