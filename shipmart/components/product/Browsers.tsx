"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ARTICLES,
  HELP_CATEGORIES,
  INTEGRATIONS,
  INTEGRATION_CATEGORIES,
  RESTRICTED_ITEMS,
  type RestrictedItem,
} from "@/lib/content";
import { COUNTRIES } from "@/lib/rates";
import { Card, Field, inputClass } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

/* --------------------------------------------------------------- filters */

function Chips({
  options,
  active,
  onChange,
  label,
}: {
  readonly options: string[];
  readonly active: string;
  readonly onChange: (v: string) => void;
  readonly label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-stack-sm">
      {options.map((opt) => {
        const on = opt === active;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={on}
            className={`px-4 py-2 min-h-[44px] rounded-full font-label-md text-label-md transition-colors duration-150 ${
              on
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------- integrations */

const STATUS_TONE: Record<string, string> = {
  Available: "text-status-cleared bg-status-cleared-bg",
  Beta: "text-status-transit bg-status-transit-bg",
  "Coming soon": "text-status-held bg-status-held-bg",
};

export function IntegrationBrowser() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INTEGRATIONS.filter(
      (i) =>
        (category === "All" || i.category === category) &&
        (q === "" || i.name.toLowerCase().includes(q) || i.blurb.toLowerCase().includes(q))
    );
  }, [category, query]);

  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="max-w-md">
        <Field id="integration-search" label="Find your platform">
          <div className="relative">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              id="integration-search"
              type="search"
              className={`${inputClass} pl-10`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </Field>
      </div>

      <Chips options={INTEGRATION_CATEGORIES} active={category} onChange={setCategory} label="Filter by category" />

      <p role="status" className="font-body-sm text-body-sm text-on-surface-variant">
        Showing {results.length} of {INTEGRATIONS.length} integrations.
      </p>

      {results.length === 0 ? (
        <Card className="text-center py-stack-lg">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">
            No integration matches “{query}”
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
            You can still connect any platform through the REST API, or tell us what you use and we will
            look at building it.
          </p>
          <Link href="/contact" className="font-label-md text-label-md text-primary underline underline-offset-4">
            Request an integration
          </Link>
        </Card>
      ) : (
        <>
          <h2 className="sr-only">Available integrations</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {results.map((i) => (
            <li key={i.name}>
              <Card className="h-full flex flex-col hover:shadow-[0_4px_20px_rgba(11,19,39,0.06)] transition-shadow duration-150">
                <div className="flex justify-between items-start mb-stack-md">
                  <span
                    aria-hidden="true"
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${i.tone}`}
                  >
                    {i.initial}
                  </span>
                  <span className={`px-2 py-1 rounded-full font-label-md text-[12px] ${STATUS_TONE[i.status]}`}>
                    {i.status}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-xs">{i.name}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">{i.blurb}</p>
                <p className="mt-stack-md font-body-sm text-body-sm text-on-surface-variant">{i.category}</p>
              </Card>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ help */

export function HelpBrowser() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter(
      (a) =>
        (category === "All" || a.category === category) &&
        (q === "" || a.title.toLowerCase().includes(q) || a.blurb.toLowerCase().includes(q))
    );
  }, [category, query]);

  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="max-w-2xl mx-auto w-full">
        <Field id="help-search" label="Search the help centre">
          <div className="relative">
            <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              id="help-search"
              type="search"
              placeholder="customs, duties, volumetric weight…"
              className={`${inputClass} pl-12 py-4 text-body-lg`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </Field>
      </div>

      <Chips options={["All", ...HELP_CATEGORIES]} active={category} onChange={setCategory} label="Filter articles" />

      <p role="status" className="font-body-sm text-body-sm text-on-surface-variant">
        {results.length} article{results.length === 1 ? "" : "s"}.
      </p>

      {results.length === 0 ? (
        <Card>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">
            Nothing matches “{query}”
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
            Try a broader word — “duty” rather than “duty rate for ceramics” — or ask us directly.
          </p>
          <Link href="/contact" className="font-label-md text-label-md text-primary underline underline-offset-4">
            Contact support
          </Link>
        </Card>
      ) : (
        <>
          <h2 className="sr-only">Help articles</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {results.map((a) => (
            <li key={a.title}>
              <Card className="h-full flex flex-col">
                <p className="font-label-md text-label-md text-primary mb-stack-xs">{a.category}</p>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-xs">{a.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">{a.blurb}</p>
                <p className="mt-stack-md font-body-sm text-body-sm text-on-surface-variant tabular">{a.minutes} min read</p>
              </Card>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------- prohibited / restricted */

const VERDICT: Record<RestrictedItem["verdict"], { label: string; tone: string }> = {
  allowed: { label: "Allowed", tone: "text-status-cleared bg-status-cleared-bg" },
  restricted: { label: "Restricted", tone: "text-status-held bg-status-held-bg" },
  prohibited: { label: "Prohibited", tone: "text-status-exception bg-status-exception-bg" },
};

export function RestrictedLookup() {
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return RESTRICTED_ITEMS;
    return RESTRICTED_ITEMS.filter(
      (i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-stack-lg">
      <Card className="bg-surface-container-low">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
          <Field id="item-search" label="Search for an item">
            <div className="relative">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                id="item-search"
                type="search"
                placeholder="battery, perfume, seeds…"
                className={`${inputClass} pl-10`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </Field>
          <Field id="item-destination" label="Destination" hint="Rules vary by country. This page is a starting point, not a ruling.">
            <select
              id="item-destination"
              className={inputClass}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Any destination</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>
      </Card>

      <p role="status" className="font-body-sm text-body-sm text-on-surface-variant">
        {results.length} item{results.length === 1 ? "" : "s"}
        {destination && ` · showing general rules; ${COUNTRIES.find((c) => c.code === destination)?.name} may add its own`}
      </p>

      {results.length === 0 ? (
        <Card>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">
            We do not have a rule listed for “{query}”
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
            That does not mean it is allowed. Ask before you ship — a seized parcel is not refundable.
          </p>
          <Link href="/contact" className="font-label-md text-label-md text-primary underline underline-offset-4">
            Ask about this item
          </Link>
        </Card>
      ) : (
        <>
          <h2 className="sr-only">Item rulings</h2>
          <ul className="flex flex-col gap-stack-sm">
          {results.map((item) => (
            <li key={item.name}>
              <Card className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* The verdict is a word first, colour second. */}
                <span
                  className={`shrink-0 px-3 py-1 rounded-full font-label-md text-label-md self-start ${VERDICT[item.verdict].tone}`}
                >
                  {VERDICT[item.verdict].label}
                </span>
                <div className="flex-grow">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{item.detail}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{item.category}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
}
