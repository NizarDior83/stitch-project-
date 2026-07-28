import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { DocumentToc, SummaryCallout } from "@/components/legal/Legal";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms governing use of the Shipmart platform and shipping services.",
  alternates: { canonical: "/legal/terms" },
};

const SECTIONS = [
  { id: "acceptance", label: "1. Acceptance" },
  { id: "definitions", label: "2. Definitions" },
  { id: "obligations", label: "3. Your obligations" },
  { id: "pricing", label: "4. Pricing and payment" },
  { id: "duties", label: "5. Duties and taxes" },
  { id: "liability", label: "6. Liability and claims" },
  { id: "termination", label: "7. Termination" },
];

export default function TermsPage() {
  return (
    <Container className="py-stack-xl">
      <div className="flex flex-col lg:flex-row gap-gutter">
        <aside className="lg:w-64 shrink-0"><DocumentToc items={SECTIONS} /></aside>

        <article className="flex-grow max-w-[65ch]">
          <header className="mb-stack-xl pb-stack-md border-b border-outline-variant">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">Terms of service</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Last updated 24 October 2024</p>
          </header>

          <div
            role="note"
            className="mb-stack-xl rounded-lg border border-status-held/40 bg-status-held-bg p-6 font-body-sm text-body-sm text-on-surface"
          >
            <strong className="font-label-md text-label-md block mb-1">Placeholder text.</strong>
            This page is a working layout with representative clauses. The operative wording must be
            drafted or reviewed by a qualified lawyer before launch.
          </div>

          <section id="acceptance" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">1. Acceptance</h2>
            <SummaryCallout>Using Shipmart means agreeing to these rules. If you do not agree, do not use the service.</SummaryCallout>
            <p className="font-body-md text-body-md text-on-surface mb-stack-md">
              These terms govern your access to the Shipmart platform, website, API and associated
              logistics services. By registering an account or using the services you agree to be bound by
              them and by our privacy policy.
            </p>
            <p className="font-body-md text-body-md text-on-surface">
              We may modify these terms. Material changes are notified by email or in-product at least 30
              days before they take effect. Continued use after that date is acceptance.
            </p>
          </section>

          <section id="definitions" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">2. Definitions</h2>
            <dl className="flex flex-col gap-stack-md">
              {[
                ["Carrier", "A third-party shipping, courier or postal company integrated into the platform."],
                ["Consignment", "Any parcel or cargo tendered for delivery through the services."],
                ["Landed cost", "The total of shipping, duties, import taxes and handling for a consignment."],
                ["Prohibited items", "Goods that are illegal, dangerous or restricted, as set out in our prohibited items policy."],
              ].map(([term, def]) => (
                <div key={term}>
                  <dt className="font-label-md text-label-md text-on-surface">{term}</dt>
                  <dd className="font-body-md text-body-md text-on-surface-variant">{def}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="obligations" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">3. Your obligations</h2>
            <SummaryCallout>Declare weights, dimensions and contents accurately. Do not ship prohibited items.</SummaryCallout>
            <p className="font-body-md text-body-md text-on-surface mb-stack-md">
              You must ensure that all information provided about a consignment is accurate. Discrepancies
              may result in adjustment charges, delay, or refusal of carriage.
            </p>
            <p className="font-body-md text-body-md text-on-surface">
              You warrant that no consignment contains prohibited items and that you comply with applicable
              export and import law.
            </p>
          </section>

          <section id="pricing" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">4. Pricing and payment</h2>
            <p className="font-body-md text-body-md text-on-surface">
              Quoted prices are held for seven days. Where a declared weight or dimension proves inaccurate,
              the carrier&rsquo;s measured figure governs and the difference is billed.
            </p>
          </section>

          <section id="duties" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">5. Duties and taxes</h2>
            <SummaryCallout>On DDP we prepay duty and carry the risk of misclassification. On DAP your customer pays at the door.</SummaryCallout>
            <p className="font-body-md text-body-md text-on-surface">
              Where a consignment ships DDP and our classification proves incorrect, Shipmart bears the
              difference. Where it ships DAP, duties are the recipient&rsquo;s responsibility and a refusal
              results in return freight billed to you.
            </p>
          </section>

          <section id="liability" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">6. Liability and claims</h2>
            <p className="font-body-md text-body-md text-on-surface">
              Claims for loss or damage must be filed within 30 days of the expected delivery date.
              Liability is limited to declared value up to the insured limit for the service purchased.
            </p>
          </section>

          <section id="termination" className="scroll-mt-28">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">7. Termination</h2>
            <p className="font-body-md text-body-md text-on-surface">
              Either party may terminate with 30 days&rsquo; notice. We may suspend an account immediately
              where prohibited goods are tendered or where there is evidence of fraud.
            </p>
          </section>
        </article>
      </div>
    </Container>
  );
}
