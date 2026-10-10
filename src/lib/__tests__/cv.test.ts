import { describe, expect, it } from "vitest";
import { sanitizeCvFilename, validateCvBuffer, validateCvFileMeta } from "../cv";

describe("validateCvFileMeta", () => {
  it("accepts pdf under 10MB", () => {
    const result = validateCvFileMeta({
      filename: "resume.pdf",
      size: 1024,
      mimeType: "application/pdf",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects oversized files", () => {
    const result = validateCvFileMeta({
      filename: "resume.pdf",
      size: 11 * 1024 * 1024,
      mimeType: "application/pdf",
    });
    expect(result.ok).toBe(false);
  });

  it("rejects executables", () => {
    const result = validateCvFileMeta({
      filename: "malware.exe",
      size: 1024,
      mimeType: "application/octet-stream",
    });
    expect(result.ok).toBe(false);
  });
});

describe("validateCvBuffer", () => {
  it("accepts PDF magic bytes", () => {
    const buf = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31]);
    expect(validateCvBuffer(buf, ".pdf").ok).toBe(true);
  });

  it("rejects fake pdf extension", () => {
    const buf = new Uint8Array([0x00, 0x01, 0x02, 0x03]);
    expect(validateCvBuffer(buf, ".pdf").ok).toBe(false);
  });
});

describe("sanitizeCvFilename", () => {
  it("strips unsafe characters", () => {
    expect(sanitizeCvFilename("../../evil.pdf")).toBe(".._.._evil.pdf");
  });
});
