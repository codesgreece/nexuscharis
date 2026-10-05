import { afterEach, describe, expect, it } from "vitest";
import { CANONICAL_SITE_URL, absoluteUrl, getSiteUrl } from "../utils";

const ORIGINAL = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL };
});

describe("getSiteUrl", () => {
  it("returns canonical production domain when NEXT_PUBLIC_SITE_URL is vercel.app", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://nexuscharis.vercel.app";
    process.env.VERCEL_ENV = "production";
    expect(getSiteUrl()).toBe(CANONICAL_SITE_URL);
  });

  it("normalizes apex custom domain to www", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://nexusdevstudio.gr";
    delete process.env.VERCEL_ENV;
    expect(getSiteUrl()).toBe(CANONICAL_SITE_URL);
  });

  it("builds absolute https URLs from the canonical host", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.nexusdevstudio.gr";
    expect(absoluteUrl("/privacy")).toBe(`${CANONICAL_SITE_URL}/privacy`);
    expect(absoluteUrl("/")).toBe(`${CANONICAL_SITE_URL}/`);
  });
});
