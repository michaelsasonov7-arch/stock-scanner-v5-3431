// Stock Scanner Pro — minimal service worker.
//
// Scope is intentionally narrow: this app's entire value is live market
// data pulled through several third-party CORS proxies (see index.html —
// allorigins/corsproxy/codetabs/thingproxy chains). A service worker that
// cached or intercepted those cross-origin requests could silently serve
// stale prices/fundamentals or break the proxy fallback logic in ways that
// are very hard to notice from the UI. So this worker ONLY caches the
// static "app shell" (this page + its icons/manifest) for offline
// installability — every other request (any cross-origin fetch, i.e. every
// API/proxy call the app makes) is passed straight to the network,
// untouched, every time.
const CACHE_NAME = 'scanner-pro-shell-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_FILES))
      .catch((e) => console.warn('[sw] shell precache failed:', e && e.message))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Any cross-origin request (Yahoo/Stooq/FMP/Finnhub/Twelve Data/Polygon/
  // Alpha Vantage, every CORS proxy, Google Fonts, etc.) — network only,
  // never cached, never intercepted. This is a deliberate no-op pass-through.
  if (url.origin !== self.location.origin) return;

  // Same-origin: cache-first for the app shell so the page still opens
  // offline, falling back to network (and updating the cache) for anything
  // else same-origin.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.ok && req.method === 'GET') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
