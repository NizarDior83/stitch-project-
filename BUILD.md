# Shipmart — build specification for Antigravity / AI Studio

Turns the Stitch screens into a working Next.js site. Stitch supplies the visuals;
this file supplies the architecture, the prompt sequence, and the verification bar.

**Read order:** §1 prerequisites → §2 stack → §3 create the two context files →
§4 run the prompt sequence in order → §5 verify → §6 deploy.

---

> ## ⚠ THE DESIGNS ARE ATTACHED. DO NOT DESIGN ANYTHING.
>
> Every screen of this site has already been designed in Stitch and is attached
> to this project as **two files per screen**:
>
> - **`.stitch/designs/{slug}.html`** — the real markup, with the real Tailwind
>   config, the real class names, the real DOM structure.
> - **`.stitch/designs/{slug}.png`** — the screenshot of that screen as it
>   actually renders.
>
> **The agent's job is transcription and architecture, not design.** Layout,
> spacing, hierarchy, section order, component composition and copy are already
> decided and visible in those two files. Nothing in this build is an invitation
> to improve, reinterpret, modernise or "clean up" the design.
>
> **Before writing code for any screen, open both files for that screen.** The
> `.png` tells you what it must look like. The `.html` tells you how Stitch
> built it and which tokens it used. Building from one without the other is the
> single most common way this goes wrong: the screenshot alone loses the token
> values, and the markup alone loses the visual intent.
>
> If a screen's HTML and PNG are missing, **stop and ask** — do not invent a
> design to fill the gap.

---

## 1. Prerequisites — the attached designs, and where they must live

Antigravity cannot see your Stitch project. Export every screen before writing a
single prompt.

For each of the 15 screens, download two files:

```
.stitch/designs/{slug}.html    ← the generated markup
.stitch/designs/{slug}.png     ← the screenshot, full resolution
```

Two things that will bite you if you skip them:

- **Request the screenshot at full width.** Google's CDN serves a low-resolution
  thumbnail by default. Append `=w{width}` to the screenshot URL, using the
  screen's own `width` value, or the agent will build from a blurry reference.
- **The HTML `<head>` contains a `tailwind.config` object.** That is the
  authoritative token source — colors, fonts, spacing, radii, as Stitch actually
  rendered them. Prompt 2 extracts from it. Do not hand-copy tokens from
  `DESIGN.md` instead; if Stitch drifted from the spec, the exported config is
  what the screenshots actually show.

Slugs, matching the routes built later:

```
home  how-it-works  pricing  integrations  coverage  about  track
quote  help  contact  signin  signup  terms  privacy  prohibited-items
```

That is **30 attached files — 15 HTML and 15 PNG.** Confirm all 30 exist before
prompt 1. A missing pair means that screen gets designed by an agent instead of
by you, which is exactly what this pipeline exists to prevent.

### Anti-patterns — these are how the attachment gets ignored in practice

- ❌ Building a screen from the PNG alone. You lose the token values and the
  real DOM structure.
- ❌ Building a screen from the HTML alone. You lose the visual intent — Stitch
  markup does not read the way it renders.
- ❌ Building a screen from `DESIGN.md` because it is easier to read than the
  export. The spec is what was *asked for*; the export is what was *made*.
- ❌ Letting the agent generate a placeholder image, illustration or mockup
  where an attached design already exists.
- ❌ Letting the agent "improve" spacing, hierarchy or section order because it
  judges the attached design suboptimal.
- ❌ Editing, regenerating or reformatting anything inside `.stitch/designs/`.

---

## 2. Target stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | 15 mostly-static pages whose entire commercial value is organic search — "ship to Germany", "customs duties Etsy". Needs SSG, per-route metadata, and clean URLs. |
| Styling | **Tailwind CSS** | Stitch already emits Tailwind. Keeping it means the exported markup transfers with edits, not a rewrite. |
| Components | **shadcn/ui**, selectively | Accessible primitives for dialog, select, accordion, tabs. Do not adopt its default theme — restyle to the tokens. |
| Forms | **react-hook-form + zod** | The quote form is the conversion path; it needs blur validation and typed schemas. |
| Icons | **lucide-react** | Consistent stroke weight. Never emoji. |
| Hosting | **Vercel** or **Firebase Hosting** | Firebase can be driven from inside Antigravity via its MCP. |

**One deviation to be aware of:** the `stitch-build:react-components` skill
targets Vite, not Next.js. Its architectural rules are used throughout this file,
but its scripts assume a Vite layout. Choose Vite instead if you want that skill's
tooling verbatim — you lose SSG and per-page metadata, which for this site is a
bad trade.

