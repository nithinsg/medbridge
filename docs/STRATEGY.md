# MedBridge — Strategy, Architecture & Build Plan

> Working document. Everything marked **[PLACEHOLDER]** or **[VERIFY]** must be replaced with verified facts before public launch. Nothing in this document or on the site invents certifications, fleet size, response times, partner hospitals, doctors or outcomes.

---

## A. Strategic positioning

**What MedBridge is:** an asset-light, operator-neutral **medical transfer coordination company**. Air ambulance is the lead service and the main search entry point, but the product is the *coordinated journey*: clinical assessment → receiving doctor and bed → ground ambulance → aircraft (or airline stretcher / medical escort / road) → destination ambulance → admission.

**Positioning statement**

> For families, referring doctors and hospitals who need to move a patient across a distance, MedBridge is the medical transfer desk that coordinates the whole journey — from bedside to the right hospital. Unlike an aircraft operator, which sells a flight on the aircraft it has, MedBridge starts with the patient's clinical need and the receiving bed, then selects the right transport from a vetted network.

**The one question the site must answer in 30 seconds:**
*"Why call MedBridge instead of an air ambulance operator directly?"*

1. **One accountable team for the whole journey** — not just the flight. We line up the receiving doctor, the bed, both ground ambulances, the aircraft and the documents.
2. **Operator-neutral** — we don't own aircraft, so we're not incentivised to sell you one. Sometimes the right answer is an airline stretcher, a medical escort or a road transfer. Sometimes it's *not yet*.
3. **Doctor-to-doctor first** — transport is chosen by clinicians talking to clinicians, not by a sales desk.
4. **Bed confirmed before wheels-up** — the receiving hospital is lined up before the patient leaves.
5. **Safety-led operator selection** — after the 2026 non-scheduled-operator accidents in India (including the February 2026 air-ambulance accident in Jharkhand) and the DGCA special audits that followed, "who is actually flying my patient?" is a real family question. MedBridge makes operator selection criteria explicit.

**Emotional positioning:** *Calm in a crisis.* The site should lower the heart rate of the person reading it.

---

## B. Competitive whitespace

Research (Sept 2026) of Indian and international providers. Categorised — most are not direct competitors, they are potential **supply** for MedBridge.

| Category | Examples | What they do well | Weakness / whitespace |
|---|---|---|---|
| **Aircraft / NSOP operators** | Club One Air, Redbird Airways, other NSOP charter operators | Own or lease aircraft; fast when an aircraft is near | Sell *their* aircraft; limited ground/bed coordination; safety scrutiny in 2026 |
| **Clinical air-transport teams** | ICATT (Bengaluru; doctor-founded) | Strong clinical credibility | Operator-centric; single-brand journey |
| **Hospital-owned services** | Medanta, Apollo and other large hospital groups | Clinical trust; in-house ICU | Transfer *into their own* hospital — not neutral on destination |
| **Aggregators / lead-gen brokers** | Numerous "air ambulance in [city]" SEO sites | Rank for city keywords | Thin doorway pages, inflated claims, phone-farm UX, low trust |
| **Medical assistance companies** | International SOS, members of International Assistance Group | Global networks, insurer contracts | Built for insurers/corporates; not accessible to an Indian family calling at 2 a.m. |
| **International air-ambulance / repatriation** | REVA, HumanCare Worldwide, Air Medical 24x7, AeroCare India | Long-range capability; embassy/insurer workflows | Generic global UX; India-side ground + bed coordination is weak |
| **Ground ambulance platforms** | Medulance and city players | Fast ground dispatch | No air or international capability |

**Common pattern across Indian sites:** cluttered pages, stock photography, unverifiable superlatives ("India's No.1"), fixed prices, dozens of near-identical city pages, forms that ask for everything, no explanation of who decides fitness to fly.

