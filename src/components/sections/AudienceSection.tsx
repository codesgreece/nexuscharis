import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AutumnAccent } from "@/components/effects/AutumnAccent";
import {
  audienceIllustrations,
} from "@/components/sections/AudienceIllustrations";
import cardStyles from "@/components/sections/AudienceSection.module.css";
import networkStyles from "@/components/sections/AudienceNetwork.module.css";

const audiences = [
  {
    title: "Μικρές Επιχειρήσεις",
    description:
      "Δημιουργούμε επαγγελματικές ιστοσελίδες που βοηθούν μια μικρή επιχείρηση να αποκτήσει σύγχρονη και αξιόπιστη παρουσία στο διαδίκτυο.",
  },
  {
    title: "Ελεύθεροι Επαγγελματίες",
    description:
      "Personal websites, portfolios και landing pages που παρουσιάζουν σωστά τις υπηρεσίες και την προσωπική επαγγελματική ταυτότητα.",
  },
  {
    title: "Καταστήματα & E-Commerce",
    description:
      "Σύγχρονα e-shops σχεδιασμένα για εύκολη πλοήγηση, προϊόντα, παραγγελίες και μια καλύτερη εμπειρία αγοράς.",
  },
  {
    title: "Επιχειρήσεις Υπηρεσιών",
    description:
      "Ιστοσελίδες που παρουσιάζουν ξεκάθαρα τις υπηρεσίες μιας επιχείρησης και κάνουν την επικοινωνία με τον πελάτη πιο εύκολη.",
  },
  {
    title: "Startups & Νέα Projects",
    description:
      "Από την αρχική ιδέα μέχρι ένα ολοκληρωμένο digital product, δημιουργούμε custom λύσεις σύμφωνα με τις ανάγκες κάθε project.",
  },
  {
    title: "Προσωπικά Brands",
    description:
      "Portfolio websites και προσωπικές ψηφιακές παρουσίες που δημιουργούν μια ξεχωριστή και επαγγελματική εικόνα.",
  },
] as const;

function AudienceNetworkDecor() {
  return (
    <div className={networkStyles.decor} aria-hidden="true">
      <svg className={networkStyles.svg} viewBox="0 0 320 320" role="presentation">
        <defs>
          <radialGradient id="audienceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#6d28d9" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#d99a55" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle className={networkStyles.glow} cx="160" cy="160" r="112" />
        <circle className={`${networkStyles.orbit} ${networkStyles.orbitSoft}`} cx="160" cy="160" r="118" />
        <circle className={networkStyles.orbit} cx="160" cy="160" r="86" />

        <path
          className={networkStyles.line}
          d="M160 54 L236 98 L236 222 L160 266 L84 222 L84 98 Z"
        />
        <path
          className={networkStyles.pulse}
          d="M160 54 L236 98 L236 222 L160 266 L84 222 L84 98 Z"
        />

        <g>
          <circle className={networkStyles.node} cx="160" cy="54" r="4" />
          <circle className={networkStyles.node} cx="236" cy="98" r="3.5" />
          <circle className={networkStyles.node} cx="236" cy="222" r="4" />
          <circle className={networkStyles.node} cx="160" cy="266" r="3.5" />
          <circle className={networkStyles.node} cx="84" cy="222" r="4" />
          <circle className={networkStyles.node} cx="84" cy="98" r="3.5" />
        </g>

        <text className={networkStyles.core} x="160" y="176" textAnchor="middle">
          N
        </text>
      </svg>
    </div>
  );
}

export function AudienceSection() {
  return (
    <section
      id="audience"
      className="surface-ivory section-texture relative overflow-hidden py-14 sm:py-16 lg:py-20"
      aria-labelledby="audience-heading"
    >
      <AudienceNetworkDecor />
      <AutumnAccent variant="audience" />

      <div className="relative z-[1] mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Audience</p>
          <h2
            id="audience-heading"
            className="section-title mt-2.5"
          >
            Για ποιους δουλεύουμε
          </h2>
          <p className="section-lead">
            Ψηφιακές λύσεις σχεδιασμένες για επιχειρήσεις και επαγγελματίες σε όλη την
            Ελλάδα.
          </p>
        </Reveal>

        <ul className={`${cardStyles.grid} mt-7 sm:mt-8`}>
          {audiences.map((item, i) => {
            const Illust =
              audienceIllustrations[item.title as keyof typeof audienceIllustrations];
            return (
              <li key={item.title}>
                <Reveal delay={i * 60}>
                  <article className={cardStyles.card}>
                    <span className={cardStyles.arrow} aria-hidden="true">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>

                    <div className={cardStyles.iconWrap}>
                      {Illust ? (
                        <Illust className="h-10 w-[3.25rem]" />
                      ) : null}
                    </div>

                    <h3 className="mt-4 pr-8 text-[1.05rem] font-bold leading-snug text-warm-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
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
