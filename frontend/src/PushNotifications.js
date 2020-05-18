import React from "react";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function get_permission() {
  navigator.serviceWorker.ready
    .then(function (registration) {
      return registration.pushManager
        .getSubscription()
        .then(async function (subscription) {
          const response = await fetch("http://localhost/vapidPublicKey");
          const vapidPublicKey = await response.text();
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey); 
          // eslint-disable-next-line no-undef 
          localforage.setItem("convertedVapidKey", convertedVapidKey);  //localforage is defined in public/index.html
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });
        });
    }).then(function (subscription) {
      fetch("http://localhost/register", {
        credentials: 'include',
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription,
        }),
      })
    })
}

  

function App_Bar (props) {
  
  return (
    <Box my={4}>
      <Button onClick={() => get_permission()} variant="contained">Subscribe to push notifications</Button>
    </Box>
  );
}

export default App_Bar;