---

## 3. Context files — create these before prompting

Antigravity reads both on every task. They are what stop the agent from
reinventing conventions each session.

### 3a. `GEMINI.md` (project root)

````markdown
# GEMINI.md — Shipmart

## Project
Marketing and self-service website for Shipmart, a cross-border parcel service
for eCommerce merchants. 15 pages.

## THE DESIGNS ARE ALREADY DONE AND ATTACHED — READ THIS FIRST
Every screen exists as two attached files in `.stitch/designs/`:
- `{slug}.html` — the exported markup, with the authoritative `tailwind.config`
  in its `<head>`, the real class names and the real DOM structure
- `{slug}.png` — the screenshot of how that screen actually renders

You are not designing this site. It is designed. You are converting attached
designs into a maintainable Next.js application.

Before you write a single line of code for a screen, you MUST open BOTH files
for that screen. Not one. Both. The PNG carries the visual intent; the HTML
carries the tokens and structure. If you have not opened both, you are not
ready to build that screen.

Do not improve, modernise, simplify, reinterpret or "clean up" any design. If
something in a design looks wrong to you, build it as designed and raise it in
your walkthrough — do not silently change it.

If a screen's HTML or PNG is missing, STOP and ask. Never invent a design to
fill a gap.

## Stack
- Next.js (App Router) + TypeScript, strict mode
- Tailwind CSS, tokens only — no arbitrary hex values in components
- shadcn/ui for accessible primitives, restyled to our tokens
- react-hook-form + zod for all forms
- lucide-react for icons

## File structure
app/
  layout.tsx            # root layout, header + footer
  page.tsx              # home
  how-it-works/page.tsx
  pricing/page.tsx
  integrations/page.tsx
  coverage/page.tsx
  about/page.tsx
  track/page.tsx
  quote/page.tsx
  help/page.tsx
  contact/page.tsx
  (auth)/signin/page.tsx
  (auth)/signup/page.tsx
  legal/terms/page.tsx
  legal/privacy/page.tsx
  legal/prohibited-items/page.tsx
components/
  layout/               # SiteHeader, SiteFooter, Container, Section
  ui/                   # Button, Card, Input, Badge, Table, Accordion
  marketing/            # Hero, PillarGrid, StepTimeline, StatBand, CtaBand
  product/              # RateEstimator, TrackingTimeline, StatusBadge, LaneTable
hooks/                  # useRateEstimate, useTracking, useFilter
lib/                    # utils, validation schemas, formatters
data/                   # all static copy, lists, and mock data
.stitch/designs/        # source designs — READ ONLY, never edit

## Rules for the agent
- Open BOTH `.stitch/designs/{slug}.png` and `.stitch/designs/{slug}.html`
  before building any screen. Build to the attached design, never to your own
  idea of the layout.
- Never edit, move, delete or regenerate anything inside `.stitch/designs/`.
  Those are attached source designs and are read-only.
- Never generate an image, illustration or mockup to stand in for an attached
  design. The designs exist; use them.
- Every component file exports a `Readonly` TypeScript interface named
  `{ComponentName}Props`. No exceptions, including page-level components.
- Every reusable pattern becomes its own component file. Monolithic page files
  are prohibited.
- All static text, lists, and image URLs live in `data/`. No hardcoded copy
  inside components.
- Event handlers and business logic go in `hooks/`, not inline in JSX.
- Use theme tokens from `tailwind.config.ts`. Arbitrary hex values in components
  will be rejected.
- Stitch exports use `href="#"` placeholders. Replace every one with a Next.js
  `<Link>` pointing at the real route. The wordmark always links to `/`.
- Follow `brand-guidelines.md` for every visual decision.
- One feature per task. Do not refactor files outside the stated scope.
````

### 3b. `brand-guidelines.md` (project root)

````markdown
# brand-guidelines.md — Shipmart

## Colors
- Signal Blue `#0052FF` — the single action color. Primary buttons, links,
  active states, focus rings. Never a large decorative wash.
- Midnight Harbour `#0B1327` — body text on light surfaces; background of dark
  inversion sections.
- Transit Teal `#00D2C6` — data visualisation, route lines, in-motion states.
  NEVER text on a light background: it measures 1.90:1 and fails WCAG. Fill and
  stroke only, or text on Midnight Harbour where it measures 9.71:1.
- Manifest Purple `#8A2BE2` — illustration gradients and chart series only.
  Never a button.
