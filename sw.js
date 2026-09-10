/* Library Scavenger Hunt — offline helper.
   Keeps a copy of index.html on the iPad. When the network is up, the newest
   version is always fetched and the copy refreshed. When the network is down,
   the copy is served instead, so reloading the page still works.
   You should never need to edit this file. */

const CACHE = 'scavenger-hunt-v1';
const PAGE = './index.html';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([PAGE, './'])).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  e.respondWith((async () => {
    try {
      // Ask the network, skipping the browser's own stale copy.
      const fresh = await fetch(req, { cache: 'no-cache' });
      if (fresh && fresh.ok) {
        const c = await caches.open(CACHE);
        c.put(req, fresh.clone());
        if (req.mode === 'navigate') c.put(PAGE, fresh.clone());
      }
      return fresh;
    } catch (err) {
      // No network: serve what we have. ?team=3 and ?team=5 are the same page.
      const c = await caches.open(CACHE);
      return (await c.match(req, { ignoreSearch: true })) ||
             (await c.match(PAGE)) ||
             new Response('Offline and no saved copy of the page yet. Connect to wifi once and reload.',
               { status: 503, headers: { 'Content-Type': 'text/plain' } });
    }
  })());
});
