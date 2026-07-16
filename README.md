# Minex Grup — Website

Bold, industrial B2B website for **Minex Grup** — heavy machinery supply & sourcing.
Black-and-gold, cinematic, with an interactive 3D machine on the homepage.

Built with a **standard, portable stack** so it can be handed to any developer and
deployed anywhere. No proprietary lock-in.

- **Framework:** Next.js 14 (App Router) + React 18
- **Styling:** Tailwind CSS (black / gold / champagne design tokens)
- **3D:** Three.js via @react-three/fiber + drei
- **Animation:** Framer Motion (scroll reveals)
- **Language:** TypeScript

## Pages
- `/` — Home (cinematic hero + interactive 3D excavator, trust strip, product & industry previews, geography, catalog teaser, CTA)
- `/products` and `/products/[slug]` — Overview + 4 category pages (Machinery, Undercarriage, Engines, Spare Parts)
- `/industries` — Mining · Quarry · Construction
- `/catalog` — Searchable / filterable Parts Catalog UI (sample data; Airtable-ready schema)
- `/about` — Who we are
- `/contact` — Request-a-Quote form + supply-network map

## Run it locally
You need [Node.js](https://nodejs.org) 18+ installed. Then, in this folder:

```bash
npm install      # one-time: downloads dependencies
npm run dev      # start the site at http://localhost:3000
```

Open http://localhost:3000 in your browser.

To build the production version:
```bash
npm run build
npm start
```

## Configuration — where to edit things
- **Copy, contact info, nav, products, industries:** `app/lib/site.ts`
- **Catalog sample data & schema:** `app/lib/parts.ts`
- **Colors & fonts:** `tailwind.config.ts`
- **Global styles / buttons / cards:** `app/globals.css`

## Environment variables (secrets)
Copy `.env.example` to `.env.local` and fill in values. **Never commit `.env.local`.**

- `RESEND_API_KEY` — email service key (for delivering quote requests)
- `QUOTE_RECIPIENTS` — internal inboxes leads go to (defaults to siraj.t@ and j.talibov@minexgrup.com). **Backend only — never shown on the site.**
- `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_PARTS_TABLE` — for the parts catalog (phase 2)

The only email shown publicly on the site is `info@minexgrup.com`.

## Quote / contact form
Submissions POST to `app/api/quote/route.ts`, which emails the internal recipients.
Until `RESEND_API_KEY` is set, submissions are validated and logged (nothing is lost),
so the form works end-to-end during setup. Add the key to enable real email delivery.

## Deploy (recommended path)
1. Push this folder to a **GitHub** repo owned by Minex Grup.
2. Import the repo on **Vercel** (or Netlify) — it auto-detects Next.js.
3. Add the environment variables in the host's dashboard.
4. Point `minexgrup.com` (DNS in Squarespace) at the host.

## Phase 2 — Parts Catalog → Airtable
The catalog UI (`app/catalog`) is built against the schema in `app/lib/parts.ts`.
Field names map 1:1 to intended Airtable columns. To go live: create the Airtable base,
then replace `sampleParts` with a fetch that returns the same `Part[]` shape — no redesign needed.

## To do / placeholders
- Instagram URL (`app/lib/site.ts`)
- Footer business disclaimer (`app/components/Footer.tsx`)
- Real product images / model galleries
- Wire Airtable (catalog) and Resend (email) keys
