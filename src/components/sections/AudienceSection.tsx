import {
  Briefcase,
  Rocket,
  ShoppingBag,
  Store,
  User,
  UserRound,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const audiences = [
  {
    title: "Μικρές Επιχειρήσεις",
    description:
      "Δημιουργούμε επαγγελματικές ιστοσελίδες που βοηθούν μια μικρή επιχείρηση να αποκτήσει σύγχρονη και αξιόπιστη παρουσία στο διαδίκτυο.",
    icon: Store,
  },
  {
    title: "Ελεύθεροι Επαγγελματίες",
    description:
      "Personal websites, portfolios και landing pages που παρουσιάζουν σωστά τις υπηρεσίες και την προσωπική επαγγελματική ταυτότητα.",
    icon: User,
  },
  {
    title: "Καταστήματα & E-Commerce",
    description:
      "Σύγχρονα e-shops σχεδιασμένα για εύκολη πλοήγηση, προϊόντα, παραγγελίες και μια καλύτερη εμπειρία αγοράς.",
    icon: ShoppingBag,
  },
  {
    title: "Επιχειρήσεις Υπηρεσιών",
    description:
      "Ιστοσελίδες που παρουσιάζουν ξεκάθαρα τις υπηρεσίες μιας επιχείρησης και κάνουν την επικοινωνία με τον πελάτη πιο εύκολη.",
    icon: Briefcase,
  },
  {
    title: "Startups & Νέα Projects",
    description:
      "Από την αρχική ιδέα μέχρι ένα ολοκληρωμένο digital product, δημιουργούμε custom λύσεις σύμφωνα με τις ανάγκες κάθε project.",
    icon: Rocket,
  },
  {
    title: "Προσωπικά Brands",
    description:
      "Portfolio websites και προσωπικές ψηφιακές παρουσίες που δημιουργούν μια ξεχωριστή και επαγγελματική εικόνα.",
    icon: UserRound,
  },
] as const;

export function AudienceSection() {
  return (
    <section
      id="audience"
      className="bg-lavender-light py-12 sm:py-14 lg:py-16"
      aria-labelledby="audience-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-primary">
            Audience
          </p>
          <h2
            id="audience-heading"
            className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl"
          >
            Για ποιους δουλεύουμε
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Ψηφιακές λύσεις σχεδιασμένες για επιχειρήσεις και επαγγελματίες σε όλη την
            Ελλάδα.
          </p>
        </Reveal>

        <ul className="mt-8 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Reveal delay={i * 60}>
                  <article className="group h-full rounded-[1.35rem] border border-border-soft bg-white p-6 shadow-[0_14px_36px_-28px_rgba(76,29,149,0.28)] transition duration-300 hover:-translate-y-1 hover:border-purple-primary/25 hover:shadow-[0_22px_50px_-28px_rgba(76,29,149,0.4)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-soft text-purple-primary transition duration-300 group-hover:bg-purple-primary group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-[#171717]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
