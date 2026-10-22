/** Construction packages whose published price belongs on a service page. */
const SERVICE_PACKAGE_TITLES: Record<string, readonly string[]> = {
  "web-design": ["Starter Website", "Professional Website"],
  ecommerce: ["Business / E-Commerce"],
  "web-applications": ["Custom Project"],
  "mobile-apps": ["Custom Project"],
  "windows-apps": ["Custom Project"],
  "admin-panels": ["Custom Project"],
};

export type PublishedPackagePrice = {
  title: string;
  price: string;
  discount?: string | null;
};

/** True when the admin price is still the unset placeholder. */
export function isPlaceholderPrice(price: string | null | undefined) {
  if (!price) return true;
  return /x{2,}/i.test(price.trim());
}

export function publishedPackagePrices<T extends PublishedPackagePrice>(packages: T[]): T[] {
  return packages.filter((pkg) => !isPlaceholderPrice(pkg.price));
}

export function packagesForService<T extends PublishedPackagePrice>(slug: string, packages: T[]): T[] {
  const titles = SERVICE_PACKAGE_TITLES[slug];
  if (!titles) return [];
  return publishedPackagePrices(packages).filter((pkg) => titles.includes(pkg.title));
}
