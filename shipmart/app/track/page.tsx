import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { Container } from "@/components/ui";
import { TrackingPanel } from "@/components/product/TrackingPanel";

export const metadata: Metadata = {
  title: "Track a parcel",
  description: "Follow your parcel from collection to doorstep, across every carrier on the route.",
  alternates: { canonical: "/track" },
};

export default function TrackPage() {
  return (
    <Shell footer="minimal">
      {/* Mobile-first: the input sits in the first screen at 375px. */}
      <section className="py-stack-lg md:py-stack-xl">
        <Container>
          <div className="max-w-3xl mb-stack-lg">
            <h1 className="font-headline-lg text-headline-lg md:text-display-lg md:font-display-lg text-on-surface mb-stack-sm">
              Track a parcel
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Enter the tracking number from your dispatch email.
            </p>
          </div>
          <TrackingPanel />
        </Container>
      </section>
    </Shell>
  );
}
