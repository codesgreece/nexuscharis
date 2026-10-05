import { Reveal } from "@/components/ui/Reveal";

const serviceLinks = [
  { href: "#website-development", label: "Website Development" },
  { href: "#landing-pages", label: "Landing Pages" },
  { href: "#ecommerce", label: "E-commerce" },
  { href: "#android-apps", label: "Android Apps" },
  { href: "#windows-apps", label: "Windows Apps" },
  { href: "#admin-panels", label: "Admin Panels" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function CoverageSection() {
  return (
    <section
      id="greece"
      className="bg-white py-20 sm:py-24"
      aria-labelledby="coverage-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Σε όλη την Ελλάδα
          </p>
          <h2
            id="coverage-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
          >
            Digital solutions για επιχειρήσεις και επαγγελματίες σε όλη την Ελλάδα
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Το NEXUS DEV STUDIO GREECE δημιουργεί κατασκευή ιστοσελίδων, web design, web
              development, landing pages, e-shops και custom digital solutions για πελάτες σε
              ολόκληρη την Ελλάδα — όχι μόνο σε μία πόλη.
            </p>
            <p>
              Συνεργαζόμαστε σχετικά με freelancers, μικρές και μεσαίες επιχειρήσεις, καταστήματα,
              υπηρεσίες και επαγγελματίες που χρειάζονται μια σύγχρονη ψηφιακή παρουσία: από
              επαγγελματική ιστοσελίδα και κατασκευή e-shop μέχρι εφαρμογές Android, Windows apps
              και admin panels.
            </p>
            <p>
              Η διαδικασία είναι απλή: συζητάμε τον στόχο σου, σχεδιάζουμε τη λύση, την
              αναπτύσσουμε με σύγχρονη τεχνολογία και την παραδίδουμε έτοιμη για χρήση. Αν θες
              custom λύση αντί για έτοιμο template,{" "}
              <a
                href="#contact"
                className="font-semibold text-purple-deep underline-offset-2 hover:underline"
              >
                επικοινώνησε με το NEXUS DEV STUDIO
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <nav
            aria-label="Υπηρεσίες και ενότητες"
            className="mt-10 flex flex-wrap gap-2"
          >
            {serviceLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl border border-border-soft bg-lavender-light px-3.5 py-2 text-sm font-semibold text-purple-deep transition hover:border-purple-primary/30 hover:bg-lavender-soft focus-ring"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
