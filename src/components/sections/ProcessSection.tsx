import {
  CheckCircle2,
  Code2,
  MessageCircle,
  PenTool,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

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

        <div className="process-track relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="process-line pointer-events-none absolute left-[8%] right-[8%] top-[2.35rem] z-0 hidden lg:block" aria-hidden>
            <svg className="h-2 w-full overflow-visible" viewBox="0 0 100 4" preserveAspectRatio="none">
              <line
                x1="0"
                y1="2"
                x2="100"
                y2="2"
                stroke="rgba(109,40,217,0.18)"
                strokeWidth="1.5"
              />
              <line
                className="process-line-draw"
                x1="0"
                y1="2"
                x2="100"
                y2="2"
                stroke="url(#processGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="100"
                strokeDashoffset="100"
              />
              <defs>
                <linearGradient id="processGrad" x1="0" y1="0" x2="100" y2="0">
                  <stop stopColor="#6D28D9" />
                  <stop offset="0.5" stopColor="#D99A55" />
                  <stop offset="1" stopColor="#6D28D9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, i) => {
            const Icon = iconMap[step.icon] || MessageCircle;
            return (
              <Reveal key={step.id} delay={i * 90}>
                <article
                  className={cn(
                    "relative z-[1] flex h-full flex-col rounded-[1.35rem] border border-soft-border bg-warm-ivory/95 p-6",
                    "shadow-[0_12px_32px_-28px_rgba(65,42,66,0.16)] transition duration-300",
                    "hover:-translate-y-1 hover:border-purple-primary/30 hover:shadow-[0_20px_50px_-30px_rgba(109,40,217,0.22)]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-primary/20 bg-lavender/60 text-purple-primary shadow-[0_0_20px_-8px_rgba(109,40,217,0.35)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-sm font-bold tabular-nums text-purple-primary/70">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-warm-charcoal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
