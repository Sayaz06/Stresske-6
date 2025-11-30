const CACHE_NAME = "stresske6-cache-v11";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./iconMB-192.png",
  "./iconMB-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then((cached) => {
      return fetch(req).catch(() => cached || new Response("Offline", { status: 503 }));
    })
  );
});