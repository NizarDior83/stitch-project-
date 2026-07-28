import type { Metadata } from "next";
import { Shell, PageHero } from "@/components/layout/Shell";
import { ButtonLink, Card, Section, TableWrap } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { HOW_IT_WORKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From your shelf to their door in five moves: connect your store, get an exact landed cost, print one label, clear the border, deliver.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="How it works"
        title="From your shelf to their door, in five moves."
        lede="A transparent logistics flow built for merchants who would rather be making things than filling in customs forms."
      />

      <nav aria-label="Stages" className="sticky top-16 z-40 bg-surface/90 backdrop-blur border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex gap-stack-sm overflow-x-auto py-stack-sm">
          {HOW_IT_WORKS.stages.map((s) => (
            <a
              key={s.id}
              href={"#" + s.id}
              className="whitespace-nowrap px-4 py-2 min-h-[44px] flex items-center rounded-full font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
              {s.n}. {s.title.split(" ")[0]}
            </a>
          ))}
        </div>
      </nav>

      <Section>
        <div className="flex flex-col gap-stack-xl">
          {HOW_IT_WORKS.stages.map((stage, i) => (
            <section key={stage.id} id={stage.id} className="scroll-mt-32 grid grid-cols-1 md:grid-cols-2 gap-gutter items-start">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <span className="inline-block bg-primary/10 text-primary font-label-md text-label-md px-3 py-1 rounded-full mb-stack-sm">
                  Stage {stage.n}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">{stage.title}</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">{stage.body}</p>
              </div>
              <Card className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
                  <div>
                    <h3 className="font-label-md text-label-md text-primary mb-stack-sm">Shipmart does</h3>
                    <ul className="flex flex-col gap-stack-xs">
                      {stage.we.map((w) => (
                        <li key={w} className="flex gap-2 font-body-sm text-body-sm text-on-surface-variant">
                          <Icon name="check" size={16} className="text-status-cleared mt-0.5" /> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface mb-stack-sm">You do</h3>
                    <ul className="flex flex-col gap-stack-xs">
                      {stage.you.map((y) => (
                        <li key={y} className="flex gap-2 font-body-sm text-body-sm text-on-surface-variant">
                          <Icon name="arrow-right" size={16} className="text-outline mt-0.5" /> {y}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </section>
          ))}
        </div>
      </Section>

      <Section tone="low">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">
          What happens when things go sideways.
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {HOW_IT_WORKS.edgeCases.map((c) => (
            <li key={c.title}>
              <Card className="h-full">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-xs">{c.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md">{c.outcome}</p>
                <span className="inline-block px-3 py-1 rounded-full font-label-md text-[12px] text-status-transit bg-status-transit-bg">
                  {c.who}
                </span>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">How it compares</h2>
        <TableWrap label="Comparison of shipping approaches">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th scope="col" className="p-4 font-label-md text-label-md text-on-surface">&nbsp;</th>
                {HOW_IT_WORKS.comparison.columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={"p-4 font-label-md text-label-md text-on-surface " + (i === 2 ? "bg-primary/5" : "")}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOW_IT_WORKS.comparison.rows.map((row) => (
                <tr key={row.label} className="border-b border-outline-variant/60 last:border-0">
                  <th scope="row" className="p-4 font-body-md text-body-md text-on-surface text-left font-medium">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={v + i}
                      className={"p-4 font-body-sm text-body-sm text-on-surface-variant " + (i === 2 ? "bg-primary/5 text-on-surface" : "")}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Section>

      <Section tone="dark" className="text-center">
        <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-stack-md">
          Still have a question about your category?
        </h2>
        <div className="flex flex-wrap justify-center gap-stack-md">
          <ButtonLink href="/quote" tone="on-dark">Get a quote</ButtonLink>
          <ButtonLink href="/contact" tone="on-dark">Talk to support</ButtonLink>
        </div>
      </Section>
    </Shell>
  );
}