- Dock Grey `#F4F6F8` — alternating section background, resting card surface.
- White `#FFFFFF` — primary surface; text on Midnight Harbour.
- Slate Muted `#556074` — secondary text, captions, helper text.
- Hairline `#E2E8F0` — decorative dividers ONLY. At 1.23:1 it is invisible as a
  control boundary — never use it as an input border.
- Control Border `#7E8899` — input, select and checkbox borders. 3.58:1.
- Sky Blue `#6BA3FF` — replaces Signal Blue for links and buttons on dark
  sections, where Signal Blue fails at 3.21:1.
- Status: Cleared `#067A4E` text on `#10B981` fill · Held `#B45309` on `#F59E0B`
  · Exception `#B91C1C` on `#DC2626`.

## Typography
- Headlines: Plus Jakarta Sans. 800 for page headlines, 700 for section heads.
  Line-height 1.05–1.15, letter-spacing about -0.02em.
- Body and labels: Inter. 400 body at 1.6, 500 data labels, 600 buttons.
  Body never below 16px.
- Tabular numerals on every changing figure: rates, weights, transit days,
  prices, tracking numbers. Use `font-variant-numeric: tabular-nums`.

## Shape and depth
- 8px radius on buttons, cards, inputs.
- Cards: white surface, hairline stroke, no shadow or a whisper-soft one.
  Depth comes from strokes and background alternation, never stacked shadows.
- Status badges: pill-shaped, tinted fill, matching dark text, and ALWAYS a
  word. Status is never communicated by color alone.

## Layout and motion
- 12-column grid, 8px base unit, spacing scale 8/16/24/32/48/64/96/128.
- Section padding 96–128px desktop, 64px mobile. The site breathes.
- Max content width ~1200px; prose capped near 65 characters.
- Asymmetric by default; centring reserved for the closing CTA.
- Breakpoints 375 / 768 / 1024 / 1440.
- Motion 150–300ms ease-out. Respect `prefers-reduced-motion`.

## Non-negotiables
- SVG icons only. Never emoji as icons.
- Interface over photography. No stock photos of boxes, planes or warehouses.
- Every input has a permanently visible label. Placeholder-only is prohibited.
- Tables scroll inside their own container. The page body never scrolls sideways.
````

---

## 4. Prompt sequence

Run these in order, one at a time, in **Review-driven mode** — never Turbo.
Commit after each. Read the implementation plan before accepting; never
"Accept All" blind.

**Model routing:** Gemini 3.1 Pro for prompts 1, 2, 4 and 9 (architecture and
state). Gemini 3 Flash for the rest (layout transcription is not hard reasoning).
This matters — the free tier is roughly 20 requests a day.

---

### Prompt 1 — Scaffold

```
CONTEXT:
New empty repository for Shipmart, a cross-border parcel shipping website.
Design exports already exist in .stitch/designs/ (15 .html + 15 .png files).

TASK:
Scaffold a Next.js App Router project with TypeScript strict mode, Tailwind CSS,
ESLint and Prettier. Create the empty folder structure described in GEMINI.md.
Do not build any pages or components yet.

FILES TO TOUCH:
@package.json, @tsconfig.json, @tailwind.config.ts, @next.config.ts,
@app/layout.tsx, @app/page.tsx, @.eslintrc.json, @.prettierrc

FILES TO LEAVE ALONE:
@.stitch/designs/ — read-only source designs, never modify

RULES:
- Next.js App Router, not Pages Router
- TypeScript strict: true
- Follow the file structure in GEMINI.md exactly
- Placeholder home page only — a heading, nothing else

EXPECTED OUTPUT:
`npm run dev` starts without errors and serves a blank page at localhost:3000.
`npm run build` and `npx tsc --noEmit` both pass. The folder structure matches
GEMINI.md, with empty directories committed via .gitkeep.
```

---

### Prompt 2 — Design tokens

