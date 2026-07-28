/**
 * Shipmart service worker.
 *
 * Strategy: precache the shell, then network-first for navigations with a
 * cache fallback, and stale-while-revalidate for static assets. A parcel
 * app is most needed exactly when the signal is bad, so the last-seen
 * tracking page must survive going offline.
 */
const VERSION = "shipmart-v1";
const SHELL = ["/", "/track", "/quote", "/offline.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match("/offline.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((hit) => {
      const net = fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
