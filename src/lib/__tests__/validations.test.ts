import { describe, it, expect } from "vitest";
import { contactSchema, packageSchema } from "../validations";
import { isSafeExternalUrl, cn } from "../utils";

describe("contactSchema", () => {
  it("accepts valid contact payload", () => {
    const result = contactSchema.safeParse({
      name: "Χαράλαμπος",
      email: "test@example.com",
      phone: "6936732844",
      service: "Landing Pages",
      message: "Θέλω προσφορά για νέο website.",
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short messages", () => {
    const result = contactSchema.safeParse({
      name: "Test",
      email: "test@example.com",
      message: "short",
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
