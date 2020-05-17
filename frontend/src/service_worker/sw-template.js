/* eslint-disable no-restricted-globals */
if ('function' === typeof importScripts) {
   /* global importScripts */
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
  importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
    
    function send_data(data){
      self.clients.matchAll().then(function (clients) {
        if (clients && clients.length) {
          const client = clients[0];
          client.postMessage(data);
        }
      });
    }

    self.addEventListener('install', function (event) {
      event.waitUntil(self.skipWaiting()); // Activate worker immediately
    });
  
    self.addEventListener('activate', function (event) {
      event.waitUntil(self.clients.claim()); // Become available to all pages
    });

    self.addEventListener('message', function (event) {
      send_data("message")
      console.log(event); 
    });
    self.addEventListener("push", function (event) {
      const payload = event.data ? event.data.json() : "no payload";
      send_data(payload)
      console.log(payload);
      event.waitUntil(
        self.registration.showNotification(payload.title, {
          body: payload.body,
        })
      );
    });

    self.addEventListener("pushsubscriptionchange", (event) => {
      console.log("pushsubscriptionchange")
      // eslint-disable-next-line no-undef 
      event.waitUntil(localforage.getItem("convertedVapidKey").then(function (convertedVapidKey) {
        self.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        }).then((subscription) => {
          fetch("http://localhost//register", {
            credentials: 'include',
            method: "post",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              subscription: subscription,
            }),
          })
        }).catch(function (err) { console.log(err) })
      }));
    },
      false
    );

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