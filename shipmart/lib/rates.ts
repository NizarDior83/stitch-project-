/**
 * Landed-cost engine.
 *
 * The arithmetic is real — volumetric weight, zone banding, duty and VAT rates,
 * de-minimis thresholds — but every rate table below is MOCK DATA standing in
 * for a carrier API. Swap `quote()`'s internals for a real endpoint and nothing
 * in the UI layer has to change.
 */

export type ServiceLevel = "express" | "standard" | "economy";
export type DutyTerms = "DDP" | "DAP";

export interface Country {
  code: string;
  name: string;
  zone: 1 | 2 | 3 | 4;
  /** Import VAT / GST applied to goods + shipping. */
  vat: number;
  /** Below this declared value (USD) duty is generally not collected. */
  deMinimis: number;
  ddp: boolean;
}

export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", zone: 1, vat: 0, deMinimis: 800, ddp: true },
  { code: "CA", name: "Canada", zone: 1, vat: 0.05, deMinimis: 20, ddp: true },
  { code: "MX", name: "Mexico", zone: 1, vat: 0.16, deMinimis: 50, ddp: true },
  { code: "GB", name: "United Kingdom", zone: 2, vat: 0.2, deMinimis: 0, ddp: true },
  { code: "IE", name: "Ireland", zone: 2, vat: 0.23, deMinimis: 0, ddp: true },
  { code: "DE", name: "Germany", zone: 2, vat: 0.19, deMinimis: 0, ddp: true },
  { code: "FR", name: "France", zone: 2, vat: 0.2, deMinimis: 0, ddp: true },
  { code: "ES", name: "Spain", zone: 2, vat: 0.21, deMinimis: 0, ddp: true },
  { code: "IT", name: "Italy", zone: 2, vat: 0.22, deMinimis: 0, ddp: true },
  { code: "NL", name: "Netherlands", zone: 2, vat: 0.21, deMinimis: 0, ddp: true },
  { code: "AE", name: "United Arab Emirates", zone: 3, vat: 0.05, deMinimis: 270, ddp: true },
  { code: "SA", name: "Saudi Arabia", zone: 3, vat: 0.15, deMinimis: 70, ddp: false },
  { code: "MA", name: "Morocco", zone: 3, vat: 0.2, deMinimis: 125, ddp: false },
  { code: "EG", name: "Egypt", zone: 3, vat: 0.14, deMinimis: 30, ddp: false },
  { code: "AU", name: "Australia", zone: 4, vat: 0.1, deMinimis: 660, ddp: true },
  { code: "JP", name: "Japan", zone: 4, vat: 0.1, deMinimis: 130, ddp: true },
  { code: "SG", name: "Singapore", zone: 4, vat: 0.09, deMinimis: 300, ddp: true },
  { code: "BR", name: "Brazil", zone: 4, vat: 0.17, deMinimis: 50, ddp: false },
  { code: "ZA", name: "South Africa", zone: 4, vat: 0.15, deMinimis: 30, ddp: false },
];

export interface GoodsCategory {
  id: string;
  label: string;
  /** Indicative ad-valorem duty rate. */
  duty: number;
  restricted?: string;
}

export const CATEGORIES: GoodsCategory[] = [
  { id: "jewellery", label: "Handmade jewellery", duty: 0.06 },
  { id: "apparel", label: "Apparel & textiles", duty: 0.12 },
  { id: "cosmetics", label: "Cosmetics & skincare", duty: 0.065, restricted: "Ingredient declaration required for most destinations." },
  { id: "homeware", label: "Homeware & eco goods", duty: 0.045 },
  { id: "print", label: "Custom merchandise & print", duty: 0.05 },
  { id: "electronics", label: "Electronics", duty: 0.035, restricted: "Lithium batteries need a UN38.3 test summary." },
  { id: "supplements", label: "Food & supplements", duty: 0.09, restricted: "Often requires a health certificate." },
];

interface ServiceSpec {
  id: ServiceLevel;
  label: string;
  blurb: string;
  /** USD per chargeable kg, by zone. */
  perKg: Record<1 | 2 | 3 | 4, number>;
  base: Record<1 | 2 | 3 | 4, number>;
  transit: Record<1 | 2 | 3 | 4, [number, number]>;
}

