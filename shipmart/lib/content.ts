/**
 * All page copy lives here — no hardcoded strings in components.
 *
 * Anything that would be a factual claim (counts, statistics, partner names,
 * team members) is marked `unverified: true` and rendered with a visible TODO
 * marker in development. See components/ui/Unverified.tsx.
 */

export const HOME = {
  hero: {
    headline: "Every border, handled.",
    sub: "Instantly calculate landed costs, automate customs clearance, and guarantee duties at checkout. No more surprise fees or held parcels.",
    reassurance: "No monthly fee. No volume minimum.",
  },
  trust: {
    line: "Trusted by merchants shipping to every major market.",
    unverifiedLine: "Trusted by 5,000+ merchants shipping to 120 countries.",
    logos: ["DHL", "FedEx", "UPS", "DPD"],
  },
  pillars: [
    { id: "quote", title: "quote", body: "See the true landed cost before you commit. Shipping, duties and taxes in one figure, per destination." },
    { id: "clear", title: "clear", body: "We handle the customs paperwork, the HS codes and the duties. You print one label." },
    { id: "track", title: "track", body: "One tracking link that keeps working across carriers and borders, for you and your customer." },
  ],
  friction: [
    { q: "Who fills in the customs forms?", a: "We do. Shipmart generates the commercial invoice and classifies your goods from your product catalogue. You confirm once, then it is automatic for every repeat item." },
    { q: "What happens if a parcel is held?", a: "You get told what is missing and who has to act, in plain language, before the carrier's clock runs out. Most holds are one document." },
    { q: "Who pays if the duties are wrong?", a: "We do. A quoted DDP landed cost is the price. If our classification was wrong, the difference is ours, not yours." },
  ],
  steps: [
    { n: 1, title: "Connect your store", body: "Link your storefront or upload a CSV. Your orders appear ready to quote.", cta: { href: "/integrations", label: "See integrations" } },
    { n: 2, title: "Print one label", body: "We pick the lane, generate the customs documents and prepay the duties." },
    { n: 3, title: "Watch it land", body: "You and your customer follow the same tracking link until it is delivered." },
  ],
  problem: {
    headline: "Most cross-border parcels do not fail in the air. They fail at the border.",
    body: "Every figure in this section is a placeholder. Replace them with sourced statistics or remove the section before launch — a fabricated number that looks real is worse than no number.",
    stats: [
      { figure: "73%", label: "Cart abandonment", body: "when international buyers meet unexpected duties at checkout.", unverified: true },
      { figure: "14d", label: "Average customs delay", body: "caused by incorrect HS classification and missing paperwork.", unverified: true },
      { figure: "1 in 5", label: "Parcels returned", body: "because the recipient refused to pay duties at the door.", unverified: true },
    ],
  },
  network: {
    headline: "A network, not a courier.",
    body: "Shipmart is a growing network of carriers, customs brokers and clearance lanes. Each new lane makes every merchant's rates better — the system compounds rather than competing with itself.",
  },
  closing: { headline: "Ready to ship past the border?", sub: "Get a landed-cost quote for your next order in under a minute." },
};

export const HOW_IT_WORKS = {
  stages: [
    { id: "connect", n: 1, title: "Connect your store", body: "Sync orders automatically with direct integrations to major platforms. No manual data entry.", we: ["Pull orders and catalogue data", "Map products to HS codes", "Keep tracking in sync back to your store"], you: ["Authorise the connection once"] },
    { id: "quote", n: 2, title: "Get an exact landed cost", body: "We price shipping, duties and taxes together so the number you see is the number you pay.", we: ["Compare lanes across carriers", "Apply destination duty and VAT rules", "Hold the quoted price"], you: ["Confirm weight and declared value"] },
    { id: "label", n: 3, title: "Print one label", body: "One label carries the shipping data and the customs declaration together.", we: ["Generate the commercial invoice", "Prepay duties where DDP applies", "Book collection"], you: ["Print and attach the label"] },
    { id: "clear", n: 4, title: "Clear the border", body: "The part that usually goes wrong. We watch it and tell you the moment it needs a human.", we: ["Submit declarations", "Answer routine customs queries", "Alert you if a document is missing"], you: ["Respond if we ask for one document"] },
    { id: "deliver", n: 5, title: "Deliver and confirm", body: "The same tracking link works from collection to doorstep, across every carrier on the route.", we: ["Hand off to the final-mile carrier", "Keep the tracking link live", "Handle failed-delivery rerouting"], you: ["Nothing"] },
  ],
  edgeCases: [
    { title: "Held at customs", outcome: "We tell you what is missing and who must act. No charge for our time.", who: "Shipmart resolves" },
    { title: "Address undeliverable", outcome: "Address validation catches most of these upfront. If delivery fails we reroute or return per your rules.", who: "Shipmart resolves" },
    { title: "Customer refuses duties", outcome: "On DDP this cannot happen — duties are already paid. On DAP the parcel returns and you are charged return freight.", who: "Depends on terms" },
    { title: "Parcel lost in transit", outcome: "We file the carrier claim and credit you at declared value up to the insured limit.", who: "Shipmart resolves" },
    { title: "Customer returns the item", outcome: "Return labels are generated at the original lane rate. Duty reclaim is filed where the destination allows it.", who: "Shared" },
  ],
  comparison: {
    columns: ["Doing it yourself", "A courier account", "Shipmart"],
    rows: [
      { label: "Customs paperwork", values: ["You write it", "You write it", "Generated for you"] },
      { label: "Duty prepayment", values: ["Not possible", "Manual, per parcel", "Automatic on DDP lanes"] },
      { label: "Tracking continuity", values: ["Breaks at handover", "Breaks at handover", "One link end to end"] },
      { label: "Returns handling", values: ["Manual", "Manual", "Rules-based"] },
      { label: "Support contact", values: ["The carrier", "The carrier", "Shipmart"] },
    ],
  },
};

