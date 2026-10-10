"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AutumnAccent } from "@/components/effects/AutumnAccent";
import { ServiceVisual } from "@/components/sections/ServiceVisuals";
import { serviceAnchorId } from "@/content/seo";
import { cn } from "@/lib/utils";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

function FlipCard({ service }: { service: ServiceItem }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={cn(
        "flip-card h-[200px] w-full text-left focus-ring rounded-[1.25rem]",
        flipped && "is-flipped",
      )}
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={`${service.title}. Πάτα για λεπτομέρειες.`}
    >
      <div className="flip-card-inner">
        <div className="flip-face border border-soft-border bg-gradient-to-br from-warm-ivory to-soft-cream p-5 shadow-[0_14px_36px_-28px_rgba(65,42,66,0.2)]">
          <div className="flex h-14 w-full items-center justify-center rounded-2xl border border-purple-primary/10 bg-lavender/60 px-2">
            <ServiceVisual icon={service.icon} className="h-9 w-14" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-warm-charcoal">{service.title}</h3>
          <p className="mt-2 text-sm text-muted">Πάτα ή hover για λεπτομέρειες</p>
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
    <section
      id="services"
      className="surface-ivory section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="services-heading"
    >
      <AutumnAccent variant="services" />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Τι προσφέρουμε</p>
          <h2 id="services-heading" className="section-title mt-3">
            Οι Υπηρεσίες μας
          </h2>
          <p className="section-lead">
            Από ιστοσελίδες και e-shops μέχρι εφαρμογές και admin panels — κάθε λύση σχεδιάζεται
            γύρω από τις πραγματικές ανάγκες της επιχείρησής σου. Δες επίσης τα{" "}
            <a href="#packages" className="font-semibold text-purple-deep underline-offset-2 hover:underline">
              πακέτα & τιμές
            </a>{" "}
            ή{" "}
            <a href="#contact" className="font-semibold text-purple-deep underline-offset-2 hover:underline">
              επικοινώνησε για κατασκευή ιστοσελίδας
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={i * 50}
              className="scroll-mt-28"
              id={serviceAnchorId(service.title)}
            >
              <FlipCard service={service} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-purple-primary/15 bg-lavender/70 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h3 className="text-lg font-bold text-warm-charcoal">Χρειάζεσαι κάτι διαφορετικό;</h3>
              <p className="mt-1 text-sm text-muted">
                Μπορούμε να σχεδιάσουμε μια custom λύση αποκλειστικά για τις ανάγκες σου.
              </p>
            </div>
            <a
              href="#contact"
              className="cta-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
            >
              Επικοινωνία για custom λύση
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