**The whitespace MedBridge owns:**
- **Neutral coordinator** between families/doctors and operators (the International SOS model, built for Indian families and doctors).
- **Bed-to-bed as the product**, not an add-on.
- **Clinical honesty**: "a clinician decides", "we'll tell you if a cheaper or safer option fits", "we'll tell you when not to fly".
- **Radically simpler UX**: one call, one WhatsApp, one short form, one Case ID.
- **Doctor-grade B2B desk** that doesn't feel like a commission scheme.

---

## C. Brand architecture

Master brand: **MEDBRIDGE** — *Medical Mobility Infrastructure* (internal descriptor, used sparingly in public).

Branded-house model (one brand, descriptive divisions):

| Division | Role | Launch visibility |
|---|---|---|
| **MedBridge Aviation** | Air ambulance: fixed-wing, helicopter, ICU, airline stretcher, medical escort | **Lead service — dominant at launch** |
| **MedBridge Transfer** | The coordination layer (assessment, beds, doctors, docs) | Launch — framed as "Medical Transfer" |
| **MedBridge International** | Repatriation to/from India | Launch — "International Repatriation" |
| **MedBridge Network** | Physicians, hospitals, operators | Launch as a page; portal later |
| **MedBridge Assist** | Insurers, TPAs, corporates, embassies, universities | Phase 2 (contact route only at launch) |

Divisions are implemented as route groups so they can move to subdomains (`aviation.medbridge…`) without a rewrite.

---

## D. Sitemap

```
/                                   Home
/request-transfer                   Multi-step intake (primary conversion)
/air-ambulance                      Air ambulance (highest priority service)
/which-air-ambulance                Interactive "which transfer do I need?" guide (non-diagnostic)
/medical-transfer                   Coordination layer — interactive journey
/international-repatriation         Repatriation + global route map
/for-doctors                        Referring physician desk
/for-hospitals                      Hospital transfer network
/transplant-transfers               Organ & transplant patient transfers
/specialty-transfers                Cardiac, neuro, pulmonology, trauma, oncology, transplant, paeds, neonatal
/air-ambulance-cost                 Cost factors + indicative estimator
/network                            MedBridge Network visualisation
/about                              Story
/contact                            Contact, desks, address
/knowledge                          Knowledge Hub
/knowledge/[article]                12 articles (template)
/[seo-landing]                      Intent-led landing pages, each with unique local/route content:
    /air-ambulance-india, -hyderabad, -bangalore, -delhi, -mumbai, -chennai
    /singapore-to-india-medical-repatriation, /dubai-to-india-air-ambulance, /thailand-to-india-…, /uk-to-india-…
    /icu-air-ambulance, /ventilator-air-ambulance, /medical-escort-flight
/privacy, /terms, /medical-disclaimer
/admin                              Internal case dashboard (auth, noindex)
```

`/air-ambulance-cost-india` → 308 redirect to `/air-ambulance-cost` (avoid duplicate intent).

---

## E. Primary user journeys

**1. Family (mobile, stressed, often at night)**
Google "air ambulance [city]" / WhatsApp forward → landing page → sees "we coordinate the whole journey" + Call / WhatsApp in thumb reach → **Call** (most) or **WhatsApp** (prefilled) or **6-step request** → receives Case ID → coordinator calls → doctor-to-doctor → options + estimate → confirmation → transfer.
*Design rules:* no jargon, no fear, 1 tap to call, ~60s form, "Not sure" is always a valid answer.

**2. Referring doctor**
Colleague recommendation / search → `/for-doctors` → "Request a doctor-to-doctor call" (doctor WhatsApp prefill, or short clinical form) → MedBridge physician calls back → handover checklist → transfer → closure summary back to the referrer.
*Design rules:* clinical tone, no commissions language, clear boundaries of responsibility.

**3. Hospital (transfer desk / international patient desk / ICU)**
`/for-hospitals` → partner enquiry or live case → dedicated desk → SLAs [PLACEHOLDER] → documentation pack.

