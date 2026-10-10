"use client";

import { useId, useRef, useState } from "react";
import { CheckCircle2, FileText, Trash2, Upload } from "lucide-react";
import { CV_ALLOWED_EXTENSIONS, CV_MAX_BYTES, validateCvFileMeta } from "@/lib/cv";
import { cn } from "@/lib/utils";

export function CvUpload({
  name = "cv",
  error,
  onFileChange,
}: {
  name?: string;
  error?: string;
  onFileChange?: (file: File | null) => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState("");
  const [dragging, setDragging] = useState(false);

  const showError = error || localError;

  function applyFile(next: File | null) {
    if (!next) {
      setFile(null);
      setLocalError("");
      onFileChange?.(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const result = validateCvFileMeta({
      filename: next.name,
      size: next.size,
      mimeType: next.type,
    });

    if (!result.ok) {
      setFile(null);
      setLocalError(result.error);
      onFileChange?.(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setFile(next);
    setLocalError("");
    onFileChange?.(next);
  }

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-warm-charcoal">
        Βιογραφικό (CV) <span className="text-purple-primary">*</span>
      </label>

      <div
        className={cn(
          "relative rounded-2xl border-2 border-dashed px-4 py-6 text-center transition",
          dragging
            ? "border-purple-primary bg-lavender/50"
            : "border-soft-border bg-soft-cream/40 hover:border-purple-primary/35 hover:bg-lavender/30",
          showError && "border-red-300 bg-red-50/40",
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const dropped = e.dataTransfer.files?.[0] || null;
          applyFile(dropped);
          if (dropped && inputRef.current) {
            const dt = new DataTransfer();
            dt.items.add(dropped);
            inputRef.current.files = dt.files;
          }
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="file"
          accept={CV_ALLOWED_EXTENSIONS.join(",")}
          required
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-invalid={Boolean(showError)}
          aria-describedby={showError ? `${inputId}-error` : `${inputId}-hint`}
          onChange={(e) => applyFile(e.target.files?.[0] || null)}
        />

        {file ? (
          <div className="relative z-[1] flex flex-col items-center gap-2 pointer-events-none">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lavender text-purple-deep">
              <FileText className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-sm font-semibold text-warm-charcoal break-all px-2">{file.name}</p>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-deep">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Έτοιμο για αποστολή
            </p>
            <p className="text-[11px] text-muted">
              {(file.size / (1024 * 1024)).toFixed(2)} MB · πάτησε για αντικατάσταση
            </p>
          </div>
        ) : (
          <div className="pointer-events-none flex flex-col items-center gap-2">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lavender text-purple-primary">
              <Upload className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-sm font-bold text-warm-charcoal">Upload your CV</p>
            <p className="text-sm text-muted">
              Σύρε το αρχείο εδώ ή πάτησε για επιλογή
            </p>
            <p id={`${inputId}-hint`} className="text-[11px] text-muted/80">
              PDF, DOC, DOCX · Μέγιστο μέγεθος: {Math.round(CV_MAX_BYTES / (1024 * 1024))}MB
            </p>
          </div>
        )}
      </div>

      {file ? (
        <button
          type="button"
          className="mt-2 inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-muted transition hover:text-purple-deep focus-ring"
          onClick={() => applyFile(null)}
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          Αφαίρεση αρχείου
        </button>
      ) : null}

      {showError ? (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {showError}
        </p>
      ) : null}
    </div>
  );
}
