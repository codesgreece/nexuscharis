import { describe, it, expect } from "vitest";
import { contactSchema, packageSchema } from "../validations";
import { isSafeExternalUrl, cn } from "../utils";
import { parseConsent, CONSENT_VERSION } from "../consent";

describe("contactSchema", () => {
  it("accepts valid contact payload with privacy acceptance", () => {
    const result = contactSchema.safeParse({
      name: "Χαράλαμπος",
      email: "test@example.com",
      phone: "6936732844",
      service: "Landing Pages",
      message: "Θέλω προσφορά για νέο website.",
      website: "",
      privacyAccepted: true,
      marketingOptIn: false,
    });
    expect(result.success).toBe(true);
  });

  it("rejects when privacy is not accepted", () => {
    const result = contactSchema.safeParse({
      name: "Χαράλαμπος",
      email: "test@example.com",
      message: "Θέλω προσφορά για νέο website.",
      privacyAccepted: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects short messages", () => {
    const result = contactSchema.safeParse({
      name: "Test",
      email: "test@example.com",
      message: "short",
      privacyAccepted: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("packageSchema", () => {
  it("requires features", () => {
    const result = packageSchema.safeParse({
      title: "Starter",
      description: "Desc",
      price: "€500",
      features: [],
      ctaText: "CTA",
      ctaUrl: "#contact",
      highlighted: false,
      active: true,
      order: 1,
    });
    expect(result.success).toBe(false);
  });
});

describe("utils", () => {
  it("validates external urls", () => {
    expect(isSafeExternalUrl("https://example.com")).toBe(true);
    expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeExternalUrl("")).toBe(false);
  });

  it("merges class names", () => {
    expect(cn("a", false && "b", "c")).toContain("a");
  });
});

describe("consent", () => {
  it("parses valid consent and rejects wrong version", () => {
    const ok = parseConsent(
      JSON.stringify({
        necessary: true,
        analytics: true,
        functional: false,
        marketing: false,
        timestamp: "2026-09-09T00:00:00.000Z",
        version: CONSENT_VERSION,
      }),
    );
    expect(ok?.analytics).toBe(true);
    expect(parseConsent(JSON.stringify({ version: "0.1", analytics: true }))).toBeNull();
  });
});
