# MedBridge

**Bridging the distance to care.** The website and first platform layer for MedBridge — an asset-light medical transfer coordination company (air ambulance, bed-to-bed transfer, international repatriation).

- Strategy, positioning, design system and roadmap: [`docs/STRATEGY.md`](docs/STRATEGY.md)
- Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide · Zod · Vercel

> **Preview mode is on by default.** Until `NEXT_PUBLIC_LAUNCH_READY=true`, every page shows a "Preview site" ribbon and search engines are told not to index the site. This protects real families from finding a site with placeholder phone numbers. See [Going live](#going-live-checklist).

---

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build
npm run lint && npm run typecheck
```

Local development stores requests in `.data/cases.json`. The Command Centre is at `/admin` (dev password: `medbridge-dev`; in production set `ADMIN_PASSWORD`).

## Repository structure

```
docs/STRATEGY.md              Strategy A–M, design system, roadmap
public/maps/                  Pre-rendered dotted maps (generated, cacheable)
scripts/
  generate-maps.mjs           Regenerates the dotted maps from Natural Earth
  qa.mjs                      Route sweep: status, h1, console errors, overflow, axe a11y, meta
  e2e.mjs                     Conversion flows: intake, call-back, guide, doctor form, links, admin
supabase/migrations/          Postgres schema (cases, Case ID sequence, events)
src/
  config/site.ts              ★ Phone, WhatsApp, email, address, launch flag, nav
  content/                    ★ All copy — edit here, pages update automatically
    services.ts               Air ambulance modalities
    journey.ts                Six-step transfer journey
    specialties.ts            Specialty & transplant content
    trust.ts                  Trust pillars, operator standard, verified facts (placeholders)
    pricing.ts                Estimator ranges [CALIBRATE]
    articles.ts               Knowledge Hub articles
    landings.ts               SEO landing pages (cities, corridors, services)
    places.ts                 Map coordinates for illustrative routes
  app/
    globals.css               ★ Design tokens (colours, radii, fonts)
    (site)/…                  Public pages
    (site)/[slug]/            SEO landing-page template
    api/transfer-requests/    Lead API → Case ID → store → notifications
    admin/                    Command Centre (auth, cases, status, KPIs)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg apple-icon.tsx
  components/
    brand/Logo.tsx            ★ Logo mark + wordmark
    layout/                   Header, footer, mobile emergency bar, preview ribbon
    forms/                    IntakeFlow (6-step + call-back), EnquiryForm, step UI
    tools/                    DecisionGuide, CostEstimator
    map/                      HeroJourney, RepatriationMap, NetworkGraph, LocatorMap
    sections/ ui/             Shared sections and primitives
  lib/
    leads/                    Schema (zod), Case IDs, store adapters (Supabase / local)
    notify.ts                 Email (Resend) + webhook alerts
    analytics.ts              Vendor-neutral track() — strips PII & clinical fields
    seo.tsx                   Metadata + JSON-LD helpers
```

## How to change things

### Phone number, WhatsApp, email
Preferred: set environment variables in Vercel → Project → Settings → Environment Variables, then redeploy:

| Variable | Example | Used for |
|---|---|---|
| `NEXT_PUBLIC_DESK_PHONE` | `+919876543210` | Header, sticky bar, every "Call" button |
| `NEXT_PUBLIC_DOCTOR_DESK_PHONE` | `+919876500000` | Physician line on /for-doctors (falls back to desk) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919876543210` | All WhatsApp buttons (digits only, with country code) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `desk@medbridge.in` | Footer, contact page |

Or edit the defaults directly in `src/config/site.ts`. Pre-filled WhatsApp messages (family, doctor, hospital, international, partner) are in `site.whatsappMessages`.

### Company name and address
`src/config/site.ts` → `legalName` and `address`.

### Logo
`src/components/brand/Logo.tsx` is the single source for the mark and wordmark. Update the same SVG paths in `src/app/icon.svg` (favicon), `src/app/apple-icon.tsx` and `src/app/opengraph-image.tsx`.

### Colours and fonts
`src/app/globals.css` → the `@theme` block. Every component reads these tokens (`navy-*`, `clinical-*`, `aqua-*`, `mist-*`, `coral-*` …). Fonts are set in `src/app/layout.tsx` (Geist Sans + Geist Mono via `next/font`).

### Services and page content
All copy lives in `src/content/`:
- Air ambulance options → `services.ts`
- Transfer journey steps → `journey.ts`
- Specialties / transplant → `specialties.ts`
- Trust section, operator standard, statistics → `trust.ts` (set a value in `verifiedFacts` only when it is audited — the UI shows placeholders until then)
- Estimator ranges → `pricing.ts` (**calibrate with operator rate cards**)
- Knowledge Hub → `articles.ts` (append an object to add an article; the page, sitemap and JSON-LD are generated)
- SEO landing pages → `landings.ts` (append an object to add `/your-slug`)

### SEO metadata
- Site-wide defaults: `src/app/layout.tsx` (`metadata`) and `src/config/site.ts` (`description`, `url`).
- Per page: the `metadata = pageMetadata({ title, description, path })` export at the top of each `page.tsx`.
- Landing pages and articles: `metaTitle` / `description` fields in `src/content/landings.ts` and `articles.ts`.
- Canonical URLs use `NEXT_PUBLIC_SITE_URL` (defaults to the Vercel production URL).
- `sitemap.xml`, `robots.txt`, Open Graph image and JSON-LD (Organization, BreadcrumbList, FAQPage, Article) are generated automatically.

## Environment variables

See [`.env.example`](.env.example). Server-only secrets: `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LEAD_WEBHOOK_URL`, `ADMIN_PASSWORD`, `ADMIN_SECRET`.

## Leads, Case IDs and the Command Centre

1. Every form posts to `POST /api/transfer-requests` (zod-validated, honeypot, per-IP rate limit).
2. A Case ID `MB-YYMMDD-NNN` is issued (IST date, atomic daily sequence in Postgres).
3. The case is stored, and the desk is alerted by email (Resend) and/or webhook (Slack, Zapier, Make…).
4. The family sees their Case ID with a one-tap **Continue on WhatsApp** hand-off that carries it.
5. Staff manage cases at `/admin`: KPIs, filters by status, lead sources, referral doctors, quote/revenue, notes.

**Storage:** with `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set, cases go to Postgres (run `supabase/migrations/0001_cases.sql` in the Supabase SQL editor). Without them, production falls back to in-memory storage, which is **not durable** — the admin shows a warning. If storage ever fails, the API still issues an ID and sends the alert, so no enquiry is lost.

## Going-live checklist

- [ ] Set real `NEXT_PUBLIC_DESK_PHONE`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, email; call and WhatsApp them from a phone
- [ ] Connect Supabase and run the migration; submit a test request and see it in `/admin`
- [ ] Configure at least one alert channel (`RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL`, or `LEAD_WEBHOOK_URL`) and confirm delivery
- [ ] Set `ADMIN_PASSWORD` (and `ADMIN_SECRET`)
- [ ] Replace every `[PLACEHOLDER]`: legal name, address, leadership, grievance officer (`grep -rn PLACEHOLDER src`)
- [ ] Confirm the operator standard in `trust.ts` with the medical director / aviation advisor
- [ ] Calibrate estimator ranges in `pricing.ts`
- [ ] Legal review of `/privacy`, `/terms`, `/medical-disclaimer`; medical review of Knowledge Hub articles
- [ ] Confirm the "no referral inducements" commitment on `/for-doctors` reflects company policy
- [ ] Add your domain in Vercel and set `NEXT_PUBLIC_SITE_URL`
- [ ] Finally: `NEXT_PUBLIC_LAUNCH_READY=true` and redeploy (removes the ribbon, enables indexing)

## Testing

```bash
npm run build && npm start               # in one terminal
npm run qa                               # every route × desktop/mobile: status, h1, console, overflow, axe, meta
ADMIN_PASSWORD=… npm run e2e             # intake, call-back, decision guide, doctor form, links, menu, admin
```

Playwright uses the system Chromium; set `CHROMIUM=/path/to/chrome` if needed.

## Deploying

The project is a standard Next.js app — import the GitHub repository in Vercel (framework preset: Next.js), add the environment variables above, and deploy. Every push to the production branch redeploys.

## Clinical safety principles

The platform coordinates; it never diagnoses, issues fit-to-fly decisions or automatically recommends a transport modality. Every tool says so and hands off to a human coordinator. Analytics never receive names, contact details or clinical information.
