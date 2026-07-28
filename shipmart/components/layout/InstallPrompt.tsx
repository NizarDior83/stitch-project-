"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "shipmart.install-dismissed";

/**
 * Registers the service worker, and offers the Android install prompt when the
 * browser fires `beforeinstallprompt`.
 *
 * Deliberately not a modal: it sits at the bottom, is dismissible, and stays
 * dismissed. An install nag over the tracking page is the exact wrong moment.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration is best-effort; the site works without it */
      });
    }
  }, []);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (dismissed) return;

    function onPrompt(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setVisible(false);
    setDeferred(null);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Install Shipmart"
      className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-lg border border-outline-variant bg-surface-container-lowest shadow-[0_8px_30px_rgba(11,19,39,0.12)] p-4 flex items-start gap-3"
    >
      <span className="w-10 h-10 shrink-0 rounded-lg bg-primary text-on-primary flex items-center justify-center">
        <Icon name="package" />
      </span>
      <div className="flex-grow">
        <p className="font-label-md text-label-md text-on-surface">Install Shipmart</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Add it to your home screen. Tracking keeps working without a signal.
        </p>
        <div className="flex gap-2 mt-stack-sm">
          <button
            type="button"
            onClick={install}
            className="min-h-[44px] px-4 rounded bg-primary text-on-primary font-label-md text-label-md"
          >
            Install
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="min-h-[44px] px-4 rounded border border-control-border font-label-md text-label-md text-on-surface"
          >
            Not now
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="w-10 h-10 shrink-0 flex items-center justify-center rounded text-on-surface-variant hover:bg-surface-container-low"
      >
        <Icon name="x" size={18} />
      </button>
    </div>
  );
}
