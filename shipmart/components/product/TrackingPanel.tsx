"use client";

import { useState } from "react";
import { lookup, STATE_STYLES, TEST_NUMBERS, type Shipment } from "@/lib/tracking";
import { Button, Card, Field, inputClass } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

type View = { kind: "idle" } | { kind: "found"; shipment: Shipment } | { kind: "not-found"; query: string };

export function TrackingPanel() {
  const [value, setValue] = useState("");
  const [view, setView] = useState<View>({ kind: "idle" });
  const [busy, setBusy] = useState(false);

  function search(e?: React.FormEvent) {
    e?.preventDefault();
    if (!value.trim()) return;
    setBusy(true);
    window.setTimeout(() => {
      const found = lookup(value);
      setView(found ? { kind: "found", shipment: found } : { kind: "not-found", query: value.trim() });
      setBusy(false);
    }, 450);
  }

  return (
    <div className="flex flex-col gap-stack-lg">
      <form onSubmit={search} className="flex flex-col sm:flex-row gap-stack-sm items-end">
        <Field id="tracking" label="Tracking number" className="flex-grow w-full">
          <input
            id="tracking"
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="SHP-1000-TRANSIT"
            className={`${inputClass} tabular`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Field>
        <Button type="submit" loading={busy} className="w-full sm:w-auto">
          Track
        </Button>
      </form>

      {view.kind === "idle" && (
        <Card className="bg-surface-container-low">
          <p className="font-body-md text-body-md text-on-surface mb-stack-sm">
            Your tracking number is in your dispatch email, and on the label. It starts with{" "}
            <span className="tabular font-medium">SHP-</span>.
          </p>
          <TestNumbers onPick={(n) => { setValue(n); }} />
        </Card>
      )}

      {view.kind === "not-found" && (
        <Card>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm">
            We have no record of {view.query}
          </h2>
          {/* Never a bare "not found" — name both likely causes. */}
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
            Two things usually cause this. Either a character is off — the numbers are long and easy to
            mistype — or the label was created but the parcel has not been scanned yet, which can take
            until the end of the first working day.
          </p>
          <TestNumbers onPick={(n) => setValue(n)} />
        </Card>
      )}

      {view.kind === "found" && <ShipmentView shipment={view.shipment} />}
    </div>
  );
}

function TestNumbers({ onPick }: { readonly onPick: (n: string) => void }) {
  return (
    <div className="flex flex-col gap-stack-xs">
      <p className="font-label-md text-label-md text-on-surface-variant">
        Demo numbers — this build has no backend:
      </p>
      <div className="flex flex-wrap gap-2">
        {TEST_NUMBERS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPick(n)}
            className="px-3 py-2 min-h-[44px] rounded-full border border-outline-variant bg-surface-container-lowest font-data-tabular text-data-tabular tabular text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function ShipmentView({ shipment }: { readonly shipment: Shipment }) {
  const tone = STATE_STYLES[shipment.state];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
      <div className="lg:col-span-8 flex flex-col gap-stack-md">
        <Card>
          <div className="flex flex-wrap justify-between items-start gap-4 mb-stack-md">
            <div>
              {/* Status is always a word. Colour never carries it alone. */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-md text-label-md ${tone.text} ${tone.bg}`}
              >
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-current" />
                {shipment.statusLabel}
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mt-stack-sm">{shipment.headline}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">{shipment.detail}</p>
            </div>
            <span className="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center text-primary">
              <Icon name="package" />
            </span>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-outline-variant pt-stack-md">
            {[
              ["Tracking", shipment.id],
              ["From", shipment.origin],
              ["To", shipment.destination],
              ["Weight", `${shipment.weightKg} kg`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-label-md text-label-md text-on-surface-variant mb-1">{k}</dt>
                <dd className="font-data-tabular text-data-tabular tabular text-on-surface">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        {shipment.action && (
          /* Reads as an instruction, not an error. */
          <Card className="border-status-held/40 bg-status-held-bg">
            <div className="flex items-start gap-4">
              <Icon name="info" className="text-status-held mt-1" />
              <div className="flex-grow">
                <h3 className="font-label-md text-label-md text-status-held mb-2">{shipment.action.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface mb-stack-md">{shipment.action.body}</p>
                <Button tone="secondary">{shipment.action.cta}</Button>
              </div>
            </div>
          </Card>
        )}

        <Card>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md">Tracking history</h3>
          <ol className="flex flex-col">
            {shipment.timeline.map((event, i) => {
              const last = i === shipment.timeline.length - 1;
              return (
                <li key={`${event.label}-${i}`} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-full border-2 mt-1 ${
                        event.state === "current"
                          ? "bg-primary border-primary ring-4 ring-primary/15"
                          : event.state === "done"
                            ? "bg-surface-container-lowest border-primary"
                            : "bg-surface-container-lowest border-outline-variant"
                      }`}
                    />
                    {!last && <span aria-hidden="true" className="w-[2px] flex-grow bg-outline-variant my-1" />}
                  </div>
                  <div className={`pb-stack-md ${last ? "pb-0" : ""}`}>
                    <p
                      className={`font-label-md text-label-md ${
                        event.state === "pending"
                          ? "text-on-surface-variant"
                          : event.state === "current"
                            ? "text-primary"
                            : "text-on-surface"
                      }`}
                    >
                      {event.label}
                      {event.state === "current" && <span className="sr-only"> (current status)</span>}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {event.location} · <span className="tabular">{event.timestamp}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-stack-md">
        <Card>
          <h3 className="font-label-md text-label-md text-on-surface mb-stack-sm">Get updates on this parcel</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md">
            One message when it clears customs, one when it is out for delivery. Nothing else.
          </p>
          <NotifyForm />
        </Card>

        <Card className="bg-surface-container-low">
          <h3 className="font-label-md text-label-md text-on-surface mb-2">Something looks wrong?</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md">
            If the parcel has not moved in three working days, we will chase the carrier for you.
          </p>
          <a href="/contact" className="font-label-md text-label-md text-primary underline underline-offset-4">
            Contact support
          </a>
        </Card>
      </div>
    </div>
  );
}

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter an email address we can reach you at, like you@example.com.");
      return;
    }
    setError(undefined);
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="font-body-sm text-body-sm text-status-cleared flex items-center gap-2">
        <Icon name="check" size={16} /> We will email {email} when this parcel moves.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-stack-sm">
      <Field id="notify-email" label="Email address" error={error}>
        <input
          id="notify-email"
          type="email"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              setError("Enter an email address we can reach you at, like you@example.com.");
            } else setError(undefined);
          }}
          aria-invalid={Boolean(error)}
        />
      </Field>
      <Button type="submit" tone="secondary">Notify me</Button>
    </form>
  );
}
