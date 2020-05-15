import React from "react";
import {} from './redux_slices/userDataSlice';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
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
      // Use the PushManager to get the user's subscription to the push service.
      return registration.pushManager
        .getSubscription()
        .then(async function (subscription) {
          // If a subscription was found, return it.
          if (subscription) {
            return subscription;
          }
          // Get the server's public key
          const response = await fetch("http://localhost/vapidPublicKey");
          const vapidPublicKey = await response.text();
          // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
          // urlBase64ToUint8Array() is defined in /tools.js
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey); 
          // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
          // send notifications that don't have a visible effect for the user).
          // eslint-disable-next-line no-undef 
          localforage.setItem("convertedVapidKey", convertedVapidKey);  //localforage is defined in public/index.html
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });
        });
    })
}

  

function App_Bar (props) {
  
  return (
    <Box my={4}>
      <Button onClick={() => get_permission()} variant="contained">Default</Button>
    </Box>
  );
}

export default App_Bar;