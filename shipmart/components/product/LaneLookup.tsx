"use client";

import { useMemo, useState } from "react";
import { COUNTRIES, findCountry, formatMoney, serviceOptions } from "@/lib/rates";
import { REGIONS } from "@/lib/coverage";
import { Button, Card, Field, TableWrap, inputClass } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

export function LaneLookup() {
  const [from, setFrom] = useState("GB");
  const [to, setTo] = useState("");
  const [checked, setChecked] = useState<{ from: string; to: string } | null>(null);

  const services = useMemo(() => (checked ? serviceOptions(checked.to, 2) : []), [checked]);
  const dest = checked ? findCountry(checked.to) : undefined;
  const origin = checked ? findCountry(checked.from) : undefined;

  return (
    <Card className="flex flex-col gap-stack-md">
      <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
        <Icon name="globe" className="text-primary" /> Check a lane
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-stack-md items-end">
        <Field id="lane-from" label="Ship from">
          <select id="lane-from" className={inputClass} value={from} onChange={(e) => setFrom(e.target.value)}>
            {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </Field>
        <div aria-hidden="true" className="hidden md:flex items-center justify-center pb-3 text-outline">
          <Icon name="arrow-right" />
        </div>
        <Field id="lane-to" label="Ship to">
          <select id="lane-to" className={inputClass} value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">Select a destination</option>
            {COUNTRIES.filter((c) => c.code !== from).map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Button onClick={() => to && setChecked({ from, to })} disabled={!to} className="w-full md:w-auto">
          Check
        </Button>
      </div>

      {!checked && (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Pick an origin and a destination to see transit windows, duty treatment and any
          restrictions on that route.
        </p>
      )}

      {checked && dest && origin && (
        <div className="flex flex-col gap-stack-md" role="status">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-stack-sm border-b border-outline-variant">
            <p className="font-label-md text-label-md text-on-surface">
              {origin.name} → {dest.name}
            </p>
            <span className="px-3 py-1 rounded-full font-label-md text-label-md text-status-cleared bg-status-cleared-bg">
              Active lane
            </span>
          </div>

          <TableWrap label={`Service levels from ${origin.name} to ${dest.name}`}>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th scope="col" className="p-3 font-label-md text-label-md text-on-surface">Service</th>
                  <th scope="col" className="p-3 font-label-md text-label-md text-on-surface">Transit</th>
                  <th scope="col" className="p-3 font-label-md text-label-md text-on-surface text-right">From (2 kg)</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-outline-variant/60 last:border-0">
                    <td className="p-3 font-body-md text-body-md text-on-surface">{s.label}</td>
                    <td className="p-3 font-data-tabular text-data-tabular tabular text-on-surface-variant">
                      {s.transit[0]}–{s.transit[1]} working days
                    </td>
                    <td className="p-3 font-data-tabular text-data-tabular tabular text-on-surface text-right">
                      {formatMoney(s.shipping)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            <div>
              <dt className="font-label-md text-label-md text-on-surface-variant mb-1">Duty treatment</dt>
              <dd className="font-body-md text-body-md text-on-surface">
                {dest.ddp ? "DDP available — you can prepay duties" : "DAP only — the recipient settles duties"}
              </dd>
            </div>
            <div>
              <dt className="font-label-md text-label-md text-on-surface-variant mb-1">De-minimis</dt>
              <dd className="font-body-md text-body-md text-on-surface tabular">
                {dest.deMinimis > 0 ? `${formatMoney(dest.deMinimis)} — below this, duty is usually waived` : "None — duty applies from the first cent"}
              </dd>
            </div>
            <div>
              <dt className="font-label-md text-label-md text-on-surface-variant mb-1">Import VAT / GST</dt>
              <dd className="font-body-md text-body-md text-on-surface tabular">
                {dest.vat > 0 ? `${(dest.vat * 100).toFixed(0)}%` : "Not applied at import"}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </Card>
  );
}

export function RegionAccordion() {
  const [open, setOpen] = useState<string | null>(REGIONS[0].id);

  return (
    <div className="flex flex-col gap-stack-sm">
      {REGIONS.map((region) => {
        const expanded = open === region.id;
        return (
          <div key={region.id} className="border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : region.id)}
                aria-expanded={expanded}
                aria-controls={`region-${region.id}`}
                className="w-full flex items-center justify-between gap-4 p-6 text-left min-h-[44px] hover:bg-surface-container-low transition-colors"
              >
                <span>
                  <span className="block font-headline-sm text-headline-sm text-on-surface">{region.name}</span>
                  <span className="block font-body-sm text-body-sm text-on-surface-variant mt-1">{region.blurb}</span>
                </span>
                <Icon
                  name="chevron-down"
                  className={`text-outline transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            {expanded && (
              <div id={`region-${region.id}`} className="px-6 pb-6">
                <TableWrap label={`${region.name} destinations`}>
                  <table className="w-full text-left min-w-[560px]">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-outline-variant">
                        <th scope="col" className="p-3 font-label-md text-label-md text-on-surface">Country</th>
                        <th scope="col" className="p-3 font-label-md text-label-md text-on-surface">Transit</th>
                        <th scope="col" className="p-3 font-label-md text-label-md text-on-surface">Duties</th>
                        <th scope="col" className="p-3 font-label-md text-label-md text-on-surface">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {region.rows.map((row) => (
                        <tr key={row.code} className="border-b border-outline-variant/60 last:border-0">
                          <td className="p-3 font-body-md text-body-md text-on-surface">{row.country}</td>
                          <td className="p-3 font-data-tabular text-data-tabular tabular text-on-surface-variant">{row.transit}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full font-label-md text-[12px] ${
                                row.ddp ? "text-status-cleared bg-status-cleared-bg" : "text-status-held bg-status-held-bg"
                              }`}
                            >
                              {row.ddp ? "DDP available" : "DAP only"}
                            </span>
                          </td>
                          <td className="p-3 font-body-sm text-body-sm text-on-surface-variant">{row.note ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableWrap>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