export const ABOUT = {
  headline: "We built Shipmart because the border kept winning.",
  intro: "Logistics should not be the bottleneck for global commerce. We started by mapping the most complex cross-border routes and dismantling the hidden costs and delays. Today we are building the infrastructure that lets merchants sell anywhere as easily as they sell locally.",
  mission: "Our mission is to architect absolute clarity into global trade, turning opaque shipping routes into transparent, reliable networks.",
  stats: [
    { figure: "2M+", label: "Parcels delivered", unverified: true },
    { figure: "150+", label: "Lanes operated", unverified: true },
    { figure: "120+", label: "Countries reached", unverified: true },
    { figure: "5k+", label: "Merchants served", unverified: true },
  ],
  values: [
    { title: "clarity", body: "Data should illuminate, not obscure. We design interfaces that expose the truth immediately." },
    { title: "no surprise costs", body: "Predictability is a feature. We absorb volatility so your margins stay stable." },
    { title: "the network compounds", body: "Every new lane makes the whole system stronger for everyone on it." },
    { title: "small merchants first", body: "Enterprise capability without an enterprise budget. Tools that scale with ambition." },
  ],
  team: [
    { name: "Sarah Chen", role: "Chief Executive Officer", unverified: true },
    { name: "David Miller", role: "Chief Technology Officer", unverified: true },
    { name: "Elena Rodriguez", role: "Head of Global Routing", unverified: true },
    { name: "James Kosta", role: "VP of Product", unverified: true },
  ],
};

export interface Integration { name: string; category: string; blurb: string; status: "Available" | "Beta" | "Coming soon"; initial: string; tone: string }

export const INTEGRATIONS: Integration[] = [
  { name: "Shopify", category: "Storefronts", blurb: "Sync orders and fulfil directly from your Shopify admin.", status: "Available", initial: "S", tone: "bg-[#95BF47]" },
  { name: "WooCommerce", category: "Storefronts", blurb: "Connect your WordPress store for automated label generation.", status: "Available", initial: "W", tone: "bg-[#96588a]" },
  { name: "BigCommerce", category: "Storefronts", blurb: "Native order sync with rate display at checkout.", status: "Beta", initial: "B", tone: "bg-[#34313f]" },
  { name: "Squarespace", category: "Storefronts", blurb: "Pull orders and push tracking back automatically.", status: "Coming soon", initial: "Sq", tone: "bg-[#101010]" },
  { name: "Etsy", category: "Marketplaces", blurb: "Manage marketplace orders in one unified view.", status: "Available", initial: "E", tone: "bg-[#F1641E]" },
  { name: "Amazon", category: "Marketplaces", blurb: "FBM integration for direct-to-consumer sellers.", status: "Available", initial: "A", tone: "bg-[#FF9900]" },
  { name: "eBay", category: "Marketplaces", blurb: "Sync listings and fulfil cross-border orders.", status: "Beta", initial: "eB", tone: "bg-[#0064D2]" },
  { name: "NetSuite", category: "ERP & OMS", blurb: "Push shipment records into your ERP automatically.", status: "Coming soon", initial: "N", tone: "bg-[#1c5a9c]" },
  { name: "Zapier", category: "Automation", blurb: "Trigger Shipmart actions from 6,000+ apps.", status: "Beta", initial: "Z", tone: "bg-[#FF4A00]" },
  { name: "Custom API", category: "Custom", blurb: "Build your own integration against our REST API.", status: "Available", initial: "{}", tone: "bg-inverse-surface" },
];