```
CONTEXT:
Scaffold is in place. The Stitch exports in .stitch/designs/*.html each contain
a `tailwind.config` object inside a <script> tag in the <head>. That object is
the authoritative token set.

TASK:
Extract the design tokens from the Stitch exports and wire them into the project
as the single source of styling truth.

FILES TO TOUCH:
@tailwind.config.ts — colors, fontFamily, spacing scale, borderRadius
@app/globals.css — CSS custom properties, base typography, font loading
@app/layout.tsx — load Plus Jakarta Sans and Inter via next/font

FILES TO LEAVE ALONE:
@.stitch/designs/

RULES:
- Read the tailwind.config from @.stitch/designs/home.html and cross-check
  against two other exports for consistency
- Name tokens semantically, not by appearance: `action`, `ink`, `surface`,
  `surface-alt`, `muted`, `hairline`, `control-border`, `accent-transit`,
  `accent-manifest`, `on-dark-action`, plus status-cleared / held / exception
- Where the Stitch export disagrees with brand-guidelines.md, follow the
  Stitch export and list every discrepancy in your walkthrough
- Load fonts with next/font, not a CDN link
- Set font-variant-numeric: tabular-nums on a `.tabular` utility class

EXPECTED OUTPUT:
A test page using `bg-surface text-ink border-hairline` renders the correct
colors. `npx tsc --noEmit` passes. Your walkthrough lists every token, its hex
value, and any place the Stitch export differed from brand-guidelines.md.
```

---

### Prompt 3 — App shell

```
CONTEXT:
Tokens are wired. Every one of the 15 pages shares a header and footer. Both are
already designed and attached: @.stitch/designs/home.png shows how they render,
@.stitch/designs/home.html contains the exact markup Stitch produced for them.

TASK:
Build the site shell: header, footer, and the layout primitives every page uses.

FILES TO TOUCH:
@components/layout/SiteHeader.tsx
@components/layout/SiteFooter.tsx
@components/layout/Container.tsx
@components/layout/Section.tsx
@app/layout.tsx — mount header and footer
@data/navigation.ts — all nav and footer link data

FILES TO LEAVE ALONE:
@.stitch/designs/, @tailwind.config.ts

RULES:
- Open BOTH @.stitch/designs/home.png and @.stitch/designs/home.html before
  building. Lift the header and footer structure from the attached HTML; match
  the attached screenshot. Do not design your own
- Header: sticky, wordmark left linking to /, four centre links, then a "Track a
  parcel" text link, a secondary "Sign in" button, a primary "Get a quote" button
- Below 1024px the centre links collapse into a hamburger; the primary button
  stays visible in the bar
- Footer: four columns on a dark background, then a divider, then copyright left
  and lower-case text-links (x, linkedin, instagram) right. Text links, not icons
- On the dark footer use the on-dark action color, never the light-surface one
- All link data comes from @data/navigation.ts — nothing hardcoded in JSX
- Every component exports a Readonly {Name}Props interface
- The mobile menu traps focus, closes on Escape, and returns focus to its trigger

EXPECTED OUTPUT:
Header and footer render on every route. At 375px the hamburger opens a menu
that is keyboard-navigable, Escape-closable, and returns focus correctly. At
1440px the full nav shows. Every link resolves to a real route with no 404s.
Tab order runs left to right with a visible focus ring throughout.
```

---

### Prompt 4 — UI primitives

```
CONTEXT:
Shell is built. Before any page work, the shared vocabulary needs to exist so
pages compose rather than duplicate. Every primitive already appears somewhere
in the attached designs — buttons and cards in @.stitch/designs/home.html,
inputs and selects in @.stitch/designs/quote.html, badges in
@.stitch/designs/track.html, tables in @.stitch/designs/coverage.html,
accordions in @.stitch/designs/pricing.html.

TASK:
Build the reusable UI primitives, styled to our tokens. No page work in this task.

FILES TO TOUCH:
@components/ui/Button.tsx      — primary, secondary, ghost; sm/md/lg; loading state
@components/ui/Card.tsx
@components/ui/Input.tsx       — always-visible label, helper text, error slot
@components/ui/Select.tsx
@components/ui/Badge.tsx       — status variants, each with a required text label
@components/ui/Table.tsx       — wrapper with its own horizontal overflow
@components/ui/Accordion.tsx
@components/ui/Eyebrow.tsx

FILES TO LEAVE ALONE:
@app/, @.stitch/designs/

RULES:
- Open the attached HTML files listed above and take each primitive's real
  structure, sizing and states from them. Do not invent a component API that the
  attached designs do not support
- Install shadcn/ui primitives for Accordion and Select, then restyle to tokens.
  Build the rest directly
- Input uses the control-border token, never hairline. Label is a real <label>
  with htmlFor — placeholder-only labelling is prohibited
- Badge requires a `label` string prop. A badge cannot render color alone
- Button minimum hit target 44x44px; visible focus ring; 200ms transitions
- Table wrapper carries overflow-x-auto so wide tables scroll inside themselves
- Every component exports a Readonly {Name}Props interface
- No arbitrary hex values anywhere

EXPECTED OUTPUT:
A temporary /kitchen-sink route renders every primitive in every variant and
state, including disabled, loading, and error. Keyboard tab reaches all of them
with a visible ring. Every input has a clickable label. Delete the route after
review.
```

