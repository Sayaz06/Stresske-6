// ✅ Service Worker untuk Stresske-6
const CACHE_NAME = "stresske6-cache-v20";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./iconMB-192.png",
  "./iconMB-512.png",
  "./styles.css",
  "./app.js"
];

// ✅ Install SW & cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// ✅ Activate SW & delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// ✅ Fetch handler (cache-first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).catch(() =>
          caches.match("./index.html")
        )
      );
    })
  );
});
