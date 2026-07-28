import type { Metadata } from "next";
import { Shell, PageHero } from "@/components/layout/Shell";
import { ButtonLink, Card, Section } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { HelpBrowser } from "@/components/product/Browsers";

export const metadata: Metadata = {
  title: "Help centre",
  description: "Guides on customs, duties, volumetric weight, integrations, claims and billing.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <Shell>
      <PageHero title="How can we help?" lede="Search the guides, or jump to the answer you need." align="center" />
      <Section className="pt-0"><HelpBrowser /></Section>

      <Section tone="low">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <Card>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm flex items-center gap-2">
              <Icon name="shield" className="text-primary" /> Service status
            </h2>
            <dl className="flex flex-col gap-stack-sm">
              <div className="flex justify-between items-center">
                <dt className="font-body-md text-body-md text-on-surface">API</dt>
                <dd className="px-3 py-1 rounded-full font-label-md text-[12px] text-status-cleared bg-status-cleared-bg">
                  Operational
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="font-body-md text-body-md text-on-surface">Carrier network</dt>
                <dd className="px-3 py-1 rounded-full font-label-md text-[12px] text-status-held bg-status-held-bg">
                  1 disruption
                </dd>
              </div>
            </dl>
          </Card>
          <Card className="md:col-span-2 flex flex-col justify-center">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">Still stuck?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              Support answers within one working day. Claims within two.
            </p>
            <div className="flex flex-wrap gap-stack-md">
              <ButtonLink href="/contact">Contact support</ButtonLink>
              <ButtonLink href="/contact?topic=claim" tone="secondary">File a claim</ButtonLink>
            </div>
          </Card>
        </div>
      </Section>
    </Shell>
  );
}
