# Shipmart — Stitch paste-ready prompts

Header and footer text is already inlined in every prompt. Nothing here contains
colors, fonts, or hex codes — those belong in the project theme, set once.

## Step 1 — set the project theme (once)

| Setting | Value |
|---|---|
| Color mode | Light |
| Primary / brand color | `#0052FF` |
| Secondary | `#00D2C6` |
| Tertiary | `#8A2BE2` |
| Neutral | `#0B1327` |
| Headline font | Plus Jakarta Sans |
| Body font | Inter |
| Roundness | 8px |

## Step 2 — generate one screen per prompt below

Create a new screen, paste one block, generate. Do not paste more than one block
at a time, and do not paste this file's Step 1 table into a prompt.

Replace every `[[placeholder]]` with a verified fact, or delete the element
around it, before generating.


---

## B1 — Home

```text

**Overall Purpose**: The primary conversion page for Shipmart, a cross-border parcel service for eCommerce merchants. A visitor arrives unsure whether international shipping is worth the customs risk, and should leave convinced that Shipmart removes the unpredictability and that getting a quote costs them nothing. The page should feel spacious, engineered, and calm.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.

2. **Hero Section**: Asymmetric split. Left column: large headline "Every border, handled." Sub-headline, two sentences: "Print one label and we take it from there — customs cleared, duties paid, delivered to the door. Your customer never sees a surprise bill." Primary call-to-action button "Get a quote" with a secondary text link "See how it works" beside it. Beneath the buttons, a single line of small reassurance text: "No monthly fee. No volume minimum." Right column: **not a photograph** — a crisp vector interface panel showing a landed-cost breakdown for a sample parcel, itemised as shipping, duties, taxes, and handling, resolving to one total, with a small route line from origin to destination above it.

3. **Trust Strip**: A slim full-width band directly below the hero. Left: the line "Trusted by [[N]] merchants shipping to [[N]] countries." Right: a horizontal row of [[partner or carrier]] logos in a single muted weight. Keep this to one line — it is a reassurance, not a section.

4. **Three-Pillar Value Grid**: Three equal columns, each a card with a small vector interface thumbnail, a **lower-case** action title, and two lines of body copy.
   - **quote** — "See the true landed cost before you commit. Shipping, duties, and taxes in one figure, per destination."
   - **clear** — "We handle the customs paperwork, the HS codes, and the duties. You print one label."
   - **track** — "One tracking link that keeps working across carriers and borders, for you and your customer."

5. **Narrative Explainer — "How it works"**: Staggered, presentation-like typography with generous space between statements. A section headline "Shipping across a border is three problems, not one." Then three staggered statement-and-answer pairs, each answering a friction question directly: "Who fills in the customs forms?" · "What happens if a parcel is held?" · "Who pays if the duties are wrong?" Each answer is one short paragraph. Ends with a text link "Read the full process".

6. **Linear 3-Step Process**: A horizontal timeline of three numbered steps, anchored by a vector app-interface mockup showing a shipments list with statuses.
   - **Step 1 — Connect your store.** "Link your storefront or upload a CSV. Your orders appear ready to quote." Inline secondary button: "See integrations".
   - **Step 2 — Print one label.** "We pick the lane, generate the customs documents, and prepay the duties."
   - **Step 3 — Watch it land.** "You and your customer follow the same tracking link until it is delivered."

7. **The Problem Section**: A full-bleed dark inversion band, high contrast against everything above it. Section headline "Most cross-border parcels do not fail in the air. They fail at the border." Three large data points displayed as oversized figures with short captions beneath — [[stat about customs delays]], [[stat about surprise duty refusals]], [[stat about cross-border return rates]]. Beneath them a single line of body copy connecting the statistics to the merchant's own risk. **Every figure in this section is a placeholder and must be replaced with a sourced statistic or the section cut.**

8. **Network & Vision Section**: Returns to a light background. Headline "A network, not a courier." Body copy explaining that Shipmart is a growing network of carriers, customs brokers, and clearance lanes, and that each new lane makes every merchant's rates better. Accompanied by an abstract vector network diagram of routes between regions — schematic, not a literal globe or world map.

9. **Macro Closing Block**: Full-bleed dark, heavily padded, centred. A very large typographic headline "Ready to ship past the border?" One line of sub-copy: "Get a landed-cost quote for your next order in under a minute." A single large primary call-to-action button "Get a quote". Nothing else in this section.

10. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```


---

## B2 — How it works

