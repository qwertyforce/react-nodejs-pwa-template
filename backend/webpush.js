const webPush = require("web-push");
const db_ops = require('./helpers/db_ops.js')
const keys = webPush.generateVAPIDKeys();
const active_users=new Set();

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  keys.publicKey,
  keys.privateKey
);

async function vapidPublicKey (req,res){
  res.send(keys.publicKey)
}

async function register (req,res){
  if(req.session.authed){
    const user_id=req.session.user_id;
    const users = await db_ops.activated_user.find_user_by_id(user_id);
    if(users.length!==0){
      if(typeof req.body.subscription ==="string"){
        active_users.add(user_id)
        db_ops.activated_user.update_user_webpush_subscription_by_id(user_id,req.body.subscription)
      }
    }
    // res.json(user);
  }
  // res.json("not_authed");
}

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

module.exports={register:register,vapidPublicKey:vapidPublicKey}