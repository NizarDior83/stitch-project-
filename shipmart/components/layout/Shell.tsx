import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export interface ShellProps {
  readonly children: ReactNode;
  readonly header?: "full" | "minimal";
  readonly footer?: "full" | "minimal";
}

export function Shell({ children, header = "full", footer = "full" }: ShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader variant={header} />
      <main id="main" className="flex-grow">
        {children}
      </main>
      <SiteFooter variant={footer} />
    </div>
  );
}

export interface PageHeroProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly lede?: string;
  readonly children?: ReactNode;
  readonly align?: "left" | "center";
}

export function PageHero({ eyebrow, title, lede, children, align = "left" }: PageHeroProps) {
  const centered = align === "center";
  return (
    <section className="py-stack-xl">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className={centered ? "max-w-3xl mx-auto text-center" : "max-w-3xl"}>
          {eyebrow && (
            <p className="font-label-md text-label-md uppercase tracking-[0.16em] text-primary mb-stack-sm">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-md text-balance">{title}</h1>
          {lede && <p className="font-body-lg text-body-lg text-on-surface-variant">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