```text

**Overall Purpose**: The considered explainer for a merchant who is interested but wants to understand the mechanics before quoting. Removes implementation anxiety by answering, in order, every question that stalls a cross-border decision.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Page Hero**: Contained width, left-aligned. Eyebrow "How it works". Headline "From your shelf to their door, in five moves." Sub-headline, one sentence, describing the end-to-end path.
3. **Anchor Navigation**: A sticky horizontal sub-navigation with five links matching the sections below — Connect, Quote, Label, Clear, Deliver — highlighting the active section as the reader scrolls.
4. **Five Detailed Stages**: Five alternating full-width blocks. Each has a stage number, a title, two short paragraphs, a bulleted list of exactly what Shipmart does versus what the merchant does, and a vector interface panel on the alternating side showing that stage in the product.
5. **Edge Cases Section**: A card grid titled "What happens when things go sideways." Cards for: parcel held at customs · address undeliverable · customer refuses duties · parcel lost in transit · customer returns the item. Each card states the outcome and who bears the cost in plain language.
6. **Comparison Table**: A table contrasting "Shipping it yourself", "A standard courier account", and "Shipmart" across rows: customs paperwork, duty prepayment, tracking continuity, returns handling, support contact. The table scrolls horizontally on narrow screens rather than breaking the layout.
7. **Inline Call-to-Action Band**: A contained band with the line "Still have a question about your category?" and two buttons: primary "Get a quote", secondary "Talk to support".
8. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```


---

## B3 — Pricing & rates

```text

**Overall Purpose**: Convert consideration into a quote by making cost legible. The merchant's real question is not "what is your price" but "what will this specific parcel cost me, all in" — the page must answer that.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Page Hero**: Headline "Landed cost, before you commit." Sub-headline explaining that quoted price includes shipping, duties, taxes, and handling with no month-end reconciliation.
3. **Inline Rate Estimator**: A prominent card sitting directly under the hero, functioning as the page's primary interactive element. Fields: origin country, destination country, parcel weight, dimensions, declared value, and category. Every field carries a visible label above it. A primary button "Estimate cost". Below it, a results area showing an itemised breakdown — shipping, duties, taxes, handling, total — with a note that the figure is an estimate until the order is created. Include an empty state before any input, with a short prompt rather than a blank panel.
4. **Plan Tiers**: Three plan cards side by side, the middle one visually emphasised as recommended. Each shows plan name, who it is for, the pricing basis, a feature list with check indicators, and a call-to-action button. Tiers: **Starter** (occasional shipper, pay per parcel), **Growth** (steady volume, discounted lanes), **Scale** (high volume, custom lanes and account management, CTA "Talk to sales"). All figures `[[placeholder]]`.
5. **What's Included Table**: A full-width table listing every capability down the left and check or dash marks per tier. Groups: shipping and lanes, customs and duties, tracking and notifications, returns, support, integrations.
6. **Fees & Surcharges**: An honest, plainly-worded section listing every charge that can appear — remote area surcharge, oversize, address correction, storage, return to sender. Presented as a definition list, not hidden in fine print. This section is a trust asset; it should not be minimised.
7. **Pricing FAQ**: An accordion of six to eight questions covering duty prepayment, currency and exchange rates, refunds on undelivered parcels, VAT/IOSS registration, invoicing, and cancellation.
8. **Closing Call-to-Action Band**: Centred, "Get an exact quote for a real order." Primary button "Get a quote".
9. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```


---

## B4 — Integrations

```text

**Overall Purpose**: Remove the technical objection. A merchant needs to see their own platform named before they will believe setup is easy.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Page Hero**: Headline "Connect your store in minutes." Sub-headline stating that orders sync automatically and labels return to the platform. A search input labelled "Find your platform".
3. **Category Filter Row**: Filter chips — All, Storefronts, Marketplaces, ERP & OMS, Automation, Custom. Selecting one filters the grid below.
4. **Integration Card Grid**: A responsive grid of integration cards, each with a logo area, platform name, one-line description, a status indicator (Available / Beta / Coming soon), and a "View setup guide" link. Cover `[[Shopify]]`, `[[WooCommerce]]`, `[[Etsy]]`, `[[Amazon]]`, `[[eBay]]`, `[[BigCommerce]]`, `[[Squarespace]]`, `[[Wix]]`, `[[Magento]]`, `[[Shipstation]]`, `[[Zapier]]`, and a final card for "Custom API". **Every platform name is a placeholder until a real integration exists — an unbuilt integration shown as Available is a false claim.**
5. **Setup Walkthrough**: A three-step horizontal explainer — authorise, map your catalogue, enable auto-quote — anchored by a vector panel of the connection screen.
6. **Developer Section**: A dark inversion band for the technical reader. Headline "Or build directly against the API." Short copy on REST endpoints, webhooks, and sandbox keys, with a code block showing a sample shipment-creation request, and two buttons: "Read the API docs" and "Get a sandbox key".
7. **Closing Call-to-Action Band**: "Not seeing your platform?" with a "Request an integration" button.
8. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```


