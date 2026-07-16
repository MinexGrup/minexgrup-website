# Minex Grup Website — Project Handoff / Continuation Brief

Paste this whole file into a new conversation to continue building. It describes the
brand, the tech, what's already built, decisions made, and what's left to do.

---

## 1. What this project is
**Minex Grup** — a Türkiye-based (Bursa) B2B heavy-machinery **supply & sourcing** company.
They source and deliver mining/construction equipment, engines, undercarriage systems, and
spare parts through a global supplier network. **They are NOT a manufacturer, NOT a
marketplace, NOT a random trader.** Core message: *"We sell solutions, not just parts."*

Client flow: customer sends a request (machine / engine / part number) → Minex identifies
correct specs → finds suitable suppliers (Türkiye / China / Europe) → compares price,
quality, lead time → offers the best option → handles logistics to delivery.

- Serves: mining companies, quarry operators, construction contractors.
- Geography: HQ Türkiye (logistics); China (manufacturing/stock); Europe (OEM/quality);
  main served market Azerbaijan + regional projects. (No Russia focus. No manufacturing claims.)
- Public contact: `info@minexgrup.com` · `+90 541 852 80 85` · Türkiye, Bursa.
- Instagram URL: TODO. Footer legal disclaimer: TODO.

## 2. Design direction
Bold industrial / heavy-duty with modern high-end polish (Squarespace-level finish).
Inspiration: **berco.com** (cinematic machinery hero, interactive equipment) + **squarespace.com**
(clean structure, whitespace, big confident type, smooth scroll). **Black + gold** palette.

Design tokens (in `tailwind.config.ts`):
- Base near-black: `#0b0b0d` (plus 800 `#111114`, 700 `#17171b`, 600 `#1f1f24`).
- Gold: `#c9a24b` (bright `#e6c77e`, deep `#a9863a`) — warm metallic, used sparingly.
- Champagne (goldy white) for body text: `#f3ecdd`.
- Fonts: display = **Oswald** (industrial headings), body = **Inter**. Loaded via next/font.
  (Tailwind weights use named classes: font-bold=700, font-semibold=600, font-medium=500.
  NOTE: `font-700`/`font-600` are NOT valid Tailwind classes — do not use them.)

## 3. Tech stack (portable, no lock-in)
- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** (custom black/gold tokens)
- **Framer Motion** (scroll reveals + hero animation)
- **three** is in dependencies for a FUTURE real `.glb` 3D model (see §6).
- Deploy target: GitHub → Vercel/Netlify. Domain minexgrup.com (DNS in Squarespace).

## 4. Current status — what's BUILT
All pages exist and are styled:
- `/` Home — cinematic **video hero** (full-bleed looping machinery video + dark overlay +
  headline + "Request a Quote"), trust strip, product previews (4), industries (3), geography
  block, parts-catalog teaser, CTA band.
- `/products` overview + `/products/[slug]` for machinery, undercarriage, engines, spare-parts.
- `/industries` — Mining · Quarry · Construction.
- `/catalog` — searchable/filterable Parts Catalog UI with sample data, built against an
  **Airtable-ready schema** (`app/lib/parts.ts`). Search + brand/category/condition filters + sort.
- `/about`, `/contact` (Request-a-Quote form + supply-network SVG map).
- Header (mark + wordmark, sticky), Footer (full logo lockup), 404 page, favicon.
- API route `app/api/quote/route.ts` — emails quote submissions to INTERNAL recipients
  `siraj.t@minexgrup.com` + `j.talibov@minexgrup.com` (env `QUOTE_RECIPIENTS`), via Resend if
  `RESEND_API_KEY` set, else logs. These internal emails must NEVER be shown on the site.

## 5. Assets in the project
- `public/minex-mark.png` — gold M-mark (excavator-arm "M"), transparent. Used in header + favicon.
  Source: clean transparent PNG the client provided (`brand-source/MINEX LOGO M_2.png`).
