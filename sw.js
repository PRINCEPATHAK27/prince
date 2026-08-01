const CACHE_NAME = "forever-with-you-v1";

const urlsToCache = [
  "/",
  "index.html",
  "story.html",
  "chat.html",
  "gallery.html",
  "game.html",
  "puzzle.html",
  "letter.html",
  "night.html",
  "proposal.html",
  "css/style.css",
  "js/main.js",
  "js/gallery.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});