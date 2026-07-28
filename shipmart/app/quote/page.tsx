import type { Metadata } from "next";
import { Shell, PageHero } from "@/components/layout/Shell";
import { Section } from "@/components/ui";
import { RateEstimator } from "@/components/product/RateEstimator";

export const metadata: Metadata = {
  title: "Get a quote",
  description: "Price a real parcel: shipping, duties, taxes and handling, itemised. No card required.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <Shell header="minimal" footer="minimal">
      <PageHero
        title="Get a quote"
        lede="Three things and we can price it. The breakdown updates as you type, so you can see exactly where the money goes."
      />
      <Section className="pt-0"><RateEstimator mode="full" /></Section>
    </Shell>
  );
}
