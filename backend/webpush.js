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
      if(typeof req.body.subscription){
        active_users.add(user_id)
        db_ops.activated_user.update_user_webpush_subscription_by_id(user_id,req.body.subscription)
      }
    }
    res.sendStatus(200);
  }
  // res.json("not_authed");
}

setInterval(async function () {
  console.log(active_users);
  for (let user_id of active_users) {
    let user=await db_ops.activated_user.find_user_by_id(user_id)
    user=user[0]
    console.log(user)
    if(user.subscription){
    const subscription = user.subscription;
    console.log(subscription.keys.auth)
    const payload = JSON.stringify({
      title: "New notification",
      body: "sample text",
      general_notifications:9,
      mail_notifications:9
    });
    const options = {
      TTL: 5,
    };
    console.log("sent");
    webPush.sendNotification(subscription, payload, options).catch(function (error) {
        console.log(user_id)
        console.log(error)
        active_users.delete(user_id)
      });
    }
  }
}, 6 * 1000);

module.exports={register:register,vapidPublicKey:vapidPublicKey}