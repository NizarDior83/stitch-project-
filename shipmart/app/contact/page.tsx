import type { Metadata } from "next";
import { Shell, PageHero } from "@/components/layout/Shell";
import { Card, Section } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/product/Forms";

export const metadata: Metadata = {
  title: "Contact & support",
  description: "Reach a person about a shipment, a quote, a claim or a press enquiry.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { icon: "package" as const, title: "An existing shipment", body: "Delays, customs holds, delivery problems.", sla: "Within one working day" },
  { icon: "bolt" as const, title: "Pricing or a new account", body: "Volume pricing, custom lanes, onboarding.", sla: "Same working day" },
  { icon: "alert" as const, title: "A damaged or lost parcel", body: "Claims, insurance, reimbursement.", sla: "Within two working days" },
  { icon: "mail" as const, title: "Press or media", body: "Interviews, brand assets, company facts.", sla: "Within three working days" },
];

export default function ContactPage() {
  return (
    <Shell>
      <PageHero
        title="Talk to a person."
        lede="No ticket-deflection maze. Pick what this is about and it goes to the team that can actually resolve it."
      />

      <Section className="pt-0">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-xl">
          {CHANNELS.map((c) => (
            <li key={c.title}>
              <Card className="h-full">
                <span className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-stack-md">
                  <Icon name={c.icon} />
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-xs">{c.title}</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md">{c.body}</p>
                <p className="font-label-md text-label-md text-status-cleared">{c.sla}</p>
              </Card>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-stack-md">
            <Card>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md">Where we are</h2>
              <div className="flex flex-col gap-stack-md">
                {[
                  ["London", "123 Logistics Way, London EC1A 1BB, United Kingdom"],
                  ["New York", "456 Trade Ave, Suite 200, New York NY 10001, United States"],
                ].map(([city, addr]) => (
                  <div key={city} className="flex items-start gap-3">
                    <Icon name="pin" className="text-primary mt-1" />
                    <div>
                      <h3 className="font-label-md text-label-md text-on-surface">{city}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{addr}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-stack-md">
                Addresses are placeholders — replace before launch.
              </p>
            </Card>

            <Card className="bg-surface-container-low">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">
                What support can and cannot do
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                We can chase a carrier, correct paperwork, refile a declaration and pay a claim. We cannot
                overrule a customs authority — when a border holds a parcel, the decision is theirs. What we
                can do is tell you straight away, and tell you exactly what would release it.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </Shell>
  );
}
