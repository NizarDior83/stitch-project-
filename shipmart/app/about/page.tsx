import type { Metadata } from "next";
import { Shell, PageHero } from "@/components/layout/Shell";
import { ButtonLink, Card, Section, Unverified } from "@/components/ui";
import { ABOUT } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Why Shipmart exists, what we believe about cross-border trade, and who is building it.",
  alternates: { canonical: "/about" },
};

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export default function AboutPage() {
  return (
    <Shell>
      <PageHero title={ABOUT.headline} lede={ABOUT.intro} />

      <Section tone="low">
        <p className="font-headline-lg text-headline-lg text-on-surface max-w-4xl mx-auto text-center text-balance">
          {ABOUT.mission}
        </p>
      </Section>

      <Section>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {ABOUT.stats.map((s) => (
            <li key={s.label} className="border-t border-outline-variant pt-stack-md">
              <p className="font-headline-lg text-headline-lg text-primary tabular mb-stack-xs">
                <Unverified note="confirm before launch">{s.figure}</Unverified>
              </p>
              <p className="font-label-md text-label-md text-on-surface-variant">{s.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="low">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Operating principles</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {ABOUT.values.map((v) => (
            <li key={v.title}>
              <Card className="h-full">
                <h3 className="font-headline-sm text-headline-sm lowercase text-primary mb-stack-sm">{v.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{v.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="careers">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Leadership</h2>
          <ButtonLink href="/contact" tone="secondary">See open roles</ButtonLink>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {ABOUT.team.map((m) => (
            <li key={m.name}>
              <Card className="h-full">
                {/* Initials avatar rather than a stock headshot — see README on why the
                    Stitch image URLs were not carried over. */}
                <span
                  aria-hidden="true"
                  className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-primary mb-stack-md"
                >
                  {initials(m.name)}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  <Unverified note="replace with a real person or remove the section">{m.name}</Unverified>
                </h3>
                <p className="font-label-md text-label-md text-on-surface-variant mt-1">{m.role}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </Shell>
  );
}