---

### Prompt 5 — Home page

```
CONTEXT:
Shell and primitives exist. The home page is the primary conversion page and has
nine sections. It is already designed and attached — @.stitch/designs/home.png
is how it must look, @.stitch/designs/home.html is how Stitch built it. Open
both before you start.

TASK:
Build the home page and the marketing section components it introduces.

FILES TO TOUCH:
@app/page.tsx
@components/marketing/Hero.tsx
@components/marketing/TrustStrip.tsx
@components/marketing/PillarGrid.tsx
@components/marketing/NarrativeExplainer.tsx
@components/marketing/StepTimeline.tsx
@components/marketing/StatBand.tsx
@components/marketing/NetworkSection.tsx
@components/marketing/CtaBand.tsx
@data/home.ts

FILES TO LEAVE ALONE:
@components/layout/, @components/ui/, @.stitch/designs/

RULES:
- Open both attached files first and build to them. The section order, spacing,
  hierarchy and copy are already decided there — transcribe, do not redesign
- Section order: hero, trust strip, three-pillar grid, narrative explainer,
  three-step timeline, dark problem band, network section, macro closing block
- Pillar titles are lower-case: quote / clear / track
- The hero visual is a vector interface panel showing a landed-cost breakdown —
  build it as markup, not an image. No stock photography anywhere
- StatBand sits on a dark background: use the on-dark action token
- All copy lives in @data/home.ts
- Any figure still marked [[placeholder]] renders as a visible TODO in
  development and throws a build error in production — never ship a fake number
- Sections fade in on first scroll, 150-300ms, disabled under prefers-reduced-motion

EXPECTED OUTPUT:
/ renders all nine sections in order, matching home.png. At 375/768/1024/1440
there is no horizontal body scroll. Both CTAs route to /quote. Lighthouse
accessibility scores 95+. With prefers-reduced-motion enabled, no section
animates. `npm run build` succeeds.
```

---

### Prompt 6 — Marketing pages

Run **once per page**, substituting from the table. Do not batch them — one
feature per prompt is the rule that keeps the agent from rewriting neighbours.

```
CONTEXT:
Shell, primitives and home page are built. Building the {PAGE NAME} page. It is
already designed and attached: @.stitch/designs/{slug}.png is how it must look,
@.stitch/designs/{slug}.html is how Stitch built it. Open both before you start.

TASK:
Build the {PAGE NAME} page at route {ROUTE}, extracting any new reusable
pattern into its own component.

FILES TO TOUCH:
@app/{route}/page.tsx
@data/{slug}.ts
{NEW COMPONENTS}

FILES TO LEAVE ALONE:
@app/page.tsx, @components/layout/, @.stitch/designs/

RULES:
- Open both attached files first and build to them. Do not redesign, simplify or
  reorder anything the attached design already decided
- Reuse existing components from @components/ui/ and @components/marketing/
  before creating anything new
- All copy in @data/{slug}.ts
- Tables use the Table wrapper so they scroll inside themselves
- Per-route metadata export with title and description
- [[placeholders]] render as visible TODOs in dev, build errors in production

EXPECTED OUTPUT:
{ROUTE} renders matching {slug}.png at all four breakpoints with no horizontal
body scroll. All internal links resolve. Text contrast is at least 4.5:1
throughout. `npx tsc --noEmit` passes.
```

| Page | Route | New components |
|---|---|---|
| How it works | `/how-it-works` | `StageBlock`, `AnchorNav`, `ComparisonTable`, `EdgeCaseGrid` |
| Pricing & rates | `/pricing` | `PlanCard`, `FeatureMatrix`, `FeeList` — estimator comes in prompt 8 |
| Integrations | `/integrations` | `IntegrationCard`, `FilterChips`, `CodeBlock` |
| Coverage | `/coverage` | `LaneLookup`, `RegionAccordion`, `LaneTable`, `SchematicMap` |
| About | `/about` | `MissionBlock`, `ValueGrid`, `TeamGrid`, `NumbersBand` |
| Help centre | `/help` | `SearchHero`, `CategoryGrid`, `ArticleList` |
| Contact | `/contact` | `ChannelCard`, `ContactForm`, `OfficeCard` |

---

### Prompt 7 — Track a parcel