---

## B5 — Destinations & coverage

```text

**Overall Purpose**: Answer "do you go where I need to go, how long does it take, and what are the rules there" in one page.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Page Hero**: Headline "Where Shipmart reaches." Sub-headline naming coverage in broad terms with a `[[country count]]` placeholder.
3. **Lane Lookup**: A prominent two-field lookup — ship from, ship to — with a "Check this lane" button. Results panel shows estimated transit window, available service levels, duty handling method, and any restrictions for that lane. Include a clear empty state.
4. **Regional Breakdown**: An accordion or tabbed section by region — North America, Europe, UK, Middle East & North Africa, Asia-Pacific, Latin America, Africa. Each region opens to a table of countries with columns for transit window, service levels, duty treatment, and a restrictions link. Tables scroll horizontally on small screens.
5. **Schematic Coverage Diagram**: An abstract vector diagram of lanes between regions with weight indicating traffic. Schematic and geometric — not a photographic globe.
6. **Customs Explainer Cards**: Three cards covering DDP versus DAP in plain language, de minimis thresholds and why they change the maths, and documentation required per region.
7. **Restrictions Callout**: A prominent band linking to the prohibited items page, with the line "Some goods cannot cross some borders. Check before you ship."
8. **Closing Call-to-Action Band**: "Get a quote for your lane." Primary button "Get a quote".
9. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```


---

## B6 — About

```text

**Overall Purpose**: Build institutional credibility. A merchant is about to hand over goods and customer relationships, and wants to know who is behind the label.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Page Hero**: Headline "We built Shipmart because the border kept winning." One paragraph of origin story. `[[Confirm the real founding story before generation — do not ship an invented one.]]`
3. **Mission Statement Block**: A large-type centred statement of purpose about making cross-border trade available to small merchants, with two short supporting paragraphs.
4. **Numbers Band**: A row of three or four oversized figures with captions — parcels delivered, lanes operated, countries reached, merchants served. All `[[placeholders]]`.
5. **Values Grid**: Three or four cards with lower-case titles and short bodies — clarity over jargon, no surprise costs, the network compounds, small merchants first.
6. **Team Section**: A responsive grid of team member cards with photo area, name, role, and a one-line bio. `[[Populate with real people or remove the section.]]`
7. **Investors or Partners Strip**: A single muted logo row. `[[Only include if real.]]`
8. **Careers Callout**: A band with a short line about hiring and a "See open roles" button.
9. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```


---

## B7 — Track a parcel

```text

**Overall Purpose**: A public utility page used far more by *recipients* than by merchants, frequently on a phone, often by an anxious person whose parcel is late. It must load fast, work one-handed, and say something clear even when the news is bad.

**PLATFORM:** Web, Mobile-first
**Also generate a DESKTOP variant.**

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar., reduced — wordmark and a single "Get a quote" button only.
2. **Tracking Input**: Occupies the first screen. A single large input labelled "Tracking number" with a primary button "Track". Below it, a text link "Where do I find my tracking number?" opening a short explanation.
3. **Status Summary Card**: After lookup, a prominent card showing the current status as a labelled badge with an accompanying word, the plain-language headline of what is happening, the estimated delivery window, and the destination city and country. **Status is stated in words, never by color alone.**
4. **Progress Timeline**: A vertical timeline of stages — collected, departed origin, in transit, arrived in destination country, customs clearance, out for delivery, delivered. Completed stages are marked, the current stage is emphasised, future stages are muted. Each entry carries a timestamp and location.
5. **Customs Status Panel**: Appears only when a parcel is held. States what is being asked for, who must act, and a clear button for the required action. This panel must not read as an error — it reads as an instruction.
6. **Exception State**: A distinct layout for failed delivery, return to sender, or lost parcel. Explains what happened, what happens next, and offers a "Contact support" button and a "File a claim" link.
7. **Not-Found State**: If the number is unrecognised, explain the two likely reasons — mistyped number, or a label created but not yet scanned — and invite a retry. Never a bare "not found".
8. **Notification Opt-In**: A small card offering email or SMS updates for this parcel, with a single input and a "Notify me" button.
9. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only., condensed to legal links and social text-links only.
```


---

## B8 — Get a quote

