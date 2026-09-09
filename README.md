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
