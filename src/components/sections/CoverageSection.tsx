import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GreeceCoverageMap } from "@/components/sections/GreeceCoverageMap";
import { AutumnAccent } from "@/components/effects/AutumnAccent";

const serviceLine =
  "Website • E-Commerce • Landing Pages • Apps • Custom Digital Solutions";

export function CoverageSection() {
  return (
    <section
      id="greece"
      className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="coverage-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.07),transparent_55%)]"
        aria-hidden="true"
      />
      <AutumnAccent variant="coverage" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              Coverage
            </p>
            <h2
              id="coverage-heading"
              className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
            >
              Σε όλη την Ελλάδα
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Συνεργαζόμαστε με επιχειρήσεις και επαγγελματίες σε όλη την Ελλάδα,
              ανεξάρτητα από την τοποθεσία τους.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#171717]/90 sm:text-lg">
              Η συνεργασία γίνεται εξ αποστάσεως, από την πρώτη συζήτηση μέχρι την
              ολοκλήρωση και την παράδοση του project.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Κατασκευή ιστοσελίδων, web development, e-commerce, landing pages και
              custom digital solutions — με απομακρυσμένη συνεργασία σε κάθε περιοχή.
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:justify-self-end">
            <figure className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-[24rem]">
              <GreeceCoverageMap />
              <figcaption className="sr-only">
                Ενδεικτικές περιοχές εξυπηρέτησης: Αθήνα, Θεσσαλονίκη, Πάτρα, Λάρισα,
                Ηράκλειο, Χανιά, Καλαμάτα, Ιωάννινα, Ρόδος, Βόλος. Δεν πρόκειται για
                φυσικά γραφεία ή τοποθεσίες πελατών.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col items-center gap-5 text-center">
            <p className="max-w-3xl text-sm font-semibold tracking-wide text-purple-deep sm:text-base">
              {serviceLine}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-purple-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(109,40,217,0.55)] transition duration-300 hover:-translate-y-0.5 hover:bg-purple-bright focus-ring"
            >
              Ξεκίνα το Project σου
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
