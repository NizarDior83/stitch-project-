"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  COUNTRIES,
  formatMoney,
  quote,
  serviceOptions,
  volumetricWeight,
  type DutyTerms,
  type ServiceLevel,
} from "@/lib/rates";
import { Button, Card, Field, inputClass } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

type Errors = Partial<Record<string, string>>;

export interface RateEstimatorProps {
  /** "full" adds the service picker, duty terms and contact capture (the /quote page). */
  readonly mode?: "compact" | "full";
}

export function RateEstimator({ mode = "compact" }: RateEstimatorProps) {
  const [originCode, setOrigin] = useState("GB");
  const [destinationCode, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [value, setValue] = useState("");
  const [categoryId, setCategory] = useState("jewellery");
  const [service, setService] = useState<ServiceLevel>("standard");
  const [terms, setTerms] = useState<DutyTerms>("DDP");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    if (touched.destination && !destinationCode) e.destination = "Choose where the parcel is going.";
    if (touched.weight) {
      const w = num(weight);
      if (Number.isNaN(w)) e.weight = "Enter the parcel weight in kilograms.";
      else if (w <= 0) e.weight = "Weight must be greater than zero.";
      else if (w > 70) e.weight = "Parcels over 70 kg need a freight quote — contact us.";
    }
    if (touched.value) {
      const v = num(value);
      if (Number.isNaN(v)) e.value = "Enter the declared value of the contents.";
      else if (v < 0) e.value = "Declared value cannot be negative.";
    }
    for (const [key, raw] of [["length", length], ["width", width], ["height", height]] as const) {
      if (touched[key] && raw.trim() !== "" && (Number.isNaN(num(raw)) || num(raw) <= 0)) {
        e[key] = "Must be a positive number.";
      }
    }
    return e;
  }, [touched, destinationCode, weight, value, length, width, height]);

  const ready =
    destinationCode !== "" && !Number.isNaN(num(weight)) && num(weight) > 0 && !Number.isNaN(num(value));

  const chargeable = useMemo(() => {
    const vol = volumetricWeight(num(length) || 0, num(width) || 0, num(height) || 0);
    return Math.max(num(weight) || 0, vol, 0.5);
  }, [weight, length, width, height]);

  const services = useMemo(
    () => (destinationCode ? serviceOptions(destinationCode, chargeable) : []),
    [destinationCode, chargeable]
  );

  const result = useMemo(() => {
    if (!ready) return null;
    return quote({
      originCode,
      destinationCode,
      weightKg: num(weight),
      lengthCm: num(length) || 0,
      widthCm: num(width) || 0,
      heightCm: num(height) || 0,
      declaredValue: num(value),
      categoryId,
      service,
      terms,
    });
  }, [ready, originCode, destinationCode, weight, length, width, height, value, categoryId, service, terms]);

  const category = CATEGORIES.find((c) => c.id === categoryId);
  const blur = (k: string) => setTouched((t) => ({ ...t, [k]: true }));

  function onSubmit() {
    setTouched({ destination: true, weight: true, value: true });
    if (!ready || Object.keys(errors).length > 0) return;
    setSubmitting(true);
    // Stands in for POST /v1/quotes.
    window.setTimeout(() => {
      setSubmitting(false);
      setReference(`SMQ-${Math.floor(100000 + Math.random() * 899999)}`);
    }, 700);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
      {/* ------------------------------------------------------------ form */}
      <Card className="lg:col-span-7 flex flex-col gap-stack-md">
        <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
          <Icon name="package" className="text-primary" />
          Parcel details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
          <Field id="origin" label="Ship from">
            <select id="origin" className={inputClass} value={originCode} onChange={(e) => setOrigin(e.target.value)}>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </Field>

          <Field id="destination" label="Ship to" error={errors.destination}>
            <select
              id="destination"
              className={inputClass}
              value={destinationCode}
              onChange={(e) => setDestination(e.target.value)}
              onBlur={() => blur("destination")}
              aria-invalid={Boolean(errors.destination)}
              aria-describedby={errors.destination ? "destination-error" : undefined}
            >
              <option value="">Select a destination</option>
              {COUNTRIES.filter((c) => c.code !== originCode).map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
          <Field id="weight" label="Weight (kg)" error={errors.weight}>
            <input
              id="weight"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              className={`${inputClass} tabular`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onBlur={() => blur("weight")}
              aria-invalid={Boolean(errors.weight)}
              aria-describedby={errors.weight ? "weight-error" : undefined}
            />
          </Field>

          <Field
            id="value"
            label="Declared value (USD)"
            hint="What the contents are worth. Duty is calculated on this."
            error={errors.value}
          >
            <input
              id="value"
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              className={`${inputClass} tabular`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => blur("value")}
              aria-invalid={Boolean(errors.value)}
              aria-describedby={errors.value ? "value-error" : undefined}
            />
          </Field>
        </div>

        <fieldset className="flex flex-col gap-stack-xs">
          <legend className="font-label-md text-label-md text-on-surface-variant mb-stack-xs">
            Dimensions (cm) — optional
          </legend>
          <div className="grid grid-cols-3 gap-stack-sm">
            {([["length", length, setLength, "Length"], ["width", width, setWidth, "Width"], ["height", height, setHeight, "Height"]] as const).map(
              ([key, val, set, label]) => (
                <Field key={key} id={key} label={label} error={errors[key]}>
                  <input
                    id={key}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    className={`${inputClass} tabular`}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    onBlur={() => blur(key)}
                  />
                </Field>
              )
            )}
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Carriers charge on whichever is greater: actual weight, or volumetric weight
            (L×W×H ÷ 5000). Leave blank and we assume actual weight.
          </p>
        </fieldset>

        <Field id="category" label="What is in the parcel?" hint={category?.restricted}>
          <select id="category" className={inputClass} value={categoryId} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </Field>

        {mode === "full" && (
          <>
            <fieldset className="flex flex-col gap-stack-sm">
              <legend className="font-label-md text-label-md text-on-surface-variant mb-stack-xs">Service level</legend>
              {services.length === 0 && (
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Choose a destination to see available services.
                </p>
              )}
              <div className="flex flex-col gap-stack-sm">
                {services.map((s) => (
                  <label
                    key={s.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors duration-150 ${
                      service === s.id
                        ? "border-primary bg-surface-container-low"
                        : "border-outline-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={s.id}
                      checked={service === s.id}
                      onChange={() => setService(s.id)}
                      className="mt-1 accent-primary w-4 h-4"
                    />
                    <span className="flex-grow">
                      <span className="flex justify-between items-baseline gap-3">
                        <span className="font-label-md text-label-md text-on-surface">{s.label}</span>
                        <span className="font-data-tabular text-data-tabular tabular text-on-surface">
                          {formatMoney(s.shipping)}
                        </span>
                      </span>
                      <span className="block font-body-sm text-body-sm text-on-surface-variant mt-1">
                        {s.blurb} Arrives in {s.transit[0]}–{s.transit[1]} working days.
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-stack-xs">
              <legend className="font-label-md text-label-md text-on-surface-variant mb-stack-xs">Who pays the duties?</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-sm">
                {(
                  [
                    ["DDP", "You do, upfront", "The price you see is final. Your customer receives the parcel with nothing to pay."],
                    ["DAP", "Your customer does", "Cheaper for you, but the carrier collects duty at the door. This is where refusals happen."],
                  ] as const
                ).map(([id, label, body]) => (
                  <label
                    key={id}
                    className={`flex flex-col gap-1 p-4 rounded-lg border cursor-pointer transition-colors duration-150 ${
                      terms === id ? "border-primary bg-surface-container-low" : "border-outline-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="terms"
                        checked={terms === id}
                        onChange={() => setTerms(id)}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="font-label-md text-label-md text-on-surface">{id} — {label}</span>
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{body}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}
      </Card>

      {/* --------------------------------------------------------- summary */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        <Card className="bg-surface-container">
          <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-stack-md">
            Estimated landed cost
          </h3>

          {!result && (
            /* Empty state names what is still missing rather than showing a blank panel. */
            <div className="flex flex-col gap-stack-sm py-stack-md">
              <p className="font-body-md text-body-md text-on-surface">Tell us three things and we will price it:</p>
              <ul className="flex flex-col gap-stack-xs">
                {[
                  ["Where it is going", Boolean(destinationCode)],
                  ["What it weighs", !Number.isNaN(num(weight)) && num(weight) > 0],
                  ["What it is worth", !Number.isNaN(num(value))],
                ].map(([label, done]) => (
                  <li key={String(label)} className="flex items-center gap-2 font-body-sm text-body-sm">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        done ? "bg-status-cleared text-white" : "border border-control-border text-transparent"
                      }`}
                    >
                      <Icon name="check" size={12} />
                    </span>
                    <span className={done ? "text-on-surface-variant line-through" : "text-on-surface"}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result && (
            <div className="flex flex-col gap-stack-md">
              <dl className="flex flex-col gap-stack-sm">
                {result.lines.map((line) => (
                  <div key={line.label} className="flex justify-between items-start gap-4">
                    <div>
                      <dt className="font-body-md text-body-md text-on-surface">{line.label}</dt>
                      {line.note && (
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{line.note}</p>
                      )}
                    </div>
                    <dd className="font-data-tabular text-data-tabular tabular text-on-surface whitespace-nowrap">
                      {formatMoney(line.amount)}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex justify-between items-baseline pt-stack-sm border-t border-outline-variant">
                <span className="font-label-md text-label-md text-on-surface">Total landed cost</span>
                <span className="font-headline-md text-headline-md tabular text-primary">
                  {formatMoney(result.total)}
                </span>
              </div>

              <div className="flex flex-col gap-stack-xs font-body-sm text-body-sm text-on-surface-variant">
                <p>
                  Chargeable weight <span className="tabular">{result.chargeableWeight} kg</span>
                  {result.volumetricWeight > result.actualWeight && " (volumetric — the parcel is bulky for its weight)"}.
                </p>
                <p>
                  Arrives in <span className="tabular">{result.transit[0]}–{result.transit[1]}</span> working days.
                </p>
                {result.dutyWaived && (
                  <p className="text-status-cleared">
                    Duty is waived on this lane at this value.
                  </p>
                )}
                {!result.destination.ddp && (
                  <p className="text-status-held">
                    {result.destination.name} does not support prepaid duties. Your customer settles at the door.
                  </p>
                )}
                <p>Estimate only. The exact figure is fixed when the shipment is created.</p>
              </div>

              {mode === "full" && !reference && (
                <Button onClick={onSubmit} loading={submitting} className="w-full">
                  {submitting ? "Getting your quote" : "Get this quote"}
                </Button>
              )}

              {reference && (
                <div
                  role="status"
                  className="rounded-lg border border-status-cleared/40 bg-status-cleared-bg p-4 flex flex-col gap-2"
                >
                  <p className="font-label-md text-label-md text-status-cleared flex items-center gap-2">
                    <Icon name="check" size={16} /> Quote saved
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    Reference <span className="tabular font-medium">{reference}</span>. Held for 7 days.
                  </p>
                  <a
                    href="/signup"
                    className="font-label-md text-label-md text-primary underline underline-offset-4"
                  >
                    Create an account to book it
                  </a>
                </div>
              )}
            </div>
          )}
        </Card>

        {mode === "full" && (
          <ul className="mt-stack-md flex flex-col gap-stack-xs font-body-sm text-body-sm text-on-surface-variant">
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-status-cleared" /> No card required</li>
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-status-cleared" /> Quote held for 7 days</li>
            <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-status-cleared" /> A human answers within one working day</li>
          </ul>
        )}
      </div>
    </div>
  );
}
