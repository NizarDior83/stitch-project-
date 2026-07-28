"use client";

import { useEffect, useState } from "react";
import { Button, Card } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

export interface TocItem { readonly id: string; readonly label: string }

export interface DocumentTocProps {
  readonly items: readonly TocItem[];
}

/** Sticky table of contents that tracks scroll position via IntersectionObserver. */
export function DocumentToc({ items }: DocumentTocProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <h2 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-stack-sm">
        On this page
      </h2>
      <ul className="flex flex-col border-l border-outline-variant">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`block py-2 pl-4 -ml-px border-l-2 font-body-sm text-body-sm transition-colors ${
                  on
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export interface SummaryCalloutProps {
  readonly children: React.ReactNode;
}

export function SummaryCallout({ children }: SummaryCalloutProps) {
  return (
    <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 my-stack-md flex gap-4">
      <Icon name="info" className="text-primary mt-1" />
      <div>
        <p className="font-label-md text-label-md text-on-surface mb-1">In plain language</p>
        <div className="font-body-sm text-body-sm text-on-surface-variant">{children}</div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          A summary, not a replacement for the clause above.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ cookie prefs */

const CATEGORIES = [
  {
    id: "necessary",
    title: "Strictly necessary",
    body: "Sign-in, security and load balancing. The site does not work without these.",
    locked: true,
  },
  {
    id: "performance",
    title: "Performance",
    body: "Counts visits and traffic sources so we can see which pages are failing people.",
    locked: false,
  },
  {
    id: "functional",
    title: "Functional",
    body: "Remembers your preferences, such as origin country and language.",
    locked: false,
  },
] as const;

const STORAGE_KEY = "shipmart.cookie-prefs";

export function CookiePrefs() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    necessary: true,
    performance: true,
    functional: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefs((p) => ({ ...p, ...JSON.parse(raw) }));
    } catch {
      /* storage unavailable — defaults stand */
    }
  }, []);

  function save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 4000);
  }

  return (
    <div className="flex flex-col gap-stack-sm">
      {CATEGORIES.map((c) => {
        const on = prefs[c.id];
        return (
          <Card key={c.id} className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">{c.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{c.body}</p>
              {c.locked && (
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Always on — cannot be switched off.</p>
              )}
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={on}
              aria-label={`${c.title} cookies`}
              disabled={c.locked}
              onClick={() => setPrefs((p) => ({ ...p, [c.id]: !p[c.id] }))}
              className={`shrink-0 mt-1 relative w-12 h-7 rounded-full transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
                on ? "bg-primary" : "bg-outline-variant"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-150 ${
                  on ? "translate-x-5" : ""
                }`}
              />
            </button>
          </Card>
        );
      })}

      <div className="flex items-center gap-4 mt-stack-sm">
        <Button onClick={save}>Save preferences</Button>
        {saved && (
          <p role="status" className="font-body-sm text-body-sm text-status-cleared flex items-center gap-2">
            <Icon name="check" size={16} /> Saved to this browser.
          </p>
        )}
      </div>
    </div>
  );
}
