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
    <section className="bg-lavender-light py-20 sm:py-24" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Process
          </p>
          <h2
            id="process-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
          >
            Πώς δουλεύουμε
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon] || MessageCircle;
            return (
              <Reveal key={step.id} delay={i * 80}>
                <article className="h-full rounded-[1.35rem] border border-border-soft bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(76,29,149,0.4)]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-primary/20 text-purple-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-purple-electric">{step.number}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#171717]">{step.title}</h3>
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
