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

  return (
    <section id="contact" className="bg-white py-20 sm:py-24" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl"
          >
            Ας δημιουργήσουμε κάτι μαζί.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Έχεις μια ιδέα, μια επιχείρηση που χρειάζεται καλύτερη ψηφιακή παρουσία ή ένα project
            που θέλεις να μετατρέψουμε σε πραγματικότητα; Επικοινώνησε μαζί μου.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-4">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-4 rounded-[1.25rem] border border-border-soft bg-lavender-light p-5 transition hover:border-purple-primary/30 focus-ring"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-primary shadow-sm">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-primary">
                    Τηλέφωνο
                  </p>
                  <p className="mt-1 font-bold text-[#171717]">{formatPhoneDisplay(phone)}</p>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 rounded-[1.25rem] border border-border-soft bg-lavender-light p-5 transition hover:border-purple-primary/30 focus-ring"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-primary shadow-sm">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-primary">
                    Email
                  </p>
                  <p className="mt-1 font-bold text-[#171717]">{email}</p>
                </div>
              </a>

              <div className="rounded-[1.25rem] border border-border-soft bg-lavender-light p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-purple-primary shadow-sm">
                    <Clock3 className="h-5 w-5" />
                  </span>
                  <p className="font-bold text-[#171717]">Ώρες Επικοινωνίας</p>
                </div>
                <ul className="space-y-2">
                  {businessHours.map((item) => (
                    <li
                      key={item.day}
                      className="flex items-start justify-between gap-3 border-b border-border-soft/70 py-2 text-sm last:border-0"
                    >
                      <span className="font-medium text-[#171717]">{item.day}</span>
                      <span className="text-right text-muted">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={onSubmit}
              className="rounded-[1.5rem] border border-border-soft bg-white p-6 shadow-[0_24px_60px_-36px_rgba(76,29,149,0.35)] sm:p-8"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-sm font-semibold text-[#171717]">Όνομα</span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="h-11 w-full rounded-xl border border-border-soft bg-lavender-light/40 px-3 text-sm outline-none transition focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-[#171717]">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="h-11 w-full rounded-xl border border-border-soft bg-lavender-light/40 px-3 text-sm outline-none transition focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-[#171717]">Τηλέφωνο</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="h-11 w-full rounded-xl border border-border-soft bg-lavender-light/40 px-3 text-sm outline-none transition focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-[#171717]">Υπηρεσία</span>
                  <select
                    name="service"
                    className="h-11 w-full rounded-xl border border-border-soft bg-lavender-light/40 px-3 text-sm outline-none transition focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20"
                    defaultValue=""
                  >
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
                <span className="mb-1.5 block text-sm font-semibold text-[#171717]">Μήνυμα</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-xl border border-border-soft bg-lavender-light/40 px-3 py-2.5 text-sm outline-none transition focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20"
                />
              </label>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="mt-5 space-y-3">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-[#333]">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-border-soft text-purple-primary focus:ring-purple-primary/30"
                  />
                  <span>
                    Έχω διαβάσει και αποδέχομαι την{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-purple-primary underline underline-offset-2 hover:text-purple-bright"
                    >
                      Πολιτική Απορρήτου
                    </a>
                    .
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-[#333]">
                  <input
                    type="checkbox"
                    name="marketingOptIn"
                    className="mt-1 h-4 w-4 shrink-0 rounded border-border-soft text-purple-primary focus:ring-purple-primary/30"
                  />
                  <span>
                    Επιθυμώ να λαμβάνω ενημερώσεις και προσφορές από το NEXUS DEV STUDIO.
                    (προαιρετικό)
                  </span>
                </label>
              </div>

              {status === "success" && (
                <p className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700" role="status">
                  <CheckCircle2 className="h-4 w-4" />
                  Το μήνυμά σου στάλθηκε επιτυχώς. Θα επικοινωνήσω σύντομα μαζί σου.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-purple-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-bright focus-ring disabled:opacity-60"
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
