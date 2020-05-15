/* eslint-disable no-restricted-globals */
if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
  importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
 console.log(5)
  self.addEventListener('message', function(event) {
    console.log(event);
    self.clients.matchAll().then(function(clients) {
      if (clients && clients.length) {
        // you need to decide which clients you want to send the message to..
        const client = clients[0];
        client.postMessage("your message");
    }
    });
    
    // postMessage("5556")
    });
 self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

/* custom cache rules*/
// workbox.routing.registerNavigationRoute('/index.html', {
//       blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
//     });
 
// workbox.routing.registerRoute(
//       /\.(?:png|gif|jpg|jpeg)$/,
//       workbox.strategies.cacheFirst({
//         cacheName: 'images',
//         plugins: [
//           new workbox.expiration.Plugin({
//             maxEntries: 60,
//             maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//           }),
//         ],
//       })
//     );
 
} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}