"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Field, inputClass } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------------------------------------------------------- contact form */

const TOPICS = [
  { id: "support", label: "An existing shipment" },
  { id: "sales", label: "Pricing or a new account" },
  { id: "claim", label: "A damaged or lost parcel" },
  { id: "press", label: "Press or media" },
];

export interface ContactFormProps {
  readonly initialTopic?: string;
}

export function ContactForm({ initialTopic }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(
    initialTopic && TOPICS.some((t) => t.id === initialTopic) ? initialTopic : "support"
  );

  // Read ?topic= on the client so this page stays statically exportable.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && TOPICS.some((x) => x.id === t)) setTopic(t);
  }, []);
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const needsReference = topic === "support" || topic === "claim";

  function validateField(key: string, value: string) {
    let msg = "";
    if (key === "name" && value.trim().length < 2) msg = "Tell us who you are so we can reply properly.";
    if (key === "email" && !EMAIL.test(value)) msg = "Enter an email address we can reach you at.";
    if (key === "message" && value.trim().length < 10) msg = "A sentence or two about what happened helps us route this.";
    if (key === "reference" && needsReference && value.trim() === "")
      msg = "Add the tracking or order number so we can look it up.";
    setErrors((e) => {
      const next = { ...e };
      if (msg) next[key] = msg;
      else delete next[key];
      return next;
    });
    return msg === "";
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = [
      validateField("name", name),
      validateField("email", email),
      validateField("message", message),
      needsReference ? validateField("reference", reference) : true,
    ].every(Boolean);
    if (!ok) return;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 700);
  }

  if (sent) {
    return (
      <Card role="status" className="border-status-cleared/40 bg-status-cleared-bg">
        <h2 className="font-headline-sm text-headline-sm text-status-cleared flex items-center gap-2 mb-stack-sm">
          <Icon name="check" /> Message sent
        </h2>
        <p className="font-body-md text-body-md text-on-surface mb-stack-md">
          We have it. A person — not an autoresponder — will reply to {email} within one working day.
          {needsReference && reference && (
            <> We have attached reference <span className="tabular font-medium">{reference}</span>.</>
          )}
        </p>
        <Button tone="secondary" onClick={() => { setSent(false); setMessage(""); }}>
          Send another message
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="font-headline-md text-headline-md mb-stack-md">Send us a message</h2>
      <form onSubmit={submit} noValidate className="flex flex-col gap-stack-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
          <Field id="name" label="Your name" error={errors.name}>
            <input
              id="name" type="text" className={inputClass} value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => validateField("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
            />
          </Field>
          <Field id="email" label="Email address" error={errors.email}>
            <input
              id="email" type="email" className={inputClass} value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateField("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>
        </div>

        <Field id="topic" label="What is this about?">
          <select id="topic" className={inputClass} value={topic} onChange={(e) => setTopic(e.target.value)}>
            {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </Field>

        {/* Progressive disclosure — the reference field only exists when it matters. */}
        {needsReference && (
          <Field id="reference" label="Tracking or order number" error={errors.reference}>
            <input
              id="reference" type="text" className={`${inputClass} tabular`} value={reference}
              onChange={(e) => setReference(e.target.value)}
              onBlur={(e) => validateField("reference", e.target.value)}
              aria-invalid={Boolean(errors.reference)}
            />
          </Field>
        )}

        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message" rows={5} className={inputClass} value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={(e) => validateField("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
          />
        </Field>

        <Button type="submit" loading={busy} className="self-start">
          {busy ? "Sending" : "Send message"}
        </Button>
      </form>
    </Card>
  );
}

/* -------------------------------------------------------------- password */

function PasswordField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  strength,
}: {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (v: string) => void;
  readonly onBlur?: () => void;
  readonly error?: string;
  readonly strength?: boolean;
}) {
  const [show, setShow] = useState(false);
  const score = scorePassword(value);
  const LABELS = ["Too short", "Weak", "Fair", "Strong"];

  return (
    <Field id={id} label={label} error={error}>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          className={`${inputClass} pr-12`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={strength ? `${id}-strength` : undefined}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded text-outline hover:text-on-surface transition-colors"
        >
          <Icon name={show ? "eye-off" : "eye"} />
        </button>
      </div>
      {strength && (
        <div id={`${id}-strength`}>
          <div aria-hidden="true" className="mt-2 flex gap-1 h-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`flex-1 rounded transition-colors duration-200 ${
                  value.length === 0
                    ? "bg-outline-variant"
                    : i < score
                      ? score <= 1 ? "bg-status-exception" : score === 2 ? "bg-status-held" : "bg-status-cleared"
                      : "bg-outline-variant"
                }`}
              />
            ))}
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            {value.length === 0
              ? "At least 8 characters, with a number and a capital letter."
              : `${LABELS[Math.max(0, score - 1)]} — at least 8 characters, with a number and a capital letter.`}
          </p>
        </div>
      )}
    </Field>
  );
}

function scorePassword(v: string): number {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return s;
}

/* ------------------------------------------------------------- sign in/up */

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!EMAIL.test(email)) errs.email = "Enter the email address on your account.";
    if (password.length === 0) errs.password = "Enter your password.";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      // Deliberately does not reveal which of the two was wrong.
      setFormError("That email and password do not match an account.");
    }, 600);
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-stack-md">
      {formError && (
        <p role="alert" className="rounded-lg border border-status-exception/40 bg-status-exception-bg px-4 py-3 font-body-sm text-body-sm text-status-exception">
          {formError}
        </p>
      )}
      <Field id="signin-email" label="Work email" error={fieldErrors.email}>
        <input
          id="signin-email" type="email" autoComplete="email" className={inputClass}
          value={email} onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
        />
      </Field>
      <PasswordField
        id="signin-password" label="Password" value={password}
        onChange={setPassword} error={fieldErrors.password}
      />
      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
          <input type="checkbox" className="w-4 h-4 accent-primary" /> Keep me signed in
        </label>
        <Link href="/contact" className="font-label-md text-label-md text-primary hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" loading={busy} className="w-full">Sign in</Button>
      <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
        New to Shipmart? <Link href="/signup" className="text-primary hover:underline">Create an account</Link>
      </p>
    </form>
  );
}

export function SignUpForm() {
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (business.trim().length < 2) errs.business = "Tell us the name your customers see.";
    if (!EMAIL.test(email)) errs.email = "Enter an email address we can verify.";
    if (scorePassword(password) < 3) errs.password = "Use at least 8 characters, with a number and a capital letter.";
    if (!consent) errs.consent = "You need to accept the terms before we can open an account.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setBusy(true);
    window.setTimeout(() => { setBusy(false); setDone(true); }, 700);
  }

  if (done) {
    return (
      <div role="status" className="flex flex-col gap-stack-md">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Check your email</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          We sent a verification link to <span className="font-medium text-on-surface">{email}</span>.
          It expires in 24 hours.
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Wrong address?{" "}
          <button type="button" onClick={() => setDone(false)} className="text-primary hover:underline">
            Go back and change it
          </button>
          .
        </p>
        <Button tone="secondary" className="self-start">Resend the link</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-stack-md">
      <Field id="business" label="Business name" error={errors.business}>
        <input
          id="business" type="text" className={inputClass} value={business}
          onChange={(e) => setBusiness(e.target.value)}
          onBlur={() => business.trim().length < 2 && setErrors((x) => ({ ...x, business: "Tell us the name your customers see." }))}
          aria-invalid={Boolean(errors.business)}
        />
      </Field>
      <Field id="signup-email" label="Work email" error={errors.email}>
        <input
          id="signup-email" type="email" autoComplete="email" className={inputClass} value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => !EMAIL.test(email) && email !== "" && setErrors((x) => ({ ...x, email: "Enter an email address we can verify." }))}
          aria-invalid={Boolean(errors.email)}
        />
      </Field>
      <PasswordField
        id="signup-password" label="Password" value={password} onChange={setPassword}
        error={errors.password} strength
      />
      <div className="flex flex-col gap-stack-xs">
        <label className="flex items-start gap-3 font-body-sm text-body-sm text-on-surface-variant">
          {/* Never pre-checked. */}
          <input
            type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 accent-primary" aria-invalid={Boolean(errors.consent)}
          />
          <span>
            I agree to the <Link href="/legal/terms" className="text-primary hover:underline">terms of service</Link> and{" "}
            <Link href="/legal/privacy" className="text-primary hover:underline">privacy policy</Link>.
          </span>
        </label>
        {errors.consent && <p role="alert" className="font-body-sm text-body-sm text-status-exception">{errors.consent}</p>}
      </div>
      <Button type="submit" loading={busy} className="w-full">Create account</Button>
      <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
        Already have an account? <Link href="/signin" className="text-primary hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
