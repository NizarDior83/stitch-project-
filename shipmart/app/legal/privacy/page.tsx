import type { Metadata } from "next";
import { Container, TableWrap } from "@/components/ui";
import { CookiePrefs, DocumentToc, SummaryCallout } from "@/components/legal/Legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What data Shipmart collects, why, who it is shared with, and how long it is kept.",
  alternates: { canonical: "/legal/privacy" },
};

const SECTIONS = [
  { id: "summary", label: "In short" },
  { id: "collect", label: "What we collect" },
  { id: "sharing", label: "Who we share it with" },
  { id: "rights", label: "Your rights" },
  { id: "cookies", label: "Cookie settings" },
  { id: "contact", label: "Contact" },
];

const DATA = [
  ["Account", "Name, email, business name", "Contract", "Life of account + 6 years"],
  ["Shipment", "Addresses, parcel details, customs declarations", "Contract and legal obligation", "7 years (customs law)"],
  ["Payment", "Billing address, card token", "Contract", "7 years (tax law)"],
  ["Usage", "IP address, browser, pages viewed", "Legitimate interest", "14 months"],
];

export default function PrivacyPage() {
  return (
    <Container className="py-stack-xl">
      <div className="flex flex-col lg:flex-row gap-gutter">
        <aside className="lg:w-64 shrink-0"><DocumentToc items={SECTIONS} /></aside>

        <article className="flex-grow max-w-[65ch]">
          <header className="mb-stack-xl pb-stack-md border-b border-outline-variant">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">Privacy policy</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Last updated 24 October 2024</p>
          </header>

          <div
            role="note"
            className="mb-stack-xl rounded-lg border border-status-held/40 bg-status-held-bg p-6 font-body-sm text-body-sm text-on-surface"
          >
            <strong className="font-label-md text-label-md block mb-1">Placeholder text.</strong>
            Representative wording only. A qualified lawyer must review this before launch.
          </div>

          <section id="summary" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">In short</h2>
            <SummaryCallout>
              We collect what we need to move your parcel and bill you for it. Customs authorities and
              carriers get the shipment data they legally require. We do not sell anything to advertisers.
            </SummaryCallout>
          </section>

          <section id="collect" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">What we collect</h2>
            <TableWrap label="Data categories, purpose, lawful basis and retention">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    {["Category", "Examples", "Lawful basis", "Kept for"].map((h) => (
                      <th key={h} scope="col" className="p-3 font-label-md text-label-md text-on-surface">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DATA.map((row) => (
                    <tr key={row[0]} className="border-b border-outline-variant/60 last:border-0">
                      <th scope="row" className="p-3 font-label-md text-label-md text-on-surface text-left">{row[0]}</th>
                      <td className="p-3 font-body-sm text-body-sm text-on-surface-variant">{row[1]}</td>
                      <td className="p-3 font-body-sm text-body-sm text-on-surface-variant">{row[2]}</td>
                      <td className="p-3 font-body-sm text-body-sm text-on-surface-variant">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          </section>

          <section id="sharing" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">Who we share it with</h2>
            <p className="font-body-md text-body-md text-on-surface">
              Carriers and customs brokers receive the shipment data required to move and clear the parcel.
              Customs authorities receive declarations as required by law. Payment processors receive
              billing data. Nobody receives your data for advertising.
            </p>
          </section>

          <section id="rights" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">Your rights</h2>
            <p className="font-body-md text-body-md text-on-surface">
              You can request a copy of your data, correct it, or ask us to delete it. Customs records we
              are legally required to retain are the one exception, and we will tell you when that applies.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-28 mb-stack-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">Cookie settings</h2>
            <p className="font-body-md text-body-md text-on-surface mb-stack-lg">
              Change these at any time. Your choice is stored in this browser.
            </p>
            <CookiePrefs />
          </section>

          <section id="contact" className="scroll-mt-28">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">Contact</h2>
            <p className="font-body-md text-body-md text-on-surface">
              Data protection enquiries go to our DPO through the{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">contact form</a>.
            </p>
          </section>
        </article>
      </div>
    </Container>
  );
}
