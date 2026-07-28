# Shipmart

The Shipmart site, built from the 16 Stitch screen exports.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

Next.js 14 (App Router) · TypeScript strict · Tailwind. No backend — quotes and
tracking run against mock data behind hooks, so a real API drops in without
touching the components.

---

## Where the design came from

Tokens in `tailwind.config.ts` are lifted **verbatim** from the `tailwind.config`
block embedded in the Stitch exports, not re-typed from `DESIGN.md`. The export is
what the screens actually render with, so it wins.

One thing worth knowing about that export: Stitch's Material palette generator
moved the brand blue. `#0052FF` from the brief became `primary-container`, and
`primary` — the colour used for buttons, links and active states — is `#003ec7`,
a darker blue chosen for contrast. Every screen uses the darker one, so the site
does too.

### Colours added to the Stitch palette

The export has `error` but no success or warning tone, and a parcel product
cannot express "held at customs" without one. Added, all contrast-tested:

| Token | Value | Contrast | Use |
|---|---|---|---|
| `status-cleared` | `#046c47` | 6.48:1 on white | Delivered, customs cleared |
| `status-held` | `#8a4b00` | 6.80:1 on white | Held, action needed |
| `status-exception` | `#ba1a1a` | 6.46:1 on white | Failed, returned |
| `status-transit` | `#003ec7` | 7.97:1 on page bg | In transit, beta |
| `control-border` | `#7e8899` | 3.58:1 on white | Input borders |
| `on-dark-primary` | `#a8c0ff` | 7.27:1 on dark | Links on dark sections |
| `on-dark-muted` | `#c3c5d9` | 7.68:1 on dark | Body text on dark sections |

**Why `on-dark-*` exists:** Stitch's `primary` (`#003ec7`) measures **1.57:1**
against `inverse-surface` (`#263143`). It is unusable on the dark bands, so those
sections use the lighter tints above.

**One token demoted:** `outline` (`#737688`) measures **4.28:1** as body text on
the page background — under the 4.5:1 floor. It is fine for icons and dividers
(non-text, 3:1) but every text usage was moved to `on-surface-variant` (8.90:1).

---

## What was changed from the Stitch exports, and why

| Change | Reason |
|---|---|
| `href="#"` → real routes | Every link in every export was a placeholder. |
| Material Symbols font → inline SVG (`components/ui/Icon.tsx`) | The ligature font renders the literal words "search", "warning" until it loads, and pulls ~200KB for a dozen glyphs. |
| `googleusercontent.com` images → CSS/SVG and initials avatars | Those URLs are temporary Stitch CDN links that expire. A site depending on them breaks silently. Also matches the "interface over photography" rule. |
| `data-alt` → real `alt` | `data-alt` is inert; screen readers ignore it. |
| `alert('Form submitted')` on contact → real success panel | — |
| Invalid classes (`docked full-width`, `flat no shadows`) dropped | Not Tailwind; they did nothing. |
| Grey "In transit" badge → semantic status colours, always with a word | Status was being carried by a neutral chip. |
| Header/footer duplicated per page → single components | The 16 exports had six different footer variants. |

## Two gaps in the exports

1. **No prohibited-items screen.** Missing from the set, but linked from the
   footer of every page and load-bearing for a parcel service. Built to match the
   system (`/legal/prohibited-items`) — treat its layout as needing your review.
2. **The desktop home export was incomplete.** It stopped after the hero and
   trust strip. The remaining sections — pillars, explainer, steps, problem band,
   network, closing — were built from `DESIGN.md` and the mobile home export,
   which did include a problem section.

---

## What actually works

| Feature | Where |
|---|---|
| Landed-cost engine — volumetric weight, zone banding, duty, VAT, de-minimis | `lib/rates.ts`, `/pricing`, `/quote` |
| Live itemised breakdown with an empty state that names what is missing | `components/product/RateEstimator.tsx` |
| Tracking, 5 states | `lib/tracking.ts`, `/track` |
| Lane lookup, region accordion | `/coverage` |
| Integration + help search and filtering | `/integrations`, `/help` |
| Restricted-item lookup | `/legal/prohibited-items` |
| Forms: blur validation, inline errors, loading → success | `components/product/Forms.tsx` |
| Scroll-spy TOC, cookie prefs persisted to localStorage | `components/legal/Legal.tsx` |
| Accessible mobile menu — focus trap, Escape, focus restore | `components/layout/SiteHeader.tsx` |

### Tracking test numbers

| Number | State |
|---|---|
| `SHP-1000-TRANSIT` | In transit |
| `SHP-2000-HELD` | Held at customs, with an action panel |
| `SHP-3000-DELIVERED` | Delivered |
| `SHP-4000-EXCEPTION` | Delivery failed |
| anything else | Not-found, explaining both likely causes |

### Sample quote

London → Berlin, 2.5 kg, 30×20×15 cm, $145 handmade jewellery, standard:
shipping `12.00 + 3.70 × 2.5 = $21.25` · duty `145 × 6% = $8.70` ·
VAT `(145 + 21.25 + 8.70) × 19% = $33.24` · handling `$2.50` → **$65.69**.
Volumetric weight is 1.8 kg, so the 2.5 kg actual weight is charged.

---

## Verified

- `npm run build` — 21 routes, all static except `/contact` (reads a query param)
- `npx tsc --noEmit` — clean
- Every route: exactly one `h1`, unique title and description, no heading-level
  skips, no unlabelled form control, no link without an accessible name
- No horizontal body scroll at 375px
- All interactions driven in a real browser: estimator, all 5 tracking states,
  integration filter (10 → 3), contact validation (5 inline errors)

## Not done

- **No backend.** Rates and tracking are mocked; auth is not wired.
- **Legal copy is placeholder.** `/legal/terms` and `/legal/privacy` are layouts
  with representative clauses and a visible banner saying so. They need a lawyer.
- **`[[placeholder]]` facts remain.** Merchant counts, the three home-page
  statistics, the About numbers band, team members, plan prices. Marked with a
  dashed underline in development via `<Unverified>` — replace or remove them
  before launch.
- **Fonts load from Google Fonts via `<link>`**, matching the exports. Switching
  to `next/font` would self-host and remove the render-blocking request; it was
  not used here because this build environment blocks `fonts.gstatic.com`.
