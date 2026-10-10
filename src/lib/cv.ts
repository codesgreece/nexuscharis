/** CV upload validation — client and server share the same rules. */

export const CV_MAX_BYTES = 10 * 1024 * 1024; // 10MB

export const CV_ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

export const CV_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const BLOCKED_EXTENSIONS = new Set([
  ".exe",
  ".js",
  ".mjs",
  ".cjs",
  ".sh",
  ".bat",
  ".cmd",
  ".com",
  ".msi",
  ".dll",
  ".ps1",
  ".vbs",
  ".jar",
  ".php",
  ".py",
  ".rb",
  ".pl",
  ".html",
  ".htm",
  ".svg",
  ".scr",
]);

export type CvValidationResult =
  | { ok: true; extension: (typeof CV_ALLOWED_EXTENSIONS)[number]; contentType: string }
  | { ok: false; error: string };

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  if (idx < 0) return "";
  return filename.slice(idx).toLowerCase();
}

function looksLikePdf(buffer: Uint8Array): boolean {
  if (buffer.length < 4) return false;
  return (
    buffer[0] === 0x25 && // %
    buffer[1] === 0x50 && // P
    buffer[2] === 0x44 && // D
    buffer[3] === 0x46 // F
  );
}

function looksLikeOleDoc(buffer: Uint8Array): boolean {
  // Legacy .doc — OLE Compound File
  return (
    buffer.length >= 4 &&
    buffer[0] === 0xd0 &&
    buffer[1] === 0xcf &&
    buffer[2] === 0x11 &&
    buffer[3] === 0xe0
  );
}

function looksLikeDocx(buffer: Uint8Array): boolean {
  // ZIP / OOXML
  return buffer.length >= 2 && buffer[0] === 0x50 && buffer[1] === 0x4b;
}

export function validateCvFileMeta(input: {
  filename: string;
  size: number;
  mimeType?: string | null;
}): CvValidationResult {
  const filename = input.filename?.trim() || "";
  if (!filename) {
    return { ok: false, error: "Το βιογραφικό είναι υποχρεωτικό." };
  }

  const extension = getExtension(filename);
  if (BLOCKED_EXTENSIONS.has(extension)) {
    return {
      ok: false,
      error: "Το αρχείο πρέπει να είναι PDF, DOC ή DOCX και έως 10MB.",
    };
  }

  if (!(CV_ALLOWED_EXTENSIONS as readonly string[]).includes(extension)) {
    return {
      ok: false,
      error: "Το αρχείο πρέπει να είναι PDF, DOC ή DOCX και έως 10MB.",
    };
  }

  if (!Number.isFinite(input.size) || input.size <= 0) {
    return { ok: false, error: "Το βιογραφικό είναι υποχρεωτικό." };
  }

  if (input.size > CV_MAX_BYTES) {
    return {
      ok: false,
      error: "Το αρχείο πρέπει να είναι PDF, DOC ή DOCX και έως 10MB.",
    };
  }

  const mime = (input.mimeType || "").toLowerCase().trim();
  if (
    mime &&
    mime !== "application/octet-stream" &&
    !(CV_ALLOWED_MIME_TYPES as readonly string[]).includes(mime)
  ) {
    return {
      ok: false,
      error: "Το αρχείο πρέπει να είναι PDF, DOC ή DOCX και έως 10MB.",
    };
  }

  const contentType =
    mime && (CV_ALLOWED_MIME_TYPES as readonly string[]).includes(mime)
      ? mime
      : extension === ".pdf"
        ? "application/pdf"
        : extension === ".doc"
          ? "application/msword"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  return {
    ok: true,
    extension: extension as (typeof CV_ALLOWED_EXTENSIONS)[number],
    contentType,
  };
}

/** Server-side content sniffing after meta checks. */
export function validateCvBuffer(
  buffer: Uint8Array,
  extension: (typeof CV_ALLOWED_EXTENSIONS)[number],
): CvValidationResult {
  if (extension === ".pdf" && !looksLikePdf(buffer)) {
    return {
      ok: false,
      error: "Το αρχείο πρέπει να είναι PDF, DOC ή DOCX και έως 10MB.",
    };
  }
  if (extension === ".doc" && !looksLikeOleDoc(buffer)) {
    return {
      ok: false,
      error: "Το αρχείο πρέπει να είναι PDF, DOC ή DOCX και έως 10MB.",
    };
  }
  if (extension === ".docx" && !looksLikeDocx(buffer)) {
    return {
      ok: false,
      error: "Το αρχείο πρέπει να είναι PDF, DOC ή DOCX και έως 10MB.",
    };
  }

  const contentType =
    extension === ".pdf"
      ? "application/pdf"
      : extension === ".doc"
        ? "application/msword"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  return { ok: true, extension, contentType };
}

export function sanitizeCvFilename(filename: string): string {
  const base = filename.replace(/[/\\?%*:|"<>]/g, "_").trim() || "cv.pdf";
  const extension = getExtension(base);
  const stem = base.slice(0, base.length - extension.length).slice(0, 80) || "cv";
  const safeExt = (CV_ALLOWED_EXTENSIONS as readonly string[]).includes(extension)
    ? extension
    : ".pdf";
  return `${stem}${safeExt}`;
}
