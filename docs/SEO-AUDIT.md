# NEXUS DEV STUDIO GREECE — SEO Audit (pre-implementation)

**Date:** 2026-10-05  
**Production:** https://www.nexusdevstudio.gr/  
**Stack:** Next.js 16.3.4 App Router + TypeScript + Prisma CMS

## Critical findings

| Area | Status | Issue |
|------|--------|-------|
| Canonical / metadataBase | ❌ | Live site emits `https://nexuscharis.vercel.app` for canonical, OG, Twitter, JSON-LD |
| robots.txt Host/Sitemap | ❌ | Points to `nexuscharis.vercel.app` |
| sitemap.xml | ❌ | Uses vercel host + includes hash URLs (`/#about`, `/#services`, …) — not valid indexable URLs |
| favicon.ico | ❌ | `/favicon.ico` returns 404 (SVG exists) |
| Admin indexability | ⚠️ | robots.txt disallows `/admin`, but no `noindex` metadata on admin/login |
| LocalBusiness schema | ⚠️ | Declares LocalBusiness without real street address |
| Expired offer copy | ❌ | FAQ still promotes 75€ offer until 30 Sep 2026 (expired as of 5 Oct 2026) |
| OG title | ⚠️ | Live OG title is short site name only (CMS override), not recommended homepage OG title |
| WWW / HTTPS redirects | ✅ | Apex → www and HTTP → HTTPS already work (308) |
| HSTS | ✅ | Present on production responses |
| Homepage H1 | ✅ | Single correct H1 |
| Public legal pages | ✅ | 200 + dedicated metadata helpers |
| Security headers | ✅ | CSP / XCTO / Referrer / Permissions in next.config |

## Technical inventory

- App Router under `src/app`
- `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/layout.tsx` metadata + JSON-LD
- Middleware protects `/admin` (auth redirect)
- Legal routes: privacy, cookies, terms, services-terms, copyright
- Homepage is single-page sections (`#about`, `#services`, …) — no separate service pages
- Images: `next/image` + AVIF/WebP formats enabled
- Fonts: `next/font` Manrope with `display: swap`
- Offers/popups/ads already date-filtered in `getPublicSiteData`

## Priority fixes (implementation plan)

1. Canonical site URL helper → always `https://www.nexusdevstudio.gr` in production SEO surfaces
2. Rebuild robots.txt + sitemap (no hash URLs, correct host)
3. Admin/login `noindex,nofollow`
4. Improve homepage/legal metadata, OG/Twitter, icons
5. Sanitize Organization JSON-LD (no fake LocalBusiness address)
6. Remove expired 75€ promotional copy from FAQ/legal defaults
7. Light on-page: packages H2, internal links, HSTS header
## Implementation status (2026-10-05)

Applied in branch `cursor/technical-seo-audit-impl-4b01`:

- Canonical host helper forces `https://www.nexusdevstudio.gr` for production SEO surfaces
- robots.txt + sitemap.xml rebuilt (no hash URLs)
- Admin/login noindex metadata + `X-Robots-Tag`
- Homepage/legal metadata, icons, OG/Twitter, JSON-LD cleanup
- Expired 75€ offer removed from FAQ + legal defaults
- Internal linking, packages H2, HSTS, favicon.ico / apple-touch-icon
- Production vercel.app host → www 308 redirect in middleware

**Manual remaining:** set `NEXT_PUBLIC_SITE_URL=https://www.nexusdevstudio.gr` in Vercel Production env (code also guards misconfig). Verify Google Search Console property for www domain and submit sitemap.

## Nationwide SEO strategy (2026-10-05)

Primary geo target: **all of Greece** (not Athens-first).

- Homepage title/description/H1 emphasize Ελλάδα nationwide
- No thin city landing pages
- Organization schema (not LocalBusiness storefront)
- Coverage section + service anchors for internal linking
- Future regional pages only if uniquely useful content exists