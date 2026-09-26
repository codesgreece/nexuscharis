# NEXUS DEV STUDIO GREECE

Premium website & CMS for NEXUS DEV STUDIO GREECE — founded by Χριστόπουλος Χαράλαμπος.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Zod validation
- Secure admin authentication (HTTP-only signed cookies)

## Setup

1. Copy `.env.example` to `.env` and set values.
2. Create PostgreSQL database.
3. Install & prepare:

```bash
npm install
npm run db:setup
npm run dev
```

## Admin

- URL: `/admin`
- Credentials: `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`
- No public registration

## Vercel (production)

Production URL: `https://nexuscharis.vercel.app`

In the Vercel project **Environment Variables** (Production + Preview), set:

| Variable | Example |
|---|---|
| `DATABASE_URL` | Postgres connection string (Neon / Vercel Postgres / Railway) with `?sslmode=require` |
| `AUTH_SECRET` | 32+ random characters |
| `ADMIN_EMAIL` | admin email |
| `ADMIN_PASSWORD` | strong password (used only when you run seed) |
| `NEXT_PUBLIC_SITE_URL` | `https://nexuscharis.vercel.app` |

After the first successful deploy, seed the database once (from your machine against the production DB):

```bash
DATABASE_URL="your-production-url" npm run db:seed
```

Or in Vercel → Storage, create a Postgres database and link it so `DATABASE_URL` is injected automatically.

## Affiliate zone (`/refferal`)

The affiliate platform lives in a **separate Vercel project** (`nexusrefferal`) and is proxied
through this project as a Next.js rewrite (no browser redirect). Available on any hostname of
this deployment — including `https://nexuscharis.vercel.app/refferal` — and later on
`https://nexusdevstudio.gr/refferal` once the custom domain is attached.

Rewrites in `next.config.ts`:

- `/refferal` → `https://nexusrefferal.vercel.app/`
- `/refferal/:path*` → `https://nexusrefferal.vercel.app/:path*`
- Optional build-time override: `AFFILIATE_ZONE_ORIGIN`
- Site security headers skip `/refferal*`, so the affiliate app's own headers apply.

**Limitation:** because the affiliate app currently serves from `/` (assets at `/_next/*`,
root-relative links), HTML for `/refferal` loads but its JS/CSS and client-side navigation
still request `/_next/*` and `/login` on this host. For a fully working zone under the prefix,
redeploy the affiliate project with `basePath: "/refferal"` and point the rewrite destinations
at `${AFFILIATE_ZONE_ORIGIN}/refferal/...` instead.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm test` — Vitest
- `npm run db:setup` — push schema + seed

## Notes

- Package prices, portfolio, offers, popups and ads are managed from the Admin Panel.
- Portfolio starts empty by design (no fake projects).
