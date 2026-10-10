"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { CvUpload } from "@/components/careers/CvUpload";
import { validateCvFileMeta } from "@/lib/cv";
import type { Job } from "@/content/jobs";

export function ApplicationForm({ job }: { job: Job }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [cvError, setCvError] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setCvError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    if (!cvFile) {
      setCvError("Το βιογραφικό είναι υποχρεωτικό.");
      return;
    }

    const cvCheck = validateCvFileMeta({
      filename: cvFile.name,
      size: cvFile.size,
      mimeType: cvFile.type,
    });
    if (!cvCheck.ok) {
      setCvError(cvCheck.error);
      return;
    }

    if (data.get("privacyAccepted") !== "on") {
      setError("Πρέπει να συμφωνήσεις με την επεξεργασία των προσωπικών σου δεδομένων.");
      return;
    }

    data.set("cv", cvFile);
    data.set("jobSlug", job.slug);
    data.set("jobTitle", job.title);
    data.set("privacyAccepted", "true");

    setStatus("loading");

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: data,
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        field?: string;
        ok?: boolean;
      };

      if (!res.ok) {
        setStatus("error");
        if (json.field === "cv") {
          setCvError(json.error || "Το αρχείο πρέπει να είναι PDF, DOC ή DOCX και έως 10MB.");
          setError("");
        } else {
          setError(
            json.error ||
              "Δεν ήταν δυνατή η αποστολή της αίτησης. Έλεγξε τα στοιχεία σου και προσπάθησε ξανά.",
          );
        }
        return;
      }

      setStatus("success");
      form.reset();
      setCvFile(null);
    } catch {
      setStatus("error");
      setError(
        "Δεν ήταν δυνατή η αποστολή της αίτησης. Έλεγξε τα στοιχεία σου και προσπάθησε ξανά.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[1.5rem] border border-purple-primary/20 bg-gradient-to-br from-warm-ivory to-lavender/40 p-6 text-center shadow-[0_20px_48px_-32px_rgba(109,40,217,0.35)] sm:p-8"
        role="status"
      >
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-lavender text-purple-deep">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="mt-4 text-xl font-extrabold text-warm-charcoal">
          Η αίτησή σου υποβλήθηκε.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          Σε ευχαριστούμε για το ενδιαφέρον σου για τη NEXUS DEV STUDIO.
        </p>
        <Link
          href="/careers"
          className="cta-glow mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring"
        >
          Επιστροφή στις θέσεις εργασίας
        </Link>
      </div>
    );
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-soft-border bg-warm-ivory px-3 text-sm text-warm-charcoal outline-none transition placeholder:text-muted/60 focus:border-purple-primary/45 focus:ring-2 focus:ring-purple-primary/15";

  return (
    <form
      id="apply"
      onSubmit={onSubmit}
      className="rounded-[1.5rem] border border-soft-border bg-warm-ivory/95 p-5 shadow-[0_20px_48px_-32px_rgba(65,42,66,0.2)] sm:p-7"
      noValidate
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-primary">
        Αίτηση
      </p>
      <h3 className="mt-2 text-xl font-extrabold text-warm-charcoal">Κάνε Αίτηση</h3>
      <p className="mt-1 text-sm text-muted">
        Θέση: <span className="font-semibold text-warm-charcoal">{job.title}</span>
      </p>

      <input type="hidden" name="jobSlug" value={job.slug} />
      <input type="hidden" name="jobTitle" value={job.title} />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">
            Ονοματεπώνυμο <span className="text-purple-primary">*</span>
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            disabled={status === "loading"}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">
            Email <span className="text-purple-primary">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            disabled={status === "loading"}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">
            Τηλέφωνο <span className="text-purple-primary">*</span>
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
            disabled={status === "loading"}
          />
        </label>
      </div>

      <div className="mt-4">
        <CvUpload
          error={cvError}
          onFileChange={(file) => {
            setCvFile(file);
            if (file) setCvError("");
          }}
        />
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-semibold text-warm-charcoal">
          Συνοδευτικό Μήνυμα <span className="font-normal text-muted">(προαιρετικό)</span>
        </span>
        <textarea
          name="message"
          rows={5}
          className="w-full resize-y rounded-xl border border-soft-border bg-warm-ivory px-3 py-2.5 text-sm text-warm-charcoal outline-none transition focus:border-purple-primary/45 focus:ring-2 focus:ring-purple-primary/15"
          disabled={status === "loading"}
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

      <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="privacyAccepted"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-soft-border text-purple-primary focus:ring-purple-primary/30"
          disabled={status === "loading"}
        />
        <span>
          Συμφωνώ με την επεξεργασία των προσωπικών μου δεδομένων για τους σκοπούς αξιολόγησης
          της αίτησής μου.{" "}
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

      {error ? (
        <p
          className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="cta-glow mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-purple-primary to-purple-bright px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-ring disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Αποστολή αίτησης...
          </>
        ) : (
          "Υποβολή Αίτησης"
        )}
      </button>
    </form>
  );
}
