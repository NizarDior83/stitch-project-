import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ layout */

export interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
}
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop ${className}`}>
      {children}
    </div>
  );
}

export interface SectionProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
  readonly tone?: "default" | "low" | "container" | "dark";
}
const SECTION_TONE: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "",
  low: "bg-surface-container-low border-y border-outline-variant",
  container: "bg-surface-container border-y border-outline-variant",
  dark: "bg-inverse-surface text-inverse-on-surface",
};
export function Section({ children, className = "", id, tone = "default" }: SectionProps) {
  return (
    <section id={id} className={`py-stack-xl ${SECTION_TONE[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export interface EyebrowProps {
  readonly children: ReactNode;
  readonly onDark?: boolean;
}
export function Eyebrow({ children, onDark = false }: EyebrowProps) {
  return (
    <p
      className={`font-label-md text-label-md uppercase tracking-[0.16em] mb-stack-sm ${
        onDark ? "text-on-dark-primary" : "text-primary"
      }`}
    >
      {children}
    </p>
  );
}

/* ----------------------------------------------------------------- buttons */

type ButtonTone = "primary" | "secondary" | "ghost" | "on-dark";
const BUTTON_TONE: Record<ButtonTone, string> = {
  primary: "bg-primary text-on-primary hover:bg-on-primary-fixed-variant",
  secondary:
    "bg-surface-container-lowest text-on-surface border border-control-border hover:bg-surface-container-low",
  ghost: "text-primary hover:bg-surface-container-low",
  "on-dark": "bg-surface-bright text-on-secondary-fixed hover:bg-surface-container-low",
};

export interface ButtonLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly tone?: ButtonTone;
  readonly size?: "md" | "lg";
  readonly className?: string;
}
export function ButtonLink({ href, children, tone = "primary", size = "md", className = "" }: ButtonLinkProps) {
  const pad = size === "lg" ? "px-8 py-4" : "px-6 py-3";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded font-label-md text-label-md min-h-[44px] transition-colors duration-150 ease-out ${pad} ${BUTTON_TONE[tone]} ${className}`}
    >
      {children}
    </Link>
  );
}

export interface ButtonProps {
  readonly children: ReactNode;
  readonly tone?: ButtonTone;
  readonly type?: "button" | "submit";
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly className?: string;
  readonly ariaLabel?: string;
}
export function Button({
  children,
  tone = "primary",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center gap-2 rounded px-6 py-3 min-h-[44px] font-label-md text-label-md transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed ${BUTTON_TONE[tone]} ${className}`}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="w-4 h-4 rounded-full border-2 border-current border-r-transparent animate-spin"
        />
      )}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------- cards */

export interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly role?: string;
  readonly id?: string;
}
export function Card({ children, className = "", role, id }: CardProps) {
  return (
    <div
      id={id}
      role={role}
      className={`bg-surface-container-lowest border border-outline-variant rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ badges */

export interface BadgeProps {
  /** Required. A badge never communicates state through colour alone. */
  readonly label: string;
  readonly text?: string;
  readonly bg?: string;
}
export function Badge({ label, text = "text-on-surface-variant", bg = "bg-surface-container" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-md text-label-md ${text} ${bg}`}
    >
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ fields */

export interface FieldProps {
  readonly id: string;
  readonly label: string;
  readonly children: ReactNode;
  readonly hint?: string;
  readonly error?: string;
  readonly className?: string;
}
export function Field({ id, label, children, hint, error, className = "" }: FieldProps) {
  return (
    <div className={`flex flex-col gap-stack-xs ${className}`}>
      {/* Labels are always visible. Placeholder-only labelling is prohibited. */}
      <label htmlFor={id} className="font-label-md text-label-md text-on-surface-variant">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="font-body-sm text-body-sm text-on-surface-variant">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="font-body-sm text-body-sm text-status-exception">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "w-full min-h-[44px] px-3 py-2 rounded border border-control-border bg-surface-container-lowest text-on-surface font-body-md text-body-md transition-colors duration-150 ease-out focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none";

/* ------------------------------------------------------------------ tables */

export interface TableWrapProps {
  readonly children: ReactNode;
  readonly label: string;
}
/** Wide tables scroll inside their own container — the page body never does. */
export function TableWrap({ children, label }: TableWrapProps) {
  return (
    <div
      className="overflow-x-auto border border-outline-variant rounded-lg bg-surface-container-lowest"
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- unverified */

export interface UnverifiedProps {
  readonly children: ReactNode;
  readonly note?: string;
}
/**
 * Wraps any figure that has not been verified. Visible marker in development
 * so a fabricated statistic cannot quietly reach production looking real.
 */
export function Unverified({ children, note = "unverified" }: UnverifiedProps) {
  if (process.env.NODE_ENV === "production") return <>{children}</>;
  return (
    <span className="relative inline-block border-b-2 border-dashed border-status-held" title={`TODO: ${note}`}>
      {children}
      <span className="sr-only"> (unverified placeholder)</span>
    </span>
  );
}
