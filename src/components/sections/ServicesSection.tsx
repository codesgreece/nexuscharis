"use client";

import { useState } from "react";
import {
  ArrowRight,
  Code2,
  Globe,
  Layers,
  Layout,
  Monitor,
  Settings,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  layout: Layout,
  layers: Layers,
  "shopping-cart": ShoppingCart,
  monitor: Monitor,
  smartphone: Smartphone,
  settings: Settings,
  "code-2": Code2,
};

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

function FlipCard({ service }: { service: ServiceItem }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = iconMap[service.icon] || Globe;

  return (
    <button
      type="button"
      className={cn("flip-card h-[220px] w-full text-left focus-ring rounded-[1.25rem]", flipped && "is-flipped")}
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={`${service.title}. Πάτα για λεπτομέρειες.`}
    >
      <div className="flip-card-inner">
        <div className="flip-face border border-border-soft bg-white p-6 shadow-[0_14px_36px_-28px_rgba(76,29,149,0.35)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-soft text-purple-primary">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-lg font-bold text-[#171717]">{service.title}</h3>
          <p className="mt-3 text-sm text-muted">Πάτα ή hover για λεπτομέρειες</p>
        </div>
        <div className="flip-face flip-back border border-purple-primary/20 bg-gradient-to-br from-purple-deep to-purple-primary p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold">{service.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/90">{service.description}</p>
        </div>
      </div>
    </button>
  );
}

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  return (
    <section id="services" className="bg-white py-20 sm:py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Τι προσφέρουμε
          </p>
          <h2
            id="services-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
          >
            Οι Υπηρεσίες μας
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Από ιστοσελίδες και e-shops μέχρι εφαρμογές και admin panels — κάθε λύση σχεδιάζεται
            γύρω από τις πραγματικές ανάγκες της επιχείρησής σου.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 50}>
              <FlipCard service={service} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-purple-primary/15 bg-lavender-soft px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <div>
              <h3 className="text-lg font-bold text-[#171717]">Χρειάζεσαι κάτι διαφορετικό;</h3>
              <p className="mt-1 text-sm text-muted">
                Μπορούμε να σχεδιάσουμε μια custom λύση αποκλειστικά για τις ανάγκες σου.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-primary text-white transition hover:bg-purple-bright focus-ring"
              aria-label="Επικοινωνία για custom λύση"
            >
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