**4. International family / assistance company**
"Singapore to India medical repatriation" → route page → global map → request (international) → coordinator + documentation guidance (passport, fit-to-fly letter from treating doctor, insurer GOP) → repatriation → India-side ground + bed.

**Conversion funnels instrumented:** CTA click → call / WhatsApp / form start → step completion → submit → (ops) qualified case → quote → confirmed → completed → revenue.

---

## F. Homepage wireframe (mobile first)

```
┌ Preview ribbon (only while contact details are placeholders) ┐
│ Logo                                    [Call 24/7] [≡]      │
├──────────────────────────────────────────────────────────────┤
│ 24/7 TRANSFER DESK · AIR · GROUND · INTERNATIONAL            │
│ Medical care shouldn't stop because of distance.            │
│ MedBridge coordinates critical medical transfers, air        │
│ ambulance services and repatriation — bedside to hospital.   │
│ [ REQUEST MEDICAL TRANSFER ]  [ Call MedBridge 24/7 ]        │
│ WhatsApp a coordinator →                                     │
│ ┌ Journey visual: dotted map, route, moving aircraft,        │
│ │ 6-stop timeline lighting up in sync ┐                      │
├──────────────────────────────────────────────────────────────┤
│ One team. One coordinated journey. (4 reasons vs operator)   │
│ Air ambulance: fixed-wing · helicopter · ICU · escort        │
│ Interactive transfer journey (6 steps, expandable)           │
│ International repatriation (global route map)                │
│ For doctors | For hospitals (split)                          │
│ Why MedBridge (trust architecture, no fake stats)            │
│ Specialty transfers (8 cards → detail)                       │
│ Knowledge hub (3 articles)                                   │
│ Final CTA: "Wherever the patient is, we'll help find the     │
│            way forward."                                     │
│ Footer (desks, legal, clinical disclaimer)                   │
├──────────────────────────────────────────────────────────────┤
│ [ Call 24/7 ] [ WhatsApp ] [ Request transfer ]  ← sticky    │
└──────────────────────────────────────────────────────────────┘
Desktop: two-column hero (copy | journey visual); top-right
"24/7 TRANSFER DESK +91 …" persistent in header.
```

---

## G. Design direction

**"Calm clinical precision."** Apple-level restraint, Linear-level interaction polish, aviation-chart precision (monospaced route codes, dotted maps, thin rules), warmed by human copy.

