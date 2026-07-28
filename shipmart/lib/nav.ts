export interface NavLink { href: string; label: string }

export const PRIMARY_NAV: NavLink[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/integrations", label: "Integrations" },
  { href: "/coverage", label: "Coverage" },
];

export const FOOTER_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/integrations", label: "Integrations" },
      { href: "/coverage", label: "Coverage" },
      { href: "/track", label: "Track a parcel" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help centre" },
      { href: "/contact", label: "Contact" },
      { href: "/legal/prohibited-items", label: "Prohibited items" },
      { href: "/contact?topic=claim", label: "Claims" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about#careers", label: "Careers" },
      { href: "/contact?topic=press", label: "Press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms of service" },
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/privacy#cookies", label: "Cookie settings" },
    ],
  },
];

export const SOCIAL: NavLink[] = [
  { href: "https://x.com", label: "x" },
  { href: "https://linkedin.com", label: "linkedin" },
  { href: "https://instagram.com", label: "instagram" },
];
