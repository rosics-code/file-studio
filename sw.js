const CACHE = "imgstudio-v1";

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(["./"]))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

// 🚀 network-first for updates
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request)
    )
  );
});