```
CONTEXT:
Marketing pages are built. Track is a public utility page used mostly by
recipients on phones, often when a parcel is late. It has five distinct states.
The design is attached: @.stitch/designs/track.png and
@.stitch/designs/track.html. Open both before you start. The attached design
shows one state — derive the other four from it by keeping the same layout,
components and spacing, changing only content and status.

TASK:
Build the tracking page with all states, wired to a mock data layer.

FILES TO TOUCH:
@app/track/page.tsx
@components/product/TrackingInput.tsx
@components/product/StatusSummaryCard.tsx
@components/product/TrackingTimeline.tsx
@components/product/CustomsPanel.tsx
@components/product/ExceptionPanel.tsx
@hooks/useTracking.ts
@data/mockTracking.ts

FILES TO LEAVE ALONE:
@app/quote/, @components/marketing/, @.stitch/designs/

RULES:
- Open both attached track files first. Every state you build must be visually
  consistent with the attached design — same shell, same card, same timeline
- Mobile-first. The input occupies the first screen on a 375px viewport
- Five states, all built: in transit, held at customs, delivered, exception,
  not found
- Every status shows a WORD, never color alone. Badge requires a label
- The customs panel reads as an instruction, not an error — say what is needed
  and who must act
- Not-found explains both likely causes (mistyped number, label created but not
  yet scanned) and invites a retry. Never a bare "not found"
- Mock data in @data/mockTracking.ts keyed by tracking number so each state is
  reachable by typing a known test value. Document those values in the walkthrough
- Timeline is a semantic <ol>; completed steps carry aria-current appropriately

EXPECTED OUTPUT:
Each of the five states is reachable via a documented test tracking number. At
375px the page is usable one-handed with no horizontal scroll. A screen reader
announces status as text, not color. Timeline is keyboard-navigable. Delivered
and exception states are visually distinct in greyscale.
```

---

### Prompt 8 — Quote form and rate estimator

```
CONTEXT:
This is the primary conversion path. It appears twice: the full page at /quote
and an embedded estimator on /pricing. Both designs are attached —
@.stitch/designs/quote.png and @.stitch/designs/quote.html for the full page,
@.stitch/designs/pricing.png and @.stitch/designs/pricing.html for the embedded
version. Open all four before you start.

TASK:
Build the quote form with live cost summary as one shared component used in
both places.

FILES TO TOUCH:
@app/quote/page.tsx
@components/product/RateEstimator.tsx
@components/product/CostSummaryPanel.tsx
@components/product/ServiceLevelCards.tsx
@hooks/useRateEstimate.ts
@lib/schemas/quote.ts
@data/mockRates.ts
@app/pricing/page.tsx — mount the estimator only, change nothing else

FILES TO LEAVE ALONE:
@app/track/, @components/marketing/, @.stitch/designs/

RULES:
- Open the attached quote and pricing files first. Field order, grouping and the
  summary panel layout are already decided there — transcribe them
- react-hook-form with a zod schema in @lib/schemas/quote.ts
- Validate on blur, never submit-only
- Errors render directly beneath the offending field, in words, with a fix.
  Never a summary block at the top
- Every field has a permanently visible <label>. Placeholder-only is prohibited
- Three steps: route, parcel, service. Contact capture comes LAST, after value
  has been shown
- Summary panel is sticky on desktop, updates live, and shows a helpful empty
  state listing what is still needed before any input exists
- Submit shows a loading state and resolves to an explicit success panel with a
  reference number, or an error message. Never a silent submit
- Money and weight use tabular numerals
- Rate calculation is mocked in @data/mockRates.ts behind the hook, so a real
  API can replace it without touching components

EXPECTED OUTPUT:
Blurring an invalid field shows an inline error beneath it. The summary updates
as fields complete. Submitting shows loading, then a success panel with a
reference. The same estimator renders correctly inside /pricing. Every input is
reachable by keyboard with a visible focus ring and a clickable label.
`npx tsc --noEmit` passes.
```

---

### Prompt 9 — Auth pages

