import type { Metadata } from "next";
import { Shell, PageHero } from "@/components/layout/Shell";
import { ButtonLink, Card, Section } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { IntegrationBrowser } from "@/components/product/Browsers";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect Shopify, WooCommerce, Etsy, Amazon and more. Orders sync in, labels and tracking go back out.",
  alternates: { canonical: "/integrations" },
};

const SAMPLE = `curl -X POST https://api.shipmart.example.com/v1/shipments \\
  -H "Authorization: Bearer $SHIPMART_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin":      { "country": "GB", "postcode": "EC1A 1BB" },
    "destination": { "country": "DE", "postcode": "10115" },
    "parcel":      { "weight_kg": 2.5, "dims_cm": [20, 15, 10] },
    "goods":       { "category": "jewellery", "value_usd": 145 },
    "terms":       "DDP"
  }'`;

export default function IntegrationsPage() {
  return (
    <Shell>
      <PageHero
        title="Connect your store in minutes."
        lede="Orders sync in automatically. Labels and tracking numbers go back out. No copy-paste, no CSV round trips."
      />

      <Section className="pt-0"><IntegrationBrowser /></Section>

      <Section tone="low">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Three steps to connect</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            ["Authorise", "Grant Shipmart permission to read orders and write tracking back. Revocable at any time."],
            ["Map your catalogue", "We suggest an HS code per product. Confirm once and it applies to every repeat item."],
            ["Enable auto-quote", "New orders arrive already priced, with a landed cost attached."],
          ].map(([title, body], i) => (
            <li key={title}>
              <Card className="h-full">
                <span aria-hidden="true" className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md tabular mb-stack-md">
                  {i + 1}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-xs">{title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-stack-md">
              Or build straight against the API.
            </h2>
            <p className="font-body-lg text-body-lg text-on-dark-muted mb-stack-lg">
              A REST API with webhooks and a sandbox that returns realistic customs outcomes, including the
              failure cases. Rate limits are published, not discovered.
            </p>
            <div className="flex flex-wrap gap-stack-md">
              <ButtonLink href="/help" tone="on-dark">Read the API docs</ButtonLink>
              <ButtonLink href="/signup" tone="on-dark">Get a sandbox key</ButtonLink>
            </div>
          </div>
          <div className="rounded-xl border border-on-secondary-fixed-variant bg-on-secondary-fixed overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-on-secondary-fixed-variant">
              <span className="font-data-tabular text-data-tabular uppercase tracking-wider text-on-dark-muted">
                POST /v1/shipments
              </span>
              <Icon name="terminal" className="text-on-dark-primary" />
            </div>
            <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed text-surface-dim">
              <code>{SAMPLE}</code>
            </pre>
          </div>
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">Not seeing your platform?</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-stack-lg">
          Tell us what you use. If enough merchants ask for the same one, we build it.
        </p>
        <ButtonLink href="/contact">Request an integration</ButtonLink>
      </Section>
    </Shell>
  );
}
