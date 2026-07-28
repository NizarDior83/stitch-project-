import Link from "next/link";
import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import { ButtonLink, Card, Container, Section, Unverified } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { HOME } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shipmart — every border, handled",
  description:
    "Print one label and we clear customs, prepay the duties and deliver to the door. Landed cost before you commit. No monthly fee, no volume minimum.",
  alternates: { canonical: "/" },
};

/** The hero visual: built as markup, not a photograph. Interface over photography. */
function LandedCostPanel() {
  const lines = [
    ["Shipping (Express)", "$22.40"],
    ["Duties (HS 7113.11)", "$8.50"],
    ["Import VAT (20%)", "$4.10"],
    ["Handling", "$2.00"],
  ];
  return (
    <div className="bg-surface-container-low rounded-xl p-stack-lg border border-outline-variant relative overflow-hidden">
      <div aria-hidden="true" className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div aria-hidden="true" className="absolute -left-8 top-1/2 w-24 h-24 bg-tertiary/5 rounded-full blur-xl" />
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-stack-md relative">
        <div className="flex justify-between items-center pb-stack-sm mb-stack-md border-b border-outline-variant">
          <span className="font-label-md text-label-md text-on-surface">Landed cost breakdown</span>
          <span className="font-label-md text-label-md text-primary bg-primary/10 px-2 py-1 rounded">
            London → Berlin
          </span>
        </div>
        <dl className="flex flex-col gap-stack-sm">
          {lines.map(([label, amount]) => (
            <div key={label} className="flex justify-between font-data-tabular text-data-tabular text-on-surface-variant">
              <dt>{label}</dt>
              <dd className="tabular">{amount}</dd>
            </div>
          ))}
        </dl>
        <div className="flex justify-between items-baseline mt-stack-md pt-stack-sm border-t border-outline-variant">
          <span className="font-headline-sm text-headline-sm text-on-surface">Total</span>
          <span className="font-headline-sm text-headline-sm text-primary tabular">$37.00</span>
        </div>
        <p className="mt-stack-sm font-body-sm text-body-sm text-status-cleared flex items-center gap-1.5">
          <Icon name="check" size={14} /> Duties prepaid — nothing to pay on delivery
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Shell>
      {/* 1 — hero */}
      <section className="py-stack-xl md:py-[120px]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="flex flex-col gap-stack-lg md:pr-stack-xl">
              <div className="flex flex-col gap-stack-md">
                <h1 className="font-display-lg text-display-lg text-on-surface text-balance">
                  {HOME.hero.headline}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">{HOME.hero.sub}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-stack-md">
                <ButtonLink href="/quote">Get a quote</ButtonLink>
                <ButtonLink href="/how-it-works" tone="secondary">See how it works</ButtonLink>
              </div>
              <p className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <Icon name="check" size={16} className="text-status-cleared" />
                {HOME.hero.reassurance}
              </p>
            </div>
            <LandedCostPanel />
          </div>
        </Container>
      </section>

      {/* 2 — trust strip */}
      <section className="bg-surface-container border-y border-outline-variant py-stack-md">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-stack-md">
          <p className="font-label-md text-label-md text-on-surface-variant">
            <Unverified note="confirm merchant and country counts before launch">
              {HOME.trust.unverifiedLine}
            </Unverified>
          </p>
          <ul className="flex items-center gap-stack-lg opacity-60">
            {HOME.trust.logos.map((logo) => (
              <li key={logo} className="font-headline-md text-headline-md tracking-tighter text-on-surface">
                {logo}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3 — three pillars */}
      <Section>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {HOME.pillars.map((p) => (
            <li key={p.id}>
              <Card className="h-full">
                {/* Lower-case action titles — a deliberate signal that these are functions, not slogans. */}
                <h2 className="font-headline-lg text-headline-lg lowercase text-primary mb-stack-sm">{p.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">{p.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4 — narrative explainer */}
      <Section tone="low">
        <h2 className="font-headline-lg text-headline-lg text-on-surface max-w-2xl mb-stack-xl text-balance">
          Shipping across a border is three problems, not one.
        </h2>
        <dl className="flex flex-col gap-stack-xl">
          {HOME.friction.map((f, i) => (
            <div key={f.q} className={`max-w-2xl ${i % 2 === 1 ? "md:ml-auto md:text-right" : ""}`}>
              <dt className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">{f.q}</dt>
              <dd className="font-body-lg text-body-lg text-on-surface-variant">{f.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-stack-xl">
          <Link href="/how-it-works" className="font-label-md text-label-md text-primary underline underline-offset-4">
            Read the full process
          </Link>
        </p>
      </Section>

      {/* 5 — three steps */}
      <Section>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-xl">Three steps, then it is out of your hands.</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {HOME.steps.map((s) => (
            <li key={s.n}>
              <Card className="h-full flex flex-col">
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md mb-stack-md tabular"
                >
                  {s.n}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-xs">{s.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant flex-grow">{s.body}</p>
                {s.cta && (
                  <Link
                    href={s.cta.href}
                    className="mt-stack-md font-label-md text-label-md text-primary inline-flex items-center gap-1 underline underline-offset-4"
                  >
                    {s.cta.label} <Icon name="arrow-right" size={16} />
                  </Link>
                )}
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6 — the problem, dark inversion */}
      <Section tone="dark">
        <h2 className="font-headline-lg text-headline-lg text-surface-bright max-w-3xl mb-stack-md text-balance">
          {HOME.problem.headline}
        </h2>
        <p className="font-body-md text-body-md text-on-dark-muted max-w-2xl mb-stack-xl">{HOME.problem.body}</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {HOME.problem.stats.map((s) => (
            <li key={s.label} className="border-t border-on-secondary-fixed-variant pt-stack-md">
              <p className="font-display-lg text-display-lg text-on-dark-primary tabular mb-stack-sm">
                <Unverified note="replace with a sourced statistic or cut this section">{s.figure}</Unverified>
              </p>
              <p className="font-label-md text-label-md text-surface-bright">{s.label}</p>
              <p className="font-body-sm text-body-sm text-on-dark-muted mt-1">{s.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7 — network */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">{HOME.network.headline}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{HOME.network.body}</p>
          </div>
          {/* Schematic, not a literal globe. */}
          <div className="relative aspect-[4/3] rounded-xl border border-outline-variant bg-surface-container-low overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full" role="img" aria-label="Schematic diagram of trade lanes between five regional hubs.">
              <g stroke="#003ec7" strokeOpacity="0.25" strokeWidth="1.5" fill="none">
                <path d="M80 90 C160 40, 240 60, 320 80" />
                <path d="M80 90 C140 140, 220 170, 300 200" />
                <path d="M320 80 C340 140, 300 190, 300 200" />
                <path d="M80 90 C120 200, 180 240, 200 250" />
                <path d="M300 200 C260 240, 220 250, 200 250" />
                <path d="M320 80 C240 120, 160 130, 80 90" />
              </g>
              {[
                [80, 90, "Origin hub"],
                [320, 80, "Europe"],
                [300, 200, "MENA"],
                [200, 250, "APAC"],
              ].map(([cx, cy, label]) => (
                <g key={String(label)}>
                  <circle cx={cx as number} cy={cy as number} r="7" fill="#003ec7" />
                  <circle cx={cx as number} cy={cy as number} r="14" fill="#003ec7" fillOpacity="0.12" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </Section>

      {/* 8 — macro closing */}
      <Section tone="dark" className="text-center">
        <h2 className="font-display-lg text-display-lg text-surface-bright mb-stack-md text-balance">
          {HOME.closing.headline}
        </h2>
        <p className="font-body-lg text-body-lg text-on-dark-muted max-w-xl mx-auto mb-stack-lg">{HOME.closing.sub}</p>
        <ButtonLink href="/quote" tone="on-dark" size="lg">Get a quote</ButtonLink>
      </Section>
    </Shell>
  );
}
