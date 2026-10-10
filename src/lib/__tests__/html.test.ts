import { describe, expect, it } from "vitest";
import {
  isBlankRichHtml,
  linesToRichHtml,
  sanitizeRichHtml,
  slugify,
} from "@/lib/html";

describe("sanitizeRichHtml", () => {
  it("keeps safe formatting tags", () => {
    const html = sanitizeRichHtml(
      '<p>Hello <strong>world</strong></p><ul><li>One</li></ul><a href="https://example.com">link</a>',
    );
    expect(html).toContain("<strong>world</strong>");
    expect(html).toContain("<ul>");
    expect(html).toContain('href="https://example.com"');
  });

  it("strips scripts and unsafe urls", () => {
    const html = sanitizeRichHtml(
      '<p onclick="alert(1)">x</p><script>alert(1)</script><a href="javascript:alert(1)">bad</a>',
    );
    expect(html).not.toContain("script");
    expect(html).not.toContain("onclick");
    expect(html).not.toContain("javascript:");
  });
});

describe("slugify", () => {
  it("creates url-safe slugs", () => {
    expect(slugify("Frontend Developer")).toBe("frontend-developer");
    expect(slugify("  Full-Stack!! ")).toBe("full-stack");
  });
});

describe("rich helpers", () => {
  it("detects blank html", () => {
    expect(isBlankRichHtml("<p><br></p>")).toBe(true);
    expect(isBlankRichHtml("<p>Hello</p>")).toBe(false);
  });

  it("converts lines to list html", () => {
    expect(linesToRichHtml(["A", "B"])).toContain("<li>A</li>");
  });
});
