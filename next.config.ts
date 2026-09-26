import type { NextConfig } from "next";

// Multi-zone setup: /refferal is proxied to the separate affiliate Vercel
// project (nexusrefferal). Works on any hostname of THIS project, including
// https://nexuscharis.vercel.app/refferal until nexusdevstudio.gr is attached.
const AFFILIATE_ZONE_PATH = "/refferal";
const AFFILIATE_ZONE_ORIGIN = (
  process.env.AFFILIATE_ZONE_ORIGIN ?? "https://nexusrefferal.vercel.app"
).replace(/\/+$/, "");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // The affiliate zone is excluded: it is a different application that
        // ships its own security headers, and this CSP would block its assets.
        source: "/((?!refferal$|refferal/).*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    // Strip the /refferal prefix and forward to the affiliate app root:
    //   /refferal          → https://nexusrefferal.vercel.app/
    //   /refferal/login    → https://nexusrefferal.vercel.app/login
    //   /refferal/:path*   → https://nexusrefferal.vercel.app/:path*
    return {
      beforeFiles: [
        {
          source: AFFILIATE_ZONE_PATH,
          destination: `${AFFILIATE_ZONE_ORIGIN}/`,
        },
        {
          source: `${AFFILIATE_ZONE_PATH}/:path*`,
          destination: `${AFFILIATE_ZONE_ORIGIN}/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
