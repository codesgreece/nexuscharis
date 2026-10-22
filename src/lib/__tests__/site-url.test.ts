import { afterEach, describe, expect, it } from "vitest";
import { CANONICAL_SITE_URL, absoluteUrl, canonicalRedirectTarget, getSiteUrl } from "../utils";

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

describe("canonicalRedirectTarget", () => {
  it("sends the apex host to www", () => {
    expect(
      canonicalRedirectTarget({
        host: "nexusdevstudio.gr",
        protocol: "https",
        pathname: "/services/web-design",
        search: "",
      }),
    ).toBe(`${CANONICAL_SITE_URL}/services/web-design`);
  });

  it("upgrades insecure www requests to https", () => {
    expect(
      canonicalRedirectTarget({
        host: "www.nexusdevstudio.gr",
        protocol: "http",
        pathname: "/",
        search: "",
      }),
    ).toBe(`${CANONICAL_SITE_URL}/`);
  });

  it("leaves the canonical https host and local hosts untouched", () => {
    expect(
      canonicalRedirectTarget({
        host: "www.nexusdevstudio.gr",
        protocol: "https",
        pathname: "/",
        search: "",
      }),
    ).toBeNull();
    expect(
      canonicalRedirectTarget({
        host: "localhost:3000",
        protocol: "http",
        pathname: "/",
        search: "",
      }),
    ).toBeNull();
  });
});