- Not hospital blue: a **deep midnight navy** base with a **cool clinical blue** and a single **aqua** accent that marks the *route* — the brand's signature element is the line that connects two points.
- Emergency coral appears only on emergency affordances (call buttons' live-dot, critical states) — never as a background.
- Imagery: **illustrative, not stock**. Launch with SVG journey/route/map visuals (fast, honest, on-brand). Real photography (crew, families, handovers — natural light, no staged pointing) to be commissioned; slots are defined in `src/content`.

## H. Design system

**Colour tokens** (`src/app/globals.css`)

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#07131F` | Primary dark surfaces, text on light |
| `navy-900` | `#0B1D2E` | Headings, dark sections |
| `navy-700` | `#1B3A57` | Secondary text on light |
| `blue-600` | `#2D5BD8` | Secondary / links / focus |
| `aqua-500` | `#16B3A3` | Accent: routes, active states, highlights |
| `mist-50` | `#F5F8FA` | Page background |
| `mist-100/200` | `#EDF2F6` / `#DDE5EC` | Cards, dividers |
| `success-600` | `#16875F` | Confirmations |
| `warning-500` | `#D9981F` | Cautions |
| `coral-500` | `#E5533D` | Emergency only |

**Typography:** Geist Sans (headings: 600, tight tracking −0.03em, sizes up to 76px desktop / 40px mobile; body 17–18px, 1.6 line-height), Geist Mono for route codes, case IDs, step numbers, eyebrow labels. Self-hosted via `next/font` — no layout shift, no external font request.

**Spacing:** 4px base; sections 96–144px desktop / 64–80px mobile; content max-width 1200px; reading width 68ch.

**Radius:** 10px controls, 20px cards, 28px feature panels.

**Buttons:** Primary (navy fill, white), Accent (aqua fill for the single most important action in dark sections), Secondary (outline), Emergency-call (navy with coral live-dot), Ghost. Min height 48px (56px on mobile CTA bar). Visible 3px focus ring.

**Cards:** white on mist, 1px `mist-200` border, no heavy shadow; hover lifts border colour, not scale.

**Forms:** one question per step, large tap targets (option cards), progress bar with step count, back always available, "Not sure" always valid, inline validation only on submit of step.

**Navigation:** desktop: logo | 7 links | desk number | Request transfer. Mobile: logo | Call | menu; bottom sticky bar with Call · WhatsApp · Request.

**Icons:** Lucide, 1.5px stroke, never cartoon medical icons.

**Motion:** 150–300ms ease-out; route-drawing animations; aircraft moves along paths; accordion height transitions; all motion disabled under `prefers-reduced-motion`.

**Responsive:** mobile-first; breakpoints 640 / 768 / 1024 / 1280.

---

## I. Technical architecture

```
Next.js 16 (App Router, RSC, static generation by default)
 ├─ src/config/site.ts        ← single source of truth: phones, WhatsApp, address, launch flag
 ├─ src/content/*.ts          ← services, specialties, articles, SEO landings, network, pricing model
 ├─ src/components/{brand,layout,ui,sections,tools,map,forms}
 ├─ src/app/                  ← routes (static), /api/transfer-requests (POST), /admin (dynamic)
 ├─ src/lib/leads/            ← LeadStore interface: SupabaseStore | MemoryStore
 ├─ src/lib/notify.ts         ← Resend email + generic webhook (Slack/Zapier/Make)
 ├─ src/lib/analytics.ts      ← vendor-neutral track(): Vercel Analytics + GA4/GTM, no PII
 └─ supabase/migrations/      ← Postgres schema: cases, events, sequence for Case IDs
```

- **Rendering:** all marketing pages statically generated; only `/api/*` and `/admin` are dynamic.
- **Security:** zod validation, honeypot, per-IP rate limit, strict security headers, admin behind HMAC-signed httpOnly cookie, `/admin` noindex; service keys server-only.
- **Privacy:** clinical condition collected only in the lead record (not analytics); DPDP Act 2023 consent line on the form; minimal fields.
- **Maps:** no Mapbox at launch — a pre-computed dotted world/India map (generated from Natural Earth via `world-atlas`) rendered as inline SVG. Zero map-tile requests, works on 3G. Mapbox can be added for live tracking in Phase 3.

## J. MVP vs Phase 2 vs Phase 3

| MVP (this build) | Phase 2 (0–6 months) | Phase 3 (6–18 months) |
|---|---|---|
| Full marketing site, 30+ routes | Supabase auth, patient case-tracking link by Case ID | MedBridge Command Centre (full case ops) |
| 6-step intake + fast call-back, Case IDs | Document & medical-report upload (encrypted storage) | Operator portal: quote requests & comparison |
| Call / WhatsApp everywhere, prefilled | Doctor & hospital dashboards | Live transfer tracking (map) |
| Lead API + store adapter + email/webhook alerts | WhatsApp Business API (templated updates) | Payments, invoicing, insurer/TPA billing |
| Admin dashboard (cases, status, KPIs) | CRM sync (HubSpot/Zoho), headless CMS (Sanity) | Partner SLAs, analytics warehouse, CAC/LTV |
| Decision guide, cost estimator, knowledge hub | Hindi + regional languages | MedBridge Assist B2B platform/API |
| SEO: metadata, JSON-LD, sitemap | Verified trust content (team, partners, accreditations) | Subdomains per division |

## K. Revenue / lead-generation architecture

**Demand sources:** organic search (intent pages + knowledge hub), referring doctors (highest-LTV channel), hospital transfer desks, international patient desks, insurers/TPAs/assistance companies (B2B), WhatsApp forwards.

**Capture:** Call (tracked click) · WhatsApp (prefilled, role-specific) · Request form (Case ID) · Doctor desk · Partner enquiry.

**Monetisation (behind the scenes, disclosed appropriately):** coordination fee; operator coordination margin; ground-transfer margin; international repatriation management fee; B2B retainers/SLA contracts (hospitals, insurers, corporates); medical escort services.

**Unit economics instrumentation:** each case carries `source`, `role`, `domestic/international`, `transport`, `quote_value`, `status`, `revenue` → CAC by channel, conversion lead→case→quote→completed, LTV by referrer.

## L. Recommended tagline

**Brand line: "Bridging the distance to care."**
Supporting line (proof): **"From bedside to the right hospital."**
Hero headline: **"Medical care shouldn't stop because of distance."**

Why: "Bridging" is ownable (it *is* the name), it survives expansion beyond aviation (ground, international, B2B, organ logistics), and it describes the gap MedBridge closes rather than a vehicle. "From bedside to the right hospital" is the concrete promise that separates us from operators and is used as the proof line throughout.

## M. Development roadmap (this build)

1. Scaffold Next.js 16 + TypeScript + Tailwind 4; tokens; fonts; logo system.
2. Layout shell: header with desk number, mobile menu, sticky emergency bar, footer, preview ribbon.
3. Content layer (`src/content`) — all copy editable in one place.
4. Home + hero journey animation.
5. Service pages: air ambulance, medical transfer, repatriation (global map), doctors, hospitals, transplant, specialties, network, about, contact.
6. Tools: request-transfer intake, which-air-ambulance guide, cost estimator.
7. Knowledge hub + 12 articles; SEO landing pages with unique content.
8. API, Case IDs, store adapters, notifications, admin dashboard.
9. SEO: metadata, OG image, JSON-LD, sitemap, robots, canonicals.
10. QA: every route, mobile viewport screenshots, forms, links, a11y (axe), production build.
11. Deploy to Vercel; verify production.

---

## "If I were building the next major Indian medical mobility company, what would I change?"

Improvements adopted in this build:

1. **Answer "why not call the operator?" in the hero**, not on page 3 — a four-point strip directly under the hero.
2. **A fast lane before the form.** Emergencies shouldn't need six steps. The intake opens with *"Just call me back"* (name + phone, 10 seconds) alongside the full guided flow.
3. **WhatsApp hand-off after submission** with the Case ID prefilled, so the case continues in the channel Indian families actually use — and so no lead is ever stranded if email alerts fail.
4. **Safety as a stated standard.** Publish *how* operators are selected (valid DGCA permit, aircraft & crew suitability, medical configuration, weather go/no-go discipline) as a draft standard **[VERIFY before launch]** — not as unverifiable claims.
5. **"We'll tell you when not to fly."** Present airline stretcher, medical escort and road transfer as first-class options. Honesty is the trust moat against operator sales desks.
6. **Launch-safety switch.** While contact details are placeholders, the site shows a preview ribbon and is `noindex` — a real family must never find a site with a dead phone number.
7. **Preparation guides for families and doctors** (documents, what to have ready, who can travel) — reduces coordination time and builds trust before the call.
8. **Case ID as a product primitive** — designed now so a tracking link, document upload and status updates can hang off it in Phase 2.
9. **Low-bandwidth by design:** no hero video, no map tiles, SVG visuals, static pages, self-hosted fonts.
10. **B2B-ready from day one:** hospital and doctor desks, role-specific WhatsApp prefills and lead `role` field feed the most valuable channels.

## Clinical safety principles (non-negotiable)

- The site never diagnoses, never issues "fit to fly" decisions, never recommends a modality automatically.
- Every tool ends with *a qualified clinician will assess*.
- Transport modality and fitness for transfer are decided by the treating and receiving clinicians and the aeromedical team.
- Analytics never receive clinical information or personal identifiers.
