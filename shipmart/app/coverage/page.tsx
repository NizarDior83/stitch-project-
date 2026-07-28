import type { Metadata } from "next";
import Link from "next/link";
import { Shell, PageHero } from "@/components/layout/Shell";
import { ButtonLink, Card, Section } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { LaneLookup, RegionAccordion } from "@/components/product/LaneLookup";
import { COUNTRIES } from "@/lib/rates";

export const metadata: Metadata = {
  title: "Destinations & coverage",
  description:
    "Where Shipmart reaches, how long each lane takes, and how duties are treated in each destination.",
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  const ddpCount = COUNTRIES.filter((c) => c.ddp).length;
  return (
    <Shell>
      <PageHero
        title="Where Shipmart reaches."
        lede={"Live lanes into " + COUNTRIES.length + " destinations, " + ddpCount + " of them with prepaid duties. Check your route before you price it."}
      />

      <Section className="pt-0"><LaneLookup /></Section>

      <Section tone="low">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Coverage by region</h2>
        <RegionAccordion />
      </Section>

      <Section>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">
          The two words that decide who pays
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <Card>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">DDP — delivered duty paid</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              You pay duties and import tax upfront, inside the quoted price. Your customer receives the
              parcel with nothing to pay. Fewer refusals, fewer returns, higher landed price at checkout.
            </p>
          </Card>
          <Card>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">DAP — delivered at place</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The carrier collects duty from your customer at the door. Cheaper at checkout, but this is
              where refusals happen — and a refused parcel comes back at your cost.
            </p>
          </Card>
        </div>
        <Card className="mt-gutter bg-status-held-bg border-status-held/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-3">
            <Icon name="alert" className="text-status-held mt-1" />
            <div>
              <h3 className="font-label-md text-label-md text-on-surface">Some goods cannot cross some borders.</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Check before you ship. A seized parcel is not refundable.
              </p>
            </div>
          </div>
          <Link
            href="/legal/prohibited-items"
            className="shrink-0 font-label-md text-label-md text-primary underline underline-offset-4"
          >
            Prohibited &amp; restricted items
          </Link>
        </Card>
      </Section>

      <Section tone="dark" className="text-center">
        <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-stack-md">Get a quote for your lane.</h2>
        <ButtonLink href="/quote" tone="on-dark" size="lg">Get a quote</ButtonLink>
      </Section>
    </Shell>
  );
}
