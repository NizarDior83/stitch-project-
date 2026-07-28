import Link from "next/link";
import { FOOTER_GROUPS, SOCIAL } from "@/lib/nav";

export interface SiteFooterProps {
  readonly variant?: "full" | "minimal";
}

export function SiteFooter({ variant = "full" }: SiteFooterProps) {
  if (variant === "minimal") {
    return (
      <footer className="bg-surface border-t border-outline-variant py-stack-md">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant">
          <p className="font-body-sm text-body-sm">© {new Date().getFullYear()} Shipmart. All rights reserved.</p>
          <div className="flex gap-gutter font-label-md text-label-md">
            <Link href="/legal/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/help" className="hover:text-primary transition-colors">Help centre</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-inverse-surface w-full py-stack-xl border-t border-on-secondary-fixed-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-stack-sm">
            <Link href="/" className="font-headline-sm text-headline-sm font-bold text-surface-bright">
              Shipmart
            </Link>
            <p className="font-body-sm text-body-sm text-on-dark-muted max-w-[24ch]">
              Cross-border parcel shipping for eCommerce merchants.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-stack-sm">
              <h2 className="font-label-md text-label-md text-surface-bright">{group.title}</h2>
              {group.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  /* on-dark-muted, not the light-surface link colour: primary
                     (#003ec7) fails contrast against this background. */
                  className="font-body-sm text-body-sm text-on-dark-muted hover:text-surface-bright transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-stack-lg pt-stack-md border-t border-on-secondary-fixed-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-stack-sm">
          <p className="font-body-sm text-body-sm text-on-dark-muted">
            © {new Date().getFullYear()} Shipmart. All rights reserved.
          </p>
          <div className="flex gap-gutter">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                rel="noopener noreferrer"
                target="_blank"
                className="font-body-sm text-body-sm lowercase text-on-dark-muted hover:text-surface-bright transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
