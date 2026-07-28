/**
 * Mock tracking store.
 *
 * The Stitch export designed one state (in transit). The other four are derived
 * from it — same shell, same card, same timeline — because a parcel product
 * that only renders its happy path is not finished.
 *
 * Test numbers are listed in README.md and surfaced in the UI on a failed lookup,
 * so the states are reachable without reading the source.
 */

export type ShipmentState = "transit" | "held" | "delivered" | "exception";

export interface TimelineEvent {
  label: string;
  location: string;
  timestamp: string;
  state: "done" | "current" | "pending";
}

export interface Shipment {
  id: string;
  state: ShipmentState;
  /** Plain-language headline. Never relies on colour to carry meaning. */
  statusLabel: string;
  headline: string;
  detail: string;
  origin: string;
  destination: string;
  service: string;
  weightKg: number;
  eta: string | null;
  timeline: TimelineEvent[];
  /** Rendered as an instruction panel, not an error, when present. */
  action?: { title: string; body: string; cta: string };
}

const TIMELINE_BASE: TimelineEvent[] = [
  { label: "Shipment information received", location: "Shipmart portal", timestamp: "20 Oct, 09:00", state: "done" },
  { label: "Collected", location: "London, UK", timestamp: "20 Oct, 14:20", state: "done" },
  { label: "Departed origin facility", location: "Heathrow, UK", timestamp: "21 Oct, 08:45", state: "done" },
  { label: "Arrived in destination country", location: "Frankfurt, DE", timestamp: "22 Oct, 06:10", state: "done" },
];

export const SHIPMENTS: Record<string, Shipment> = {
  "SHP-1000-TRANSIT": {
    id: "SHP-1000-TRANSIT",
    state: "transit",
    statusLabel: "In transit",
    headline: "Arriving Thursday 24 October",
    detail: "Your parcel cleared customs this morning and is moving to the local delivery depot.",
    origin: "London, UK",
    destination: "Berlin, DE",
    service: "Express",
    weightKg: 4.2,
    eta: "24 Oct, 14:00 – 17:00",
    timeline: [
      ...TIMELINE_BASE,
      { label: "Customs cleared", location: "Frankfurt, DE", timestamp: "22 Oct, 09:15", state: "done" },
      { label: "In transit to delivery depot", location: "Berlin, DE", timestamp: "23 Oct, 04:30", state: "current" },
      { label: "Out for delivery", location: "Berlin, DE", timestamp: "Expected 24 Oct", state: "pending" },
      { label: "Delivered", location: "Berlin, DE", timestamp: "Expected 24 Oct", state: "pending" },
    ],
  },
  "SHP-2000-HELD": {
    id: "SHP-2000-HELD",
    state: "held",
    statusLabel: "Held at customs",
    headline: "Customs need one more document",
    detail: "German customs have asked for a commercial invoice showing the itemised value of the contents.",
    origin: "London, UK",
    destination: "Munich, DE",
    service: "Standard",
    weightKg: 1.8,
    eta: null,
    timeline: [
      ...TIMELINE_BASE,
      { label: "Held at customs", location: "Munich, DE", timestamp: "22 Oct, 11:40", state: "current" },
      { label: "Customs cleared", location: "Munich, DE", timestamp: "Pending", state: "pending" },
      { label: "Out for delivery", location: "Munich, DE", timestamp: "Pending", state: "pending" },
      { label: "Delivered", location: "Munich, DE", timestamp: "Pending", state: "pending" },
    ],
    action: {
      title: "Upload a commercial invoice",
      body: "The sender needs to provide an itemised invoice. Once uploaded, clearance usually completes within one working day. Nothing is required from the recipient.",
      cta: "Upload document",
    },
  },
  "SHP-3000-DELIVERED": {
    id: "SHP-3000-DELIVERED",
    state: "delivered",
    statusLabel: "Delivered",
    headline: "Delivered on Tuesday 22 October",
    detail: "Signed for by M. Weber at the front desk.",
    origin: "Manchester, UK",
    destination: "Amsterdam, NL",
    service: "Express",
    weightKg: 0.9,
    eta: null,
    timeline: [
      ...TIMELINE_BASE,
      { label: "Customs cleared", location: "Amsterdam, NL", timestamp: "21 Oct, 18:00", state: "done" },
      { label: "Out for delivery", location: "Amsterdam, NL", timestamp: "22 Oct, 07:45", state: "done" },
      { label: "Delivered", location: "Amsterdam, NL", timestamp: "22 Oct, 11:12", state: "current" },
    ],
  },
  "SHP-4000-EXCEPTION": {
    id: "SHP-4000-EXCEPTION",
    state: "exception",
    statusLabel: "Delivery failed",
    headline: "We could not deliver this parcel",
    detail: "Two delivery attempts were made and the address could not be accessed. The parcel is being held at the local depot for 10 days.",
    origin: "Bristol, UK",
    destination: "Lyon, FR",
    service: "Standard",
    weightKg: 2.4,
    eta: null,
    timeline: [
      ...TIMELINE_BASE,
      { label: "Customs cleared", location: "Paris, FR", timestamp: "21 Oct, 16:20", state: "done" },
      { label: "Out for delivery", location: "Lyon, FR", timestamp: "22 Oct, 08:05", state: "done" },
      { label: "Delivery attempt failed", location: "Lyon, FR", timestamp: "23 Oct, 10:30", state: "current" },
      { label: "Held at depot", location: "Lyon, FR", timestamp: "Awaiting instruction", state: "pending" },
    ],
    action: {
      title: "Confirm the delivery address",
      body: "Check the street number and add any access code or buzzer detail. We will attempt delivery again the next working day.",
      cta: "Update address",
    },
  },
};

export const TEST_NUMBERS = Object.keys(SHIPMENTS);

export function lookup(raw: string): Shipment | null {
  const key = raw.trim().toUpperCase();
  return SHIPMENTS[key] ?? null;
}

export const STATE_STYLES: Record<ShipmentState, { text: string; bg: string }> = {
  transit: { text: "text-status-transit", bg: "bg-status-transit-bg" },
  held: { text: "text-status-held", bg: "bg-status-held-bg" },
  delivered: { text: "text-status-cleared", bg: "bg-status-cleared-bg" },
  exception: { text: "text-status-exception", bg: "bg-status-exception-bg" },
};