```
CONTEXT:
Sign in and create account share a split layout: form left, brand panel right,
no global header. Both designs are attached — @.stitch/designs/signin.png,
@.stitch/designs/signin.html, @.stitch/designs/signup.png and
@.stitch/designs/signup.html. Open all four before you start.

TASK:
Build both auth pages with a shared layout. Forms validate and show states but
do not connect to a backend yet.

FILES TO TOUCH:
@app/(auth)/layout.tsx
@app/(auth)/signin/page.tsx
@app/(auth)/signup/page.tsx
@components/auth/AuthSplitLayout.tsx
@components/auth/PasswordField.tsx
@lib/schemas/auth.ts

FILES TO LEAVE ALONE:
@app/layout.tsx, @components/layout/SiteHeader.tsx, @.stitch/designs/

RULES:
- Open all four attached auth files first and build the split layout exactly as
  designed. The brand panel content comes from the attached design, not from you
- Route group (auth) so these bypass the global header. Wordmark sits above the
  form and links to /
- PasswordField has a show/hide toggle with a correct aria-label and, on signup,
  a live strength indicator with the requirements stated as text
- Failed sign-in shows ONE message above the form that does not reveal which
  field was wrong
- The signup consent checkbox is never pre-checked; terms and privacy are inline
  links
- Signup resolves to a verify-your-email panel showing the address entered, so a
  typo is visible, with a resend option

EXPECTED OUTPUT:
Both routes render without the global header. Password toggle works and is
announced correctly. Invalid signin shows a non-enumerating error. Signup with
an unchecked consent box blocks submission with an inline explanation. Both are
fully keyboard-navigable.
```

---

### Prompt 10 — Legal pages

```
CONTEXT:
Three legal documents share one reading layout: sticky table of contents left,
body right. Prohibited items additionally has interactive lookup and tables.
All three designs are attached: @.stitch/designs/terms.png + terms.html,
@.stitch/designs/privacy.png + privacy.html, and
@.stitch/designs/prohibited-items.png + prohibited-items.html. Open them before
you start.

TASK:
Build the shared document layout and all three legal pages.

FILES TO TOUCH:
@app/legal/layout.tsx
@app/legal/terms/page.tsx
@app/legal/privacy/page.tsx
@app/legal/prohibited-items/page.tsx
@components/legal/DocumentToc.tsx
@components/legal/SummaryCallout.tsx
@components/legal/ItemLookup.tsx
@data/legal/*.ts

FILES TO LEAVE ALONE:
@app/page.tsx, @components/marketing/, @.stitch/designs/

RULES:
- Open the attached legal design files first and take the reading layout,
  TOC placement and callout styling from them
- TOC is sticky, generated from headings, highlights the active section on scroll
  via IntersectionObserver, and is keyboard-navigable
- Body capped near 65 characters. Headings carry stable anchor ids for deep links
- SummaryCallout is explicitly labelled as a plain-language summary that does not
  replace the clause
- Prohibited items: lookup states the outcome in WORDS — allowed, restricted,
  prohibited — never color alone
- Legal body copy stays as clearly marked placeholder text. Do not invent legal
  language

EXPECTED OUTPUT:
All three routes render with a working sticky TOC that tracks scroll position.
Deep links to a heading scroll correctly. Prohibited-items lookup returns all
three outcome types for documented test inputs. Tables scroll inside themselves
at 375px.
```

---

### Prompt 11 — SEO and metadata

```
CONTEXT:
All 15 routes are built. This site's commercial value is organic search.

TASK:
Add complete metadata, structured data, sitemap and robots handling.

FILES TO TOUCH:
@app/**/page.tsx — metadata export on each route
@app/sitemap.ts
@app/robots.ts
@app/opengraph-image.tsx
@lib/seo.ts

FILES TO LEAVE ALONE:
@components/, @.stitch/designs/

RULES:
- Unique title and description per route. No duplicates
- Open Graph and Twitter card metadata site-wide
- JSON-LD: Organization on home, FAQPage on pricing and help, BreadcrumbList on
  nested routes
- Sitemap generated from the route list, not hand-written
- Canonical URLs on every page
- Exactly one h1 per page, with a correct heading hierarchy below it

EXPECTED OUTPUT:
/sitemap.xml lists all 15 routes. /robots.txt resolves. Every page has a unique
title and description. JSON-LD validates. No page has more than one h1 or skips
a heading level.
```

---

### Prompt 12 — Accessibility and responsive audit