```text

**Overall Purpose**: The primary conversion form. Every field is a chance to lose the visitor, so the form is short, progressively disclosed, and produces a real number rather than a promise to email one.

**PLATFORM:** Web, Desktop-first
**Also generate a MOBILE variant.**

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar., reduced.
2. **Two-Column Layout**: Form on the left at roughly two-thirds width, a sticky summary panel on the right.
3. **Step 1 — Route**: Origin country and postcode, destination country and postcode. Visible labels above every field.
4. **Step 2 — Parcel**: Weight, dimensions, declared value and currency, and a goods category select. A helper link "How do I classify my goods?" opens an explanation. An option to add multiple parcels.
5. **Step 3 — Service**: Radio cards for service level — economy, standard, express — each showing transit window and an indicative price, with one marked as recommended. A toggle for who pays duties, with a one-line explanation of each choice.
6. **Sticky Summary Panel**: Updates live as fields are completed. Itemises shipping, duties, taxes, and handling into a total, with an "Estimate only" note. Before enough input exists, shows a helpful empty state listing what is still needed.
7. **Contact Capture**: Business name, email, and monthly volume — placed last, after value has been demonstrated, never first.
8. **Form Behaviour**: Fields validate on blur. Errors appear directly beneath the field that caused them, in words, with a fix. The submit button shows a loading state and resolves to an explicit success panel or an error message. The success panel restates the quote, gives a reference number, and offers "Create an account to book this" as the next step.
9. **Reassurance Strip**: Three short lines beneath the form — no card required, quote valid for `[[N]] days`, a human answers within `[[N]] hours`.
10. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only., condensed.
```


---

## B9 — Help centre

```text

**Overall Purpose**: Self-service support that deflects tickets and reassures pre-purchase readers browsing for edge cases.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Search Hero**: Headline "How can we help?" with a large search input and a row of popular query chips beneath it.
3. **Category Grid**: Six to eight cards, each with an icon area, category name, article count, and three example article links. Categories: getting started, quotes and pricing, customs and duties, tracking and delivery, returns and claims, integrations, account and billing.
4. **Popular Articles List**: A two-column list of the most-read articles with estimated reading time.
5. **Status Callout**: A slim band linking to a service status page, showing current operational state.
6. **Contact Escalation Band**: "Still stuck?" with buttons "Contact support" and "File a claim", plus stated response-time expectations.
7. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```


---

## B10 — Contact & support

```text

**Overall Purpose**: Route each visitor to the right channel quickly, and set honest expectations about response times.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Page Hero**: Headline "Talk to a person." Sub-headline stating hours and typical response time.
3. **Channel Cards**: Three or four cards — support for existing shipments, sales for new accounts, claims for damaged or lost parcels, press. Each states what it handles, the channel, and the expected response window.
4. **Contact Form**: Name, email, topic select, tracking or order reference (conditionally shown when the topic requires it), and message. Visible labels throughout, validation on blur, explicit success state on submit.
5. **Offices Block**: Address cards per location with a schematic map panel rather than a photographic map. `[[Populate with real addresses or remove.]]`
6. **Support Expectations Note**: A short honest paragraph on what support can and cannot resolve, and what a customs authority controls rather than Shipmart.
7. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```


---

## B11 — Sign in

```text

**Overall Purpose**: Return an existing merchant to their dashboard with minimum friction.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Split Layout**: A centred form panel on the left half; on the right, a full-height brand panel containing a single vector interface illustration and one line of supporting copy. No global header on this page; the wordmark sits above the form and links home.
2. **Form Card**: Headline "Sign in to Shipmart." Email and password fields with visible labels, a show/hide control on the password, a "Remember me" checkbox, and a "Forgot password?" link. Primary button "Sign in".
3. **Alternative Sign-In**: A divider reading "or", then single-sign-on buttons for `[[Google]]` and `[[the store platform]]`.
4. **Footer Line**: "New to Shipmart?" with a link "Create an account".
5. **Error Handling**: A single inline message above the form for failed credentials that does not reveal which of the two fields was wrong. Field-level errors for empty or malformed input.
6. **Minimal Footer**: Legal links only.
```


---

## B12 — Create account

```text

**Overall Purpose**: Open an account with the fewest fields that still allow a first quote, deferring everything else to onboarding.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Split Layout**: Matching B11 — form left, brand panel right. The brand panel carries three short benefit lines with check indicators rather than a paragraph.
2. **Form Card**: Headline "Create your Shipmart account." Fields: business name, work email, password with a live strength indicator and stated requirements, and country of origin. Visible labels on all fields.
3. **Consent Row**: A single checkbox agreeing to the terms of service and privacy policy, with both as inline links. Consent is never pre-checked.
4. **Primary Button**: "Create account", showing a loading state on submit.
5. **Alternative Sign-Up**: Divider, then the same single-sign-on options as B11.
6. **Footer Line**: "Already have an account?" with a "Sign in" link.
7. **Post-Submit State**: A confirmation panel instructing the user to verify their email, with a resend option and the address shown so a typo is visible.
8. **Minimal Footer**: Legal links only.
```