- `public/minex-logo.png` — full lockup (mark + "MINEX"), extracted from a JPG mockup
  (`brand-source/MINEXLOGO_MOCKUP.jpg`) — slightly soft; replace with a vector/SVG when available.
- `public/hero.mp4` + `public/hero-poster.jpg` — the cinematic hero video (client-provided,
  low-res 688x384 — replace with higher-res footage for a sharper full-screen hero).
- `app/icon.png` — browser tab icon (the mark).
- `PREVIEW-homepage.html` — a self-contained, openable snapshot of the homepage for review
  (NOT part of the deployed site; just for showing the client the design in a browser).

## 6. Key decisions & history
- Client is non-technical; assistant leads all technical choices.
- Chose Next.js + Tailwind over Vite for the catalog/email backend needs and portability.
- A hand-built Three.js excavator was tried for the hero and **rejected as too "childish."**
  Decision: use a **real cinematic video** now (done), and later swap in a **real `.glb` 3D model**
  (photoreal) that the CLIENT will provide. When a `.glb` arrives, load it with three +
  GLTFLoader + OrbitControls in a client component and place it in/near the hero.
- Logo delivered by client as JPG/PNG (pasted images don't reach the file system — client must
  drag files into the connected folder or attach them).

## 7. Known caveats
- The build was authored and syntax/type-verified, but a full `npm run build` could not be
  completed in the assistant's sandbox (throttled network / limited resources). **Run
  `npm install && npm run build` locally or on Vercel to confirm** — it installs cleanly there.
- Hero video is low-resolution; get higher-res footage.
- Footer full-logo lockup is from a JPG (slightly soft); prefer a vector/transparent-PNG.

## 8. Outstanding TODO
1. Verify a real production build (`npm run build`) locally / on Vercel.
2. Push to a GitHub repo owned by Minex Grup; deploy to Vercel; point minexgrup.com DNS.
3. Add env vars on host: `RESEND_API_KEY`, `QUOTE_RECIPIENTS`, `QUOTE_FROM`, and Airtable keys.
4. Wire the Parts Catalog to Airtable (replace `sampleParts` in `app/lib/parts.ts` with an
   Airtable fetch returning the same `Part[]` shape — schema already matches).
5. Replace hero video with higher-res footage; optionally add a real `.glb` 3D model.
6. Add Instagram URL + footer legal disclaimer (`app/lib/site.ts`, `app/components/Footer.tsx`).
7. Add real product images / model galleries on the product category pages.
8. Get a vector (SVG) of the full logo lockup for a crisp footer.

## 9. How to run & deploy
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (use this to verify)
```
Deploy: push to GitHub → import on Vercel (auto-detects Next.js) → add env vars → point domain.

## 10. Where to edit content
- Copy / contact / nav / products / industries / geography: `app/lib/site.ts`
- Catalog data + schema: `app/lib/parts.ts`
- Colors / fonts: `tailwind.config.ts`
- Global styles (buttons, cards, eyebrow): `app/globals.css`
- Hero (video): `app/components/Hero.tsx`
- Header / Footer / Logo: `app/components/{Header,Footer,Logo}.tsx`

## 11. Project file tree (app/)
```
app/
  layout.tsx, page.tsx, globals.css, not-found.tsx, icon.png
  lib/        site.ts, parts.ts
  components/ Header, Footer, Logo, Hero, Reveal, PageHero, TrustStrip,
              ProductsPreview, IndustriesPreview, GeographyBlock, CatalogTeaser, CTASection
  products/   page.tsx, [slug]/page.tsx
  industries/ page.tsx
  catalog/    page.tsx, CatalogClient.tsx
  about/      page.tsx
  contact/    page.tsx, ContactForm.tsx
  api/quote/  route.ts
public/       minex-mark.png, minex-logo.png, hero.mp4, hero-poster.jpg
brand-source/ original logo files (not deployed)
```

---
*Handoff generated during the initial build session. Everything above reflects the project as it
stands in the `Web-Site (Claude)` folder.*
