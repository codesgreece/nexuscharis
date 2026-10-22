import { describe, expect, it } from "vitest";
import { fallbackPackages } from "../fallbacks";
import { isPlaceholderPrice, packagesForService, publishedPackagePrices } from "../package-prices";

describe("published package prices", () => {
  it("treats unset XXX prices as placeholders and keeps real admin prices", () => {
    expect(isPlaceholderPrice("από €XXX")).toBe(true);
    expect(isPlaceholderPrice("150€")).toBe(false);
    expect(isPlaceholderPrice("Ζήτησε Προσφορά")).toBe(false);
    expect(publishedPackagePrices(fallbackPackages).map((pkg) => pkg.price)).toEqual([
      "150€",
      "Ζήτησε Προσφορά",
      "Ζήτησε Προσφορά",
      "Κατόπιν συνεννόησης",
    ]);
  });

  it("copies only the matching published package onto each service", () => {
    const withPlaceholder = [
      ...fallbackPackages,
      { title: "Landing draft", price: "από €XXX", discount: null },
    ];

    expect(packagesForService("web-design", withPlaceholder).map((pkg) => pkg.title)).toEqual([
      "Starter Website",
      "Professional Website",
    ]);
    expect(packagesForService("landing-pages", withPlaceholder)).toEqual([]);
    expect(packagesForService("ecommerce", withPlaceholder).map((pkg) => pkg.price)).toEqual([
      "Ζήτησε Προσφορά",
    ]);
    expect(packagesForService("admin-panels", withPlaceholder).map((pkg) => pkg.title)).toEqual([
      "Custom Project",
    ]);
  });
});
