import { describe, it, expect, afterEach, vi } from "vitest";
import { buildContactEmail, getContactRecipient, getContactFrom } from "../mail";

describe("buildContactEmail", () => {
  it("includes all form fields in plain text and html", () => {
    const { subject, text, html } = buildContactEmail({
      name: "Χαράλαμπος",
      email: "client@example.com",
      phone: "6936732844",
      service: "Landing Pages",
      message: "Θέλω προσφορά για νέο website.",
      marketingOptIn: true,
    });

    expect(subject).toContain("Χαράλαμπος");
    expect(text).toContain("client@example.com");
    expect(text).toContain("6936732844");
    expect(text).toContain("Landing Pages");
    expect(text).toContain("Marketing opt-in: Ναι");
    expect(text).toContain("Θέλω προσφορά για νέο website.");
    expect(html).toContain("client@example.com");
    expect(html).toContain("Landing Pages");
    expect(html).toContain("Ναι");
  });

  it("escapes html in user-provided fields", () => {
    const { html } = buildContactEmail({
      name: `<script>alert("x")</script>`,
      email: "a@b.com",
      message: "Hello <b>world</b>",
      marketingOptIn: false,
    });

    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("Hello &lt;b&gt;world&lt;/b&gt;");
    expect(html).toContain("Όχι");
  });
});

describe("contact mail env helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("defaults recipient to outlook inbox", () => {
    expect(getContactRecipient()).toBe("nexusdevstudio@outlook.com");
  });

  it("uses CONTACT_TO_EMAIL when set", () => {
    vi.stubEnv("CONTACT_TO_EMAIL", "custom@example.com");
    expect(getContactRecipient()).toBe("custom@example.com");
  });

  it("uses CONTACT_FROM_EMAIL when set", () => {
    vi.stubEnv("CONTACT_FROM_EMAIL", "NEXUS <noreply@nexusdevstudio.gr>");
    expect(getContactFrom()).toBe("NEXUS <noreply@nexusdevstudio.gr>");
  });
});
