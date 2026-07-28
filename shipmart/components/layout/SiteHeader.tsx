"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRIMARY_NAV } from "@/lib/nav";

export interface SiteHeaderProps {
  readonly variant?: "full" | "minimal";
}

export function SiteHeader({ variant = "full" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-center h-16 gap-stack-md">
          <div className="flex items-center gap-stack-lg">
            {/* The wordmark is always a link home — Stitch exports leave it as href="#". */}
            <Link
              href="/"
              className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight hover:opacity-80 transition-opacity"
            >
              Shipmart
            </Link>
            {variant === "full" && (
              <nav aria-label="Primary" className="hidden lg:flex items-center gap-stack-sm">
                {PRIMARY_NAV.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`font-label-md text-label-md px-3 py-2 rounded transition-colors duration-150 ease-out ${
                        active
                          ? "text-primary bg-surface-container-low"
                          : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-stack-sm">
            {variant === "full" && (
              <Link
                href="/track"
                className="hidden sm:inline-flex font-label-md text-label-md text-on-surface-variant hover:text-primary px-3 py-2 min-h-[44px] items-center transition-colors"
              >
                Track a parcel
              </Link>
            )}
            <Link
              href="/signin"
              className="hidden md:inline-flex font-label-md text-label-md text-on-surface border border-control-border rounded px-4 py-2 min-h-[44px] items-center hover:bg-surface-container-low transition-colors"
            >
              Sign in
            </Link>
            {/* The primary action stays visible in the bar at every width. */}
            <Link
              href="/quote"
              className="inline-flex items-center font-label-md text-label-md bg-primary text-on-primary px-4 py-2 min-h-[44px] rounded hover:bg-on-primary-fixed-variant transition-colors"
            >
              Get a quote
            </Link>
            {variant === "full" && (
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="lg:hidden w-11 h-11 inline-flex items-center justify-center rounded text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                <span aria-hidden="true" className="flex flex-col gap-[5px]">
                  <span className="block w-5 h-[2px] bg-current" />
                  <span className="block w-5 h-[2px] bg-current" />
                  <span className="block w-5 h-[2px] bg-current" />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {variant === "full" && open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="lg:hidden border-t border-outline-variant bg-surface px-margin-mobile py-stack-md flex flex-col"
        >
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 min-h-[44px] flex items-center font-label-md text-label-md text-on-surface-variant hover:text-primary border-b border-outline-variant/40"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/track"
            className="py-3 min-h-[44px] flex items-center font-label-md text-label-md text-on-surface-variant hover:text-primary border-b border-outline-variant/40"
          >
            Track a parcel
          </Link>
          <Link
            href="/signin"
            className="mt-stack-md inline-flex items-center justify-center min-h-[44px] rounded border border-control-border font-label-md text-label-md"
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}
