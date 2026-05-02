// public/sw.js
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Alert', body: 'New Update' };
  
  const options = {
    body: data.body,
    icon: '/logo.png', // Reference a file in your public folder
    badge: '/badge.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});