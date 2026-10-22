import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Canonical production domain — never emit vercel.app / localhost in public SEO. */
export const CANONICAL_SITE_URL = "https://www.nexusdevstudio.gr";

const VERCEL_PRODUCTION_ALIASES = new Set([
  "nexuscharis.vercel.app",
  "www.nexuscharis.vercel.app",
]);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function normalizeOrigin(url: string) {
  return url.replace(/\/$/, "");
}

function isLocalOrPreviewHost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname.endsWith(".vercel.app") ||
    hostname === "127.0.0.1"
  );
}

/**
 * Public site origin for canonicals, sitemap, robots, OG, JSON-LD.
 * Prefer the custom production domain whenever possible.
 */
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL
    ? normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL)
    : null;

  if (configured) {
    try {
      const host = new URL(configured).hostname.toLowerCase();
      if (host === "nexusdevstudio.gr" || host === "www.nexusdevstudio.gr") {
        return CANONICAL_SITE_URL;
      }
      // Misconfigured production env pointing at vercel.app → force canonical domain
      if (process.env.VERCEL_ENV === "production" || VERCEL_PRODUCTION_ALIASES.has(host)) {
        return CANONICAL_SITE_URL;
      }
      if (!isLocalOrPreviewHost(host) && configured.startsWith("https://")) {
        return configured;
      }
    } catch {
      // fall through
    }
  }

  if (process.env.VERCEL_ENV === "production") {
    return CANONICAL_SITE_URL;
  }

  // Preview deployments may use the deployment URL for non-SEO sharing
  if (process.env.VERCEL_URL && process.env.VERCEL_ENV === "preview") {
    return `https://${normalizeOrigin(process.env.VERCEL_URL)}`;
  }

  if (configured?.startsWith("http://localhost") || configured?.startsWith("https://localhost")) {
    return configured;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl().replace(/\/$/, "");
  if (!path) return base;
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isSafeExternalUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function formatPhoneDisplay(phone: string) {
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
}

export function isVercelProductionAlias(host: string | null) {
  if (!host) return false;
  return VERCEL_PRODUCTION_ALIASES.has(host.toLowerCase().split(":")[0]);
}

/**
 * Production host canonicalization.
 * Apex and insecure www/apex requests go to https://www.nexusdevstudio.gr.
 * Preview hosts are left alone unless they are the known production alias.
 */
export function canonicalRedirectTarget(input: {
  host: string | null;
  protocol: string | null;
  pathname: string;
  search: string;
  vercelEnv?: string;
}): string | null {
  const hostname = input.host?.toLowerCase().split(":")[0] ?? "";
  const onApex = hostname === "nexusdevstudio.gr";
  const onWww = hostname === "www.nexusdevstudio.gr";
  const onProductionAlias =
    VERCEL_PRODUCTION_ALIASES.has(hostname) && input.vercelEnv === "production";
  const insecure = input.protocol === "http" && (onApex || onWww);

  if (!onApex && !onProductionAlias && !insecure) return null;

  const target = new URL(input.pathname + input.search, CANONICAL_SITE_URL);
  return target.toString();
}