export const INTEGRATION_CATEGORIES = ["All", "Storefronts", "Marketplaces", "ERP & OMS", "Automation", "Custom"];

export interface Article { title: string; blurb: string; category: string; minutes: number }

export const ARTICLES: Article[] = [
  { title: "Generating commercial invoices", blurb: "How to produce the customs documentation every cross-border parcel needs.", category: "Customs & compliance", minutes: 4 },
  { title: "Understanding volumetric weight", blurb: "Why a large, light parcel can cost more than a small, heavy one.", category: "Quotes & pricing", minutes: 3 },
  { title: "Filing a loss claim", blurb: "Step by step for submitting a claim on a lost or damaged parcel.", category: "Returns & claims", minutes: 5 },
  { title: "What DDP and DAP actually mean", blurb: "The single choice that decides who pays duty, and when.", category: "Customs & compliance", minutes: 4 },
  { title: "De-minimis thresholds by country", blurb: "The value below which duty is usually not collected, and why it moves.", category: "Customs & compliance", minutes: 6 },
  { title: "Connecting your Shopify store", blurb: "Authorise, map your catalogue and enable automatic quoting.", category: "Integrations", minutes: 3 },
  { title: "Shipping lithium batteries", blurb: "The UN38.3 test summary and which lanes will accept them.", category: "Customs & compliance", minutes: 7 },
  { title: "Reading your invoice", blurb: "How shipping, duties, taxes and handling appear on your monthly statement.", category: "Account & billing", minutes: 3 },
  { title: "Setting return rules", blurb: "Decide in advance what happens to an undeliverable parcel.", category: "Returns & claims", minutes: 4 },
];

export const HELP_CATEGORIES = ["Getting started", "Quotes & pricing", "Customs & compliance", "Returns & claims", "Integrations", "Account & billing"];

export interface RestrictedItem { name: string; verdict: "prohibited" | "restricted" | "allowed"; detail: string; category: string }

export const RESTRICTED_ITEMS: RestrictedItem[] = [
  { name: "Lithium batteries (loose)", verdict: "prohibited", detail: "Loose lithium cells cannot travel by air on any Shipmart lane.", category: "Electronics" },
  { name: "Lithium batteries (in device)", verdict: "restricted", detail: "Permitted with a UN38.3 test summary and correct packaging marks.", category: "Electronics" },
  { name: "Perfume and aerosols", verdict: "restricted", detail: "Flammable liquids need a dangerous-goods declaration. Not accepted on economy lanes.", category: "Cosmetics" },
  { name: "Handmade silver jewellery", verdict: "allowed", detail: "Ships on all lanes. Declare precious-metal content on the invoice.", category: "Jewellery" },
  { name: "Cosmetics and skincare", verdict: "restricted", detail: "Ingredient list required. Some destinations require local product registration.", category: "Cosmetics" },
  { name: "Food supplements", verdict: "restricted", detail: "Often requires a health certificate. Prohibited outright in several destinations.", category: "Food" },
  { name: "Seeds and plants", verdict: "restricted", detail: "Phytosanitary certificate required. Prohibited to Australia and New Zealand.", category: "Agriculture" },
  { name: "Alcohol", verdict: "restricted", detail: "Licence required at both ends. Not available on any consumer lane.", category: "Food" },
  { name: "Currency and bearer instruments", verdict: "prohibited", detail: "Never accepted, on any lane, in any quantity.", category: "Financial" },
  { name: "Counterfeit or replica goods", verdict: "prohibited", detail: "Seized without compensation. Repeat attempts close your account.", category: "Branded goods" },
  { name: "Live animals", verdict: "prohibited", detail: "Shipmart does not carry livestock or pets under any circumstances.", category: "Live goods" },
  { name: "Explosives and ammunition", verdict: "prohibited", detail: "Never accepted. Attempting to ship these is a criminal offence in most jurisdictions.", category: "Dangerous goods" },
  { name: "Printed apparel", verdict: "allowed", detail: "Ships on all lanes. Declare fabric composition for correct duty classification.", category: "Apparel" },
  { name: "Ceramics and glassware", verdict: "allowed", detail: "Ships on all lanes. Fragile handling is recommended but not automatic.", category: "Homeware" },
];