```
CONTEXT:
The site is feature-complete. This is the quality gate before deployment.

TASK:
Audit every route against the accessibility and responsive bar, and fix what
fails. Do not add features.

FILES TO TOUCH:
Any file with a defect found during the audit.

FILES TO LEAVE ALONE:
@.stitch/designs/, @data/ unless copy is itself the defect

RULES:
- Fidelity check first: for every route, open the attached
  @.stitch/designs/{slug}.png and compare it side by side with a browser-agent
  screenshot of the built page at the same width. Report every place the build
  diverges from the attached design, and fix it unless the divergence is an
  accessibility fix — in which case say so explicitly
- Test every route at 375, 768, 1024 and 1440
- Verify: text contrast at least 4.5:1 · visible focus on every interactive
  element · hit targets at least 44x44px with 8px separation · every input has a
  visible label · no status conveyed by color alone · no horizontal body scroll ·
  prefers-reduced-motion respected · all images have alt text · tables scroll
  inside their own container
- Use the browser agent to capture a screenshot of each route at each breakpoint
- Report each defect with its route, breakpoint, and fix

EXPECTED OUTPUT:
A side-by-side fidelity table of all 15 routes: attached design screenshot
against built page screenshot, with any divergence named and explained. A table
of every route against every accessibility check, all passing. Lighthouse
accessibility 95+ on all 15 routes. Screenshots at all four breakpoints stored
in Artifacts. Keyboard-only traversal of the full site with no trap and no
invisible focus.
```

---

## 5. Verification protocol

Antigravity's browser agent is the reason to use it over a plain chat model —
it clicks through and produces evidence. Use it.

After every prompt:

1. **Read the implementation plan before accepting.** Reject anything touching
   files outside the stated scope.
2. **Read the Walkthrough.** It states what the agent believes it did. Discrepancies
   against the expected output are where bugs hide.
3. **Check the Artifacts.** Screenshots and recordings are the proof. A claim of
   "responsive at all breakpoints" without screenshots at all breakpoints is unverified.
4. **Commit.** One commit per prompt, so a bad generation reverts cleanly.

Standing instruction worth pasting into any prompt where you want visual proof:

> Use the browser agent to verify. Capture a screenshot at 375, 768, 1024 and
> 1440 and attach them to Artifacts. Report any breakpoint where the layout
> breaks rather than declaring success.

---

## 6. Deployment

**Firebase, from inside Antigravity** — install the Firebase MCP, then prompt
"Deploy this app to Firebase Hosting." The agent builds, configures hosting and
returns a live URL.

**Vercel** — commit to GitHub with the built-in Git tools, import the repo in
Vercel, enable automatic deployments. Better fit for Next.js: ISR, image
optimisation and edge middleware work without configuration.

Before either, confirm: `npm run build` passes clean · no `[[placeholder]]`
survives in production copy · environment variables are set for whatever the
quote and tracking endpoints eventually call · the 404 page exists and carries
the site shell.

---

## 7. Using AI Studio instead

AI Studio is browser-based prompt-to-app, better for prototyping than for a
15-page production build. If you start there:

- The prompt bodies above transfer, but **`@file` references do not** — AI Studio
  has no local filesystem. Paste the relevant Stitch HTML inline instead.
- There is no browser agent, so §5 verification must be done by hand.
- Build one page per project and stitch them together later, or accept a
  single-page prototype.
- **Projects hand off to Antigravity with history preserved.** The reasonable
  path is: prototype the home page in AI Studio to validate direction, then move
  to Antigravity for the remaining 14 and the real architecture.

---

## 8. Guardrails

| Risk | Mitigation |
|---|---|
| Agent rewrites neighbouring files | Every prompt names FILES TO LEAVE ALONE. Commit before each task. |
| Destructive terminal commands | Review-driven mode always. Never Turbo on this project. |
| Hallucination from too much context | Narrow `@file` references only. Never paste the whole codebase. |
| Design drift across pages | Tokens come from the Stitch export once, in prompt 2. Pages consume tokens, never raw hex. |
| Agent designs instead of transcribing | Every page prompt names both attached files and requires opening both. Prompt 12 runs a side-by-side fidelity check against the attached PNGs. |
| Agent generates images to fill gaps | `GEMINI.md` forbids it outright. Antigravity has an image model built in and will use it unprompted if a visual seems missing. |
| Placeholder stats reaching production | `[[placeholders]]` throw at build time in production. Do not weaken this. |
| Quota exhaustion mid-build | Flash for layout transcription, Pro for prompts 1, 2, 4, 9. Free tier is ~20 requests/day. |
| Stitch exports drift from DESIGN.md | The export wins — it is what the screenshots show. Prompt 2 logs every discrepancy. |

---

## 9. What is deliberately not here

- **Backend.** Quote rates and tracking are mocked behind hooks, so real
  endpoints drop in without touching components. Auth has no provider wired.
- **Real legal copy.** Layout only. The text needs a lawyer.
- **Real content.** Every `[[placeholder]]` is an unverified fact — country
  counts, statistics, integration names, team members, prices. Replace or remove
  them before launch.
- **A CMS.** Copy lives in `data/`. If marketing needs to edit without a deploy,
  that is a later migration.
