import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const serviceLine =
  "Website • E-Commerce • Landing Pages • Apps • Custom Digital Solutions";

const cities = [
  { name: "Αθήνα", x: 52, y: 50 },
  { name: "Θεσσαλονίκη", x: 50, y: 16 },
  { name: "Πάτρα", x: 30, y: 46 },
  { name: "Λάρισα", x: 44, y: 30 },
  { name: "Ηράκλειο", x: 58, y: 91 },
  { name: "Χανιά", x: 40, y: 90 },
  { name: "Καλαμάτα", x: 34, y: 78 },
  { name: "Ιωάννινα", x: 26, y: 26 },
  { name: "Ρόδος", x: 84, y: 76 },
  { name: "Βόλος", x: 54, y: 34 },
] as const;

function GreeceMapIllustration() {
  return (
    <svg
      viewBox="0 0 400 480"
      role="img"
      aria-label="Ενδεικτικές περιοχές εξυπηρέτησης σε όλη την Ελλάδα"
      className="mx-auto h-auto w-full max-w-md"
    >
      <title>Περιοχές εξυπηρέτησης στην Ελλάδα</title>
      <desc>
        Διακοσμητικός χάρτης με ενδεικτικές πόλεις εξυπηρέτησης — όχι φυσικά γραφεία
        ή τοποθεσίες πελατών.
      </desc>

      {/* Soft backdrop glow */}
      <defs>
        <linearGradient id="greece-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f3ff" />
          <stop offset="55%" stopColor="#eee8ff" />
          <stop offset="100%" stopColor="#e9e5f5" />
        </linearGradient>
        <linearGradient id="greece-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="map-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="10"
            floodColor="#4c1d95"
            floodOpacity="0.12"
          />
        </filter>
      </defs>

      {/* Decorative grid dots */}
      <g aria-hidden="true" opacity="0.35">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 6 }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={40 + col * 55}
              cy={30 + row * 55}
              r="1.2"
              fill="#8b5cf6"
            />
          )),
        )}
      </g>

      {/* Simplified Greece silhouette — mainland + Peloponnese + Crete + islands */}
      <g filter="url(#map-soft)" aria-hidden="true">
        {/* Mainland / north–central */}
        <path
          d="M118 72
             C132 48 168 38 198 42
             C228 46 252 62 262 88
             C274 118 268 148 254 168
             C246 182 238 196 242 214
             C248 236 236 252 214 258
             C192 264 176 278 168 298
             C158 320 148 338 128 348
             C108 358 92 348 86 328
             C78 302 86 278 96 258
             C104 242 98 224 88 208
             C74 182 72 152 82 128
             C92 104 104 88 118 72 Z"
          fill="url(#greece-fill)"
          stroke="url(#greece-stroke)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Peloponnese */}
        <path
          d="M128 348
             C142 356 158 368 162 388
             C166 408 152 424 132 428
             C112 432 96 418 92 400
             C88 382 96 364 108 354
             C114 350 120 348 128 348 Z"
          fill="url(#greece-fill)"
          stroke="url(#greece-stroke)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Crete */}
        <path
          d="M148 430
             C178 422 228 420 268 428
             C292 434 298 448 278 454
             C242 462 188 464 158 456
             C138 450 132 438 148 430 Z"
          fill="url(#greece-fill)"
          stroke="url(#greece-stroke)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Rhodes-ish */}
        <path
          d="M318 360
             C328 352 342 358 344 372
             C346 386 334 396 322 392
             C310 388 308 368 318 360 Z"
          fill="url(#greece-fill)"
          stroke="url(#greece-stroke)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Small island accents */}
        <circle cx="288" cy="300" r="7" fill="url(#greece-fill)" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="302" cy="248" r="5" fill="url(#greece-fill)" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="270" cy="220" r="4.5" fill="url(#greece-fill)" stroke="#7c3aed" strokeWidth="1.5" />
      </g>

      {/* City markers — service coverage labels, not offices/clients */}
      <g>
        {cities.map((city) => {
          const cx = (city.x / 100) * 400;
          const cy = (city.y / 100) * 480;
          return (
            <g key={city.name} className="greece-city-marker">
              <circle
                cx={cx}
                cy={cy}
                r="14"
                fill="rgba(109,40,217,0.08)"
                aria-hidden="true"
              />
              <circle
                cx={cx}
                cy={cy}
                r="5"
                fill="#6d28d9"
                stroke="#fff"
                strokeWidth="2"
                aria-hidden="true"
              />
              <text
                x={cx}
                y={cy - 16}
                textAnchor="middle"
                fill="#4c1d95"
                fontSize="11"
                fontWeight="600"
                style={{ fontFamily: "inherit" }}
              >
                {city.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function CoverageSection() {
  return (
    <section
      id="greece"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
      aria-labelledby="coverage-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.08),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
              Coverage
            </p>
            <h2
              id="coverage-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
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

          <Reveal delay={100}>
            <figure className="relative mx-auto w-full max-w-lg rounded-[1.75rem] border border-border-soft bg-lavender-light/60 p-4 sm:p-6">
              <GreeceMapIllustration />
              <figcaption className="sr-only">
                Ενδεικτικές περιοχές εξυπηρέτησης: Αθήνα, Θεσσαλονίκη, Πάτρα, Λάρισα,
                Ηράκλειο, Χανιά, Καλαμάτα, Ιωάννινα, Ρόδος, Βόλος. Δεν πρόκειται για
                φυσικά γραφεία ή τοποθεσίες πελατών.
              </figcaption>
              <p className="mt-2 text-center text-xs text-muted" aria-hidden="true">
                Ενδεικτικές περιοχές εξυπηρέτησης
              </p>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-center gap-6 text-center">
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
