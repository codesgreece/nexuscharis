import {
  CheckCircle2,
  Code2,
  MessageCircle,
  PenTool,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "message-circle": MessageCircle,
  "pen-tool": PenTool,
  "code-2": Code2,
  "check-circle": CheckCircle2,
};

type Step = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
};

export function ProcessSection({ steps }: { steps: Step[] }) {
  return (
    <section
      className="surface-cream section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="process-heading"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Process</p>
          <h2 id="process-heading" className="section-title mt-3">
            Πώς δουλεύουμε
          </h2>
        </Reveal>

        <div className="process-track mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon] || MessageCircle;
            return (
              <Reveal key={step.id} delay={i * 80}>
                <article className="relative z-[1] h-full rounded-[1.35rem] border border-soft-border bg-warm-ivory/95 p-6 shadow-[0_12px_32px_-28px_rgba(65,42,66,0.16)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(65,42,66,0.22)]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-primary/20 bg-lavender/50 text-purple-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold tabular-nums text-purple-primary">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-warm-charcoal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                  {i < steps.length - 1 ? (
                    <span
                      className="pointer-events-none absolute -right-3 top-8 hidden h-px w-6 bg-gradient-to-r from-purple-primary/40 to-muted-amber/40 lg:block"
                      aria-hidden
                    />
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
