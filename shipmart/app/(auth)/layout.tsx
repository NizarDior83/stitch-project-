import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

/** Auth pages bypass the global header — route group, split layout. */
export default function AuthLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col p-margin-mobile md:p-margin-desktop bg-surface">
        <header className="flex items-center justify-between mb-stack-xl">
          <Link href="/" className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">
            Shipmart
          </Link>
          <Link href="/" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Back to site
          </Link>
        </header>
        <main id="main" className="flex-grow flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">{children}</div>
        </main>
        <footer className="mt-stack-xl pt-stack-md border-t border-outline-variant flex justify-between items-center">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            © {new Date().getFullYear()} Shipmart
          </span>
          <span className="flex gap-4">
            <Link href="/legal/privacy" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary">Privacy</Link>
            <Link href="/legal/terms" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary">Terms</Link>
          </span>
        </footer>
      </div>

      <aside className="hidden md:flex md:w-1/2 bg-inverse-surface flex-col justify-center p-margin-desktop">
        <div className="max-w-lg mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-surface-bright mb-stack-lg">
            Engineered clarity for global trade.
          </h2>
          <ul className="flex flex-col gap-stack-md">
            {[
              ["bolt", "Set up in minutes", "Connect a store and generate your first label the same afternoon."],
              ["globe", "Every major market", "Prepaid duties on the lanes that support them, clearly marked on the ones that do not."],
              ["shield", "No surprise costs", "The quoted landed cost is the price. If we classify wrong, the difference is ours."],
            ].map(([icon, title, body]) => (
              <li key={title} className="flex items-start gap-stack-md">
                <span className="w-10 h-10 rounded-full bg-on-secondary-fixed flex items-center justify-center text-on-dark-primary shrink-0">
                  <Icon name={icon as "bolt"} />
                </span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-surface-bright mb-1">{title}</h3>
                  <p className="font-body-md text-body-md text-on-dark-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