const SERVICES: ServiceSpec[] = [
  {
    id: "express",
    label: "Express",
    blurb: "Fastest lane, fully tracked, priority customs handling.",
    base: { 1: 14.5, 2: 18.0, 3: 22.5, 4: 26.0 },
    perKg: { 1: 4.2, 2: 5.6, 3: 7.1, 4: 8.4 },
    transit: { 1: [1, 2], 2: [2, 3], 3: [3, 4], 4: [3, 5] },
  },
  {
    id: "standard",
    label: "Standard",
    blurb: "The default. Good balance of cost and transit time.",
    base: { 1: 9.5, 2: 12.0, 3: 15.0, 4: 17.5 },
    perKg: { 1: 2.8, 2: 3.7, 3: 4.6, 4: 5.5 },
    transit: { 1: [3, 5], 2: [4, 6], 3: [5, 8], 4: [6, 9] },
  },
  {
    id: "economy",
    label: "Economy",
    blurb: "Lowest cost per parcel. Best for low-value, non-urgent goods.",
    base: { 1: 6.0, 2: 7.5, 3: 9.5, 4: 11.0 },
    perKg: { 1: 1.9, 2: 2.4, 3: 3.1, 4: 3.7 },
    transit: { 1: [6, 9], 2: [7, 11], 3: [9, 14], 4: [10, 16] },
  },
];

export const HANDLING_FEE = 2.5;
/** Divisor for volumetric weight, cm³ → kg. Industry standard for air. */
export const VOLUMETRIC_DIVISOR = 5000;

export interface QuoteInput {
  originCode: string;
  destinationCode: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  declaredValue: number;
  categoryId: string;
  service: ServiceLevel;
  terms: DutyTerms;
}

export interface QuoteLine {
  label: string;
  amount: number;
  note?: string;
}

export interface QuoteResult {
  actualWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
  lines: QuoteLine[];
  total: number;
  transit: [number, number];
  dutyWaived: boolean;
  destination: Country;
  category: GoodsCategory;
  serviceLabel: string;
}

export function findCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function volumetricWeight(l: number, w: number, h: number): number {
  if (!l || !w || !h) return 0;
  return (l * w * h) / VOLUMETRIC_DIVISOR;
}

export function serviceOptions(destinationCode: string, chargeable: number) {
  const dest = findCountry(destinationCode);
  if (!dest) return [];
  return SERVICES.map((s) => {
    const shipping = s.base[dest.zone] + s.perKg[dest.zone] * Math.max(chargeable, 0.5);
    return {
      id: s.id,
      label: s.label,
      blurb: s.blurb,
      shipping: round(shipping),
      transit: s.transit[dest.zone],
    };
  });
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

export function quote(input: QuoteInput): QuoteResult | null {
  const dest = findCountry(input.destinationCode);
  const category = CATEGORIES.find((c) => c.id === input.categoryId);
  const spec = SERVICES.find((s) => s.id === input.service);
  if (!dest || !category || !spec) return null;

  const actual = Math.max(input.weightKg || 0, 0);
  const volumetric = volumetricWeight(input.lengthCm, input.widthCm, input.heightCm);
  const chargeable = Math.max(actual, volumetric, 0.5);

  const shipping = round(spec.base[dest.zone] + spec.perKg[dest.zone] * chargeable);

  const value = Math.max(input.declaredValue || 0, 0);
  const dutyWaived = value <= dest.deMinimis;
  const duty = dutyWaived ? 0 : round(value * category.duty);
  const vat = round((value + shipping + duty) * dest.vat);

  const lines: QuoteLine[] = [
    {
      label: "Shipping",
      amount: shipping,
      note: `${spec.label}, ${chargeable.toFixed(2)} kg chargeable`,
    },
    {
      label: "Duties",
      amount: duty,
      note: dutyWaived
        ? `Waived — under the ${formatMoney(dest.deMinimis)} de-minimis threshold`
        : `${(category.duty * 100).toFixed(1)}% of declared value`,
    },
    {
      label: "Import VAT / GST",
      amount: vat,
      note: dest.vat === 0 ? "Not applicable for this destination" : `${(dest.vat * 100).toFixed(0)}%`,
    },
    { label: "Handling", amount: HANDLING_FEE, note: "Customs paperwork and clearance" },
  ];

  const total = round(lines.reduce((sum, l) => sum + l.amount, 0));

  return {
    actualWeight: actual,
    volumetricWeight: round(volumetric),
    chargeableWeight: round(chargeable),
    lines,
    total,
    transit: spec.transit[dest.zone],
    dutyWaived,
    destination: dest,
    category,
    serviceLabel: spec.label,
  };
}

export function formatMoney(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
