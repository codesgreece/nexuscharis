"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

function ServiceShowcaseCard({ service }: { service: ServiceItem }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-soft-border bg-gradient-to-br from-warm-ivory to-soft-cream p-4 shadow-[0_14px_36px_-28px_rgba(65,42,66,0.18)] transition duration-300",
        "hover:-translate-y-1 hover:border-purple-primary/35 hover:shadow-[0_22px_48px_-28px_rgba(109,40,217,0.28)]",
      )}
    >
      <button
        type="button"
        className="w-full text-left focus-ring rounded-[1.1rem]"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${service.title}. Πάτα για λεπτομέρειες.`}
      >
        <div className="relative flex h-[7.5rem] items-center justify-center overflow-hidden rounded-[1.1rem] border border-purple-primary/10 bg-lavender/50 px-3 transition duration-300 group-hover:bg-lavender/80">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse at 70% 30%, rgba(109,40,217,0.12), transparent 55%)",
            }}
            aria-hidden
          />
          <ServiceVisual
            icon={service.icon}
            className="relative h-[4.75rem] w-[7.25rem] transition duration-500 group-hover:-translate-y-0.5 group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-warm-charcoal">{service.title}</h3>
          <ArrowUpRight
            className="mt-0.5 h-4 w-4 shrink-0 text-purple-primary opacity-0 transition duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </div>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed text-muted transition-all",
            open ? "line-clamp-none" : "line-clamp-2",
          )}
        >
          {service.description}
        </p>
        <p className="mt-3 text-xs font-semibold text-purple-primary">
          {open ? "Κλείσιμο λεπτομερειών" : "Περισσότερα"}
        </p>
      </button>
    </article>
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={i * 50}
              className="scroll-mt-28"
              id={serviceAnchorId(service.title)}
            >
              <ServiceShowcaseCard service={service} />
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
              className="cta-glow inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
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
