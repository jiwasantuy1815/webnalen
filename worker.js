self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
        '/script.js',
        'https://cdn.jsdelivr.net/gh/jiwasantuy1815/webnalen@main/apple-touch-icon.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title;
  const body = data.body;

  self.registration.showNotification(title, {
    body: body,
    icon: 'https://cdn.jsdelivr.net/gh/jiwasantuy1815/webnalen@main/apple-touch-icon.png',
  });
});
