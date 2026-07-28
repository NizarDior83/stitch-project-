export interface LaneRow { country: string; code: string; transit: string; ddp: boolean; note?: string }
export interface Region { id: string; name: string; blurb: string; rows: LaneRow[] }

export const REGIONS: Region[] = [
  {
    id: "north-america",
    name: "North America",
    blurb: "High-frequency lanes with same-week clearance in most cases.",
    rows: [
      { country: "United States", code: "US", transit: "2–4 days", ddp: true, note: "De-minimis $800 — most parcels clear duty-free." },
      { country: "Canada", code: "CA", transit: "3–5 days", ddp: true, note: "Low de-minimis; duties usually apply." },
      { country: "Mexico", code: "MX", transit: "4–6 days", ddp: true },
    ],
  },
  {
    id: "europe",
    name: "Europe & UK",
    blurb: "No de-minimis on imports — VAT applies from the first cent.",
    rows: [
      { country: "United Kingdom", code: "GB", transit: "2–3 days", ddp: true, note: "VAT 20% from the first cent." },
      { country: "Ireland", code: "IE", transit: "2–4 days", ddp: true },
      { country: "Germany", code: "DE", transit: "2–4 days", ddp: true },
      { country: "France", code: "FR", transit: "3–4 days", ddp: true },
      { country: "Spain", code: "ES", transit: "3–5 days", ddp: true },
      { country: "Italy", code: "IT", transit: "3–5 days", ddp: true },
      { country: "Netherlands", code: "NL", transit: "2–4 days", ddp: true },
    ],
  },
  {
    id: "mena",
    name: "Middle East & North Africa",
    blurb: "Clearance times vary most in this region. Documentation matters.",
    rows: [
      { country: "United Arab Emirates", code: "AE", transit: "3–5 days", ddp: true },
      { country: "Saudi Arabia", code: "SA", transit: "4–7 days", ddp: false, note: "DAP only — recipient settles duties." },
      { country: "Morocco", code: "MA", transit: "4–7 days", ddp: false, note: "DAP only. Commercial invoice in French or Arabic." },
      { country: "Egypt", code: "EG", transit: "5–8 days", ddp: false },
    ],
  },
  {
    id: "apac",
    name: "Asia-Pacific",
    blurb: "Long-haul lanes; economy service is materially cheaper here.",
    rows: [
      { country: "Australia", code: "AU", transit: "4–6 days", ddp: true, note: "High de-minimis — AUD 1,000." },
      { country: "Japan", code: "JP", transit: "3–5 days", ddp: true },
      { country: "Singapore", code: "SG", transit: "3–5 days", ddp: true },
    ],
  },
  {
    id: "latam-africa",
    name: "Latin America & Africa",
    blurb: "Developing lanes. Expect wider transit windows and stricter checks.",
    rows: [
      { country: "Brazil", code: "BR", transit: "7–12 days", ddp: false, note: "DAP only. CPF number required for the recipient." },
      { country: "South Africa", code: "ZA", transit: "6–10 days", ddp: false },
    ],
  },
];