---

## B13 — Terms of service

```text

**Overall Purpose**: A readable legal document. Legibility is the whole design job.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Document Hero**: Title "Terms of service" with a "Last updated `[[date]]`" line beneath.
3. **Two-Column Reading Layout**: A sticky table of contents on the left listing every numbered section and highlighting the active one; the document body on the right, capped at a comfortable reading measure.
4. **Body Content**: Numbered sections with clear headings — definitions, scope of service, merchant obligations, prohibited goods, pricing and payment, duties and taxes, liability limits, claims and refunds, termination, governing law, changes to these terms. Each section is plain prose with short paragraphs.
5. **Summary Callouts**: Occasional inset panels giving a plain-language summary of a dense clause, clearly labelled as a summary that does not replace the clause.
6. **Contact Block**: A closing block on where to send legal enquiries.
7. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
8. **Note**: `[[The legal text itself must be written or reviewed by a qualified lawyer. This page is a layout only.]]`
```


---

## B14 — Privacy policy

```text

**Overall Purpose**: Explain data handling clearly enough to satisfy both a regulator and a cautious merchant.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Document Hero**: Title "Privacy policy", last-updated line, and a one-paragraph plain-language summary of what is collected and why.
3. **Two-Column Reading Layout**: Sticky table of contents left, body right — matching B13.
4. **Body Content**: Numbered sections — what data is collected, how it is used, the lawful basis, sharing with carriers and customs authorities, international transfers, retention periods, individual rights, cookies and tracking, children's data, contacting the data protection officer.
5. **Data Table**: A table of data categories against purpose, lawful basis, and retention period. Scrolls horizontally on narrow screens.
6. **Cookie Settings Block**: A panel explaining cookie categories with a "Manage cookie preferences" button.
7. **Rights Request Block**: A short block on exercising access or deletion rights, with a contact route.
8. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
9. **Note**: `[[Legal text requires qualified review. Layout only.]]`
```


---

## B15 — Prohibited & restricted items

```text

**Overall Purpose**: A genuinely useful reference that prevents a merchant from shipping something that will be seized. This page saves money and builds trust, and should be treated as product, not boilerplate.

**PLATFORM:** Web, Desktop-first

**PAGE STRUCTURE:**

1. **Header**: Sticky navigation bar, contained width. Left: "Shipmart" wordmark. Centre: four text links — "How it works", "Pricing", "Integrations", "Coverage". Right: a text link "Track a parcel", a secondary button "Sign in", and a primary button "Get a quote". On screens under 1024px the centre links collapse into a hamburger menu while the primary button stays visible in the bar.
2. **Page Hero**: Headline "What you can and cannot ship." Sub-headline explaining that rules vary by destination and that this page is a starting point, not a legal ruling.
3. **Item Lookup**: A search input labelled "Search for an item" with a destination country select beside it. Results state one of three outcomes clearly in words — allowed, restricted with conditions, or prohibited — with an explanation and any documentation required.
4. **Universally Prohibited Section**: A card grid of categories never accepted on any lane, each with an icon area, category name, and short explanation — explosives, live animals, currency, illegal substances, and similar.
5. **Restricted by Destination**: An accordion by category — batteries and electronics, cosmetics and liquids, food and supplements, plants and seeds, alcohol, tobacco, medical devices, branded goods. Each opens to a table of destinations and their specific conditions, scrolling horizontally on narrow screens.
6. **Documentation Guide**: Cards explaining common documents — commercial invoice, certificate of origin, MSDS for batteries, phytosanitary certificate — each with when it is needed and where to get it.
7. **What Happens If Section**: An honest block explaining seizure, return, and disposal outcomes and who bears the cost.
8. **Closing Call-to-Action Band**: "Not sure about your product? Ask before you ship." Primary button "Contact support".
9. **Footer**: Four-column footer on a dark full-bleed background, with a fifth stacked block for the wordmark and a one-line description. Columns: **Product** (How it works, Pricing, Integrations, Coverage, Track a parcel) · **Support** (Help centre, Contact, Prohibited items, Claims) · **Company** (About, Careers, Press) · **Legal** (Terms of service, Privacy policy, Cookie settings). Below the columns, a divider, then a row with the copyright line on the left and lower-case social text-links — x, linkedin, instagram — on the right. No social icons, text only.
```
