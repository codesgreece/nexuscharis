"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Clock3, Loader2, Mail, Phone, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { formatPhoneDisplay } from "@/lib/utils";

type Hours = { day: string; hours: string };

export function ContactSection({
  phone,
  email,
  businessHours,
  services,
}: {
  phone: string;
  email: string;
  businessHours: Hours[];
  services: { title: string }[];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          message: data.get("message"),
          website: data.get("website"),
          privacyAccepted: data.get("privacyAccepted") === "on",
          marketingOptIn: data.get("marketingOptIn") === "on",
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Κάτι πήγε στραβά. Δοκίμασε ξανά.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Αδυναμία σύνδεσης. Έλεγξε τη σύνδεσή σου και δοκίμασε ξανά.");
    }
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-soft-border bg-warm-ivory px-3 text-sm text-warm-charcoal outline-none transition placeholder:text-muted/60 focus:border-purple-primary/45 focus:ring-2 focus:ring-purple-primary/15";

  return (
    <section
      id="contact"
      className="surface-deep section-texture relative overflow-hidden py-14 sm:py-16 lg:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-muted-amber/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-purple-electric/20 blur-3xl" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        aria-hidden
      >
        <defs>
          <linearGradient id="contactLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0" />
            <stop offset="50%" stopColor="#D99A55" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EDE4FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 120 C200 80, 400 160, 700 100 S1100 40, 1400 90"
          fill="none"
          stroke="url(#contactLine)"
          strokeWidth="1"
          strokeDasharray="4 14"
        />
        <path
          d="M0 280 C250 240, 500 320, 800 260 S1200 200, 1600 250"
          fill="none"
          stroke="url(#contactLine)"
          strokeWidth="1"
          strokeDasharray="4 18"
          opacity="0.6"
        />
      </svg>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-amber">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-warm-ivory sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
            >
              Έχεις μια ιδέα;
              <br />
              Ας τη φτιάξουμε.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-lavender/70">
              Έχεις μια επιχείρηση που χρειάζεται καλύτερη ψηφιακή παρουσία ή ένα project
              που θέλεις να μετατρέψουμε σε πραγματικότητα; Επικοινώνησε μαζί μου.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`tel:${phone}`}
                className="flex min-h-11 items-center gap-4 rounded-2xl border border-white/12 bg-white/6 p-4 transition hover:border-muted-amber/35 hover:bg-white/10 focus-ring"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lavender/15 text-lavender">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-amber">
                    Τηλέφωνο
                  </p>
                  <p className="mt-0.5 font-bold text-warm-ivory">{formatPhoneDisplay(phone)}</p>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex min-h-11 items-center gap-4 rounded-2xl border border-white/12 bg-white/6 p-4 transition hover:border-muted-amber/35 hover:bg-white/10 focus-ring"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lavender/15 text-lavender">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-amber">
                    Email
                  </p>
                  <p className="mt-0.5 font-bold text-warm-ivory">{email}</p>
                </div>
              </a>

              <div className="rounded-2xl border border-white/12 bg-white/6 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lavender/15 text-lavender">
                    <Clock3 className="h-5 w-5" />
                  </span>
                  <p className="font-bold text-warm-ivory">Ώρες Επικοινωνίας</p>
                </div>
                <ul className="space-y-1.5">
                  {businessHours.map((item) => (
                    <li
                      key={item.day}
                      className="flex items-start justify-between gap-3 border-b border-white/10 py-1.5 text-sm last:border-0"
                    >
                      <span className="font-medium text-lavender">{item.day}</span>
                      <span className="text-right text-lavender/60">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={onSubmit}
              className="rounded-[1.5rem] border border-white/20 bg-warm-ivory/95 p-5 shadow-[0_28px_64px_-36px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-7"
              noValidate
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-primary">
                Ζήτησε προσφορά
              </p>
              <p className="mt-1 text-sm text-muted">
                Συμπλήρωσε τη φόρμα και θα επικοινωνήσω σύντομα μαζί σου.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">Όνομα</span>
                  <input name="name" required autoComplete="name" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">Τηλέφωνο</span>
                  <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">Υπηρεσία</span>
                  <select name="service" className={inputClass} defaultValue="">
                    <option value="">Επίλεξε υπηρεσία</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Custom">Custom Project</option>
                  </select>
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">Μήνυμα</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-xl border border-soft-border bg-warm-ivory px-3 py-2.5 text-sm text-warm-charcoal outline-none transition focus:border-purple-primary/45 focus:ring-2 focus:ring-purple-primary/15"
                />
              </label>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="mt-5 space-y-3">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-soft-border text-purple-primary focus:ring-purple-primary/30"
                  />
                  <span>
                    Έχω διαβάσει και αποδέχομαι την{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-purple-deep underline underline-offset-2 hover:text-purple-primary"
                    >
                      Πολιτική Απορρήτου
                    </a>
                    .
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <input
                    type="checkbox"
                    name="marketingOptIn"
                    className="mt-1 h-4 w-4 shrink-0 rounded border-soft-border text-purple-primary focus:ring-purple-primary/30"
                  />
                  <span>
                    Επιθυμώ να λαμβάνω ενημερώσεις και προσφορές από το NEXUS DEV STUDIO.
                    (προαιρετικό)
                  </span>
                </label>
              </div>

              {status === "success" && (
                <p
                  className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700"
                  role="status"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Το μήνυμά σου στάλθηκε επιτυχώς. Θα επικοινωνήσω σύντομα μαζί σου.
                </p>
              )}
              {status === "error" && (
                <p
                  className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="cta-glow mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Αποστολή...
                  </>
                ) : (
                  "Αποστολή Μηνύματος"
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
