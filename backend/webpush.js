const webPush = require("web-push");
const db_ops = require('./../helpers/db_ops.js')
const express = require("express");
const bodyParser = require("body-parser");
const port = 80;
const app = express();
const active_users=new Set();
app.use(bodyParser.json());
app.listen(port, () => console.log(`Express app listening on port ${port}!`));

const keys = webPush.generateVAPIDKeys();
webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  keys.publicKey,
  keys.privateKey
);
app.use(express.static("./"));

app.get("/vapidPublicKey", function (req, res) {
  res.send(keys.publicKey);
});
app.post("/register", async function (req, res) {
  console.log(req.body.subscription);
  console.log(req.body.id);
  const user_id=req.session.user_id;
  const users = await db_ops.activated_user.find_user_by_id(user_id);
  if(users.length!==0){
    if(typeof req.body.subscription ==="string"){
      active_users.add(user_id)
      db_ops.activated_user.update_user_webpush_subscription_by_id(user_id,req.body.subscription)
    }
  }
  res.json(user);
});

setInterval(function () {
  console.log("interval");
  for (let user of active_users) {
    if(user.subscription){
    const subscription = user.subscription;
    const payload = JSON.stringify({
      title: "New notification",
      body: "sample text",
    });
    const options = {
      TTL: 5,
    };
    console.log("sent");
    var m=i
    webPush.sendNotification(subscription, payload, options).catch(function (error) {
        console.log(error)
        active_users.forEach(x => x.user_id === user.user_id ? active_users.delete(x) : x)
      });
    }
  }
}, 6 * 1000);
