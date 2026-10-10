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
    "h-11 w-full rounded-xl border border-white/15 bg-white/8 px-3 text-sm text-warm-ivory outline-none transition placeholder:text-lavender/40 focus:border-muted-amber/50 focus:ring-2 focus:ring-muted-amber/20";

  return (
    <section
      id="contact"
      className="surface-deep section-texture relative overflow-hidden py-12 sm:py-14 lg:py-16"
      aria-labelledby="contact-heading"
    >
      {/* Connected-line graphics */}
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
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-amber">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-2xl font-extrabold tracking-tight text-warm-ivory sm:text-3xl"
          >
            Ας δημιουργήσουμε κάτι που λειτουργεί για την επιχείρησή σου.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-lavender/70">
            Έχεις μια ιδέα, μια επιχείρηση που χρειάζεται καλύτερη ψηφιακή παρουσία ή ένα project
            που θέλεις να μετατρέψουμε σε πραγματικότητα; Επικοινώνησε μαζί μου.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-4">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-4 rounded-[1.25rem] border border-white/12 bg-white/6 p-5 transition hover:border-muted-amber/35 hover:bg-white/10 focus-ring"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender/15 text-lavender">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-amber">
                    Τηλέφωνο
                  </p>
                  <p className="mt-1 font-bold text-warm-ivory">{formatPhoneDisplay(phone)}</p>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 rounded-[1.25rem] border border-white/12 bg-white/6 p-5 transition hover:border-muted-amber/35 hover:bg-white/10 focus-ring"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender/15 text-lavender">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-amber">
                    Email
                  </p>
                  <p className="mt-1 font-bold text-warm-ivory">{email}</p>
                </div>
              </a>

              <div className="rounded-[1.25rem] border border-white/12 bg-white/6 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender/15 text-lavender">
                    <Clock3 className="h-5 w-5" />
                  </span>
                  <p className="font-bold text-warm-ivory">Ώρες Επικοινωνίας</p>
                </div>
                <ul className="space-y-2">
                  {businessHours.map((item) => (
                    <li
                      key={item.day}
                      className="flex items-start justify-between gap-3 border-b border-white/10 py-2 text-sm last:border-0"
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
              className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-6"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-sm font-semibold text-lavender">Όνομα</span>
                  <input name="name" required autoComplete="name" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-lavender">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-lavender">Τηλέφωνο</span>
                  <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-lavender">Υπηρεσία</span>
                  <select name="service" className={inputClass} defaultValue="">
                    <option value="" className="bg-purple-deep text-warm-ivory">
                      Επίλεξε υπηρεσία
                    </option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title} className="bg-purple-deep text-warm-ivory">
                        {s.title}
                      </option>
                    ))}
                    <option value="Custom" className="bg-purple-deep text-warm-ivory">
                      Custom Project
                    </option>
                  </select>
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-semibold text-lavender">Μήνυμα</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-warm-ivory outline-none transition focus:border-muted-amber/50 focus:ring-2 focus:ring-muted-amber/20"
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
                <label className="flex items-start gap-3 text-sm leading-relaxed text-lavender/80">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 text-purple-primary focus:ring-muted-amber/30"
                  />
                  <span>
                    Έχω διαβάσει και αποδέχομαι την{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-muted-amber underline underline-offset-2 hover:text-lavender"
                    >
                      Πολιτική Απορρήτου
                    </a>
                    .
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-lavender/80">
                  <input
                    type="checkbox"
                    name="marketingOptIn"
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 text-purple-primary focus:ring-muted-amber/30"
                  />
                  <span>
                    Επιθυμώ να λαμβάνω ενημερώσεις και προσφορές από το NEXUS DEV STUDIO.
                    (προαιρετικό)
                  </span>
                </label>
              </div>

              {status === "success" && (
                <p
                  className="mt-4 flex items-center gap-2 rounded-xl bg-green-500/15 px-3 py-2 text-sm text-green-300"
                  role="status"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Το μήνυμά σου στάλθηκε επιτυχώς. Θα επικοινωνήσω σύντομα μαζί σου.
                </p>
              )}
              {status === "error" && (
                <p
                  className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/15 px-3 py-2 text-sm text-red-300"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="cta-glow mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring disabled:opacity-60"
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
