import type { Metadata } from "next";
import { Shell, PageHero } from "@/components/layout/Shell";
import { ButtonLink, Card, Section, TableWrap, Unverified } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { RateEstimator } from "@/components/product/RateEstimator";

export const metadata: Metadata = {
  title: "Pricing & rates",
  description:
    "Landed cost before you commit: shipping, duties, taxes and handling in one figure. Estimate a real parcel, then pick a plan.",
  alternates: { canonical: "/pricing" },
};

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/mo",
    who: "Occasional shipper, pay per parcel.",
    features: ["Standard lane rates", "Customs documents generated", "Tracking for you and your customer", "Email support"],
    cta: { href: "/signup", label: "Start shipping" },
    featured: false,
  },
  {
    name: "Growth",
    price: "$99",
    cadence: "/mo",
    who: "Steady volume, discounted lanes.",
    features: ["Up to 15% off standard rates", "Prepaid duties on DDP lanes", "Branded tracking page", "Priority support"],
    cta: { href: "/signup", label: "Start free trial" },
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "",
    who: "High volume, custom lanes.",
    features: ["Negotiated lane pricing", "Multi-carrier routing rules", "Dedicated account manager", "API integration support"],
    cta: { href: "/contact", label: "Talk to sales" },
    featured: false,
  },
];

const MATRIX = [
  { label: "Automated customs documents", values: [true, true, true] },
  { label: "DDP — prepaid duties", values: [true, true, true] },
  { label: "Branded tracking page", values: [false, true, true] },
  { label: "Multi-carrier routing rules", values: [false, false, true] },
  { label: "Dedicated account manager", values: [false, false, true] },
  { label: "API access", values: [true, true, true] },
];

const FEES = [
  ["Remote area surcharge", "Applied by the carrier for addresses outside standard delivery zones. Shown in the quote before you commit."],
  ["Oversize", "Parcels over 120 cm on the longest side. Priced per lane."],
  ["Address correction", "Charged when a carrier has to re-key an incomplete address."],
  ["Storage", "After 5 working days held at a customs facility awaiting documents."],
  ["Return to sender", "Return freight at the original lane rate. Duties already paid are reclaimed where the destination allows it."],
];

const FAQ = [
  ["When are duties charged?", "On DDP lanes we prepay them and bill you with the shipment. On DAP lanes the carrier collects from your customer at delivery."],
  ["What exchange rate do you use?", "The rate at the moment the shipment is created, held for the life of the shipment. We do not re-rate mid-transit."],
  ["Do I get a refund if a parcel is never delivered?", "Yes. Shipping and prepaid duties are credited once the carrier confirms the loss."],
  ["Do you handle VAT registration?", "No. We calculate and remit at the border, but IOSS or local VAT registration stays with you."],
  ["Can I cancel?", "Monthly plans cancel at the end of the current period. There is no exit fee and no minimum term."],
];

export default function PricingPage() {
  return (
    <Shell>
      <PageHero
        title="Landed cost, before you commit."
        lede="Shipping, duties, taxes and handling in one figure — with the arithmetic shown, so you can check it."
      />

      <Section className="pt-0">
        <RateEstimator mode="compact" />
      </Section>

      <Section tone="low">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Plans</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch">
          {PLANS.map((plan) => (
            <li key={plan.name}>
              <Card className={"h-full flex flex-col " + (plan.featured ? "border-2 border-primary relative" : "")}>
                {plan.featured && (
                  <span className="absolute -top-3 left-6 bg-primary text-on-primary font-label-md text-[12px] uppercase tracking-widest px-3 py-1 rounded">
                    Most chosen
                  </span>
                )}
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{plan.name}</h3>
                <p className="flex items-baseline gap-1 mt-stack-sm">
                  <span className="font-headline-lg text-headline-lg text-primary tabular">
                    <Unverified note="confirm plan pricing">{plan.price}</Unverified>
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">{plan.cadence}</span>
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-stack-xs mb-stack-md">{plan.who}</p>
                <ul className="flex flex-col gap-stack-sm border-t border-outline-variant pt-stack-md flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 font-body-sm text-body-sm text-on-surface">
                      <Icon name="check" size={16} className="text-status-cleared mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={plan.cta.href}
                  tone={plan.featured ? "primary" : "secondary"}
                  className="mt-stack-md w-full"
                >
                  {plan.cta.label}
                </ButtonLink>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">What is included</h2>
        <TableWrap label="Feature comparison across plans">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th scope="col" className="p-4 font-label-md text-label-md text-on-surface">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.name} scope="col" className="p-4 font-label-md text-label-md text-on-surface text-center">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row) => (
                <tr key={row.label} className="border-b border-outline-variant/60 last:border-0">
                  <th scope="row" className="p-4 font-body-md text-body-md text-on-surface text-left font-normal">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {/* Never a bare tick — every cell says what it means to a screen reader. */}
                      <span className={v ? "text-status-cleared" : "text-outline"}>
                        <Icon name={v ? "check" : "x"} size={18} className="inline" />
                        <span className="sr-only">{v ? "Included" : "Not included"}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Section>

      <Section tone="low">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">Fees and surcharges</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-stack-lg">
          Every charge that can appear on an invoice, listed here rather than buried in the terms.
        </p>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {FEES.map(([term, def]) => (
            <div key={term} className="border-t border-outline-variant pt-stack-md">
              <dt className="font-label-md text-label-md text-on-surface mb-stack-xs">{term}</dt>
              <dd className="font-body-sm text-body-sm text-on-surface-variant">{def}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Pricing questions</h2>
        <div className="flex flex-col gap-stack-sm max-w-3xl">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group border border-outline-variant rounded-lg bg-surface-container-lowest">
              <summary className="cursor-pointer list-none p-6 min-h-[44px] flex items-center justify-between gap-4 font-headline-sm text-headline-sm text-on-surface">
                {q}
                <Icon name="chevron-down" className="text-outline transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 font-body-md text-body-md text-on-surface-variant">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="dark" className="text-center">
        <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-stack-md">
          Get an exact quote for a real order.
        </h2>
        <ButtonLink href="/quote" tone="on-dark" size="lg">Get a quote</ButtonLink>
      </Section>
    </Shell>
  );
}
