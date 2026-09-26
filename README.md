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
