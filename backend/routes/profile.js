const db_ops = require('./../helpers/db_ops.js')
async function profile (req,res){
	if (req.session.authed !== undefined) {
        const user_id=req.session.user_id;
        const users = await db_ops.activated_user.find_user_by_id(user_id);
        if(users.length!==0){
            const data={
                email:users[0].email,
                general_notifications:users[0].general_notifications,
                mail_notifications:users[0].mail_notifications
            }
            console.log(users[0])
            res.json({data:data})
        }
    } else {
        res.json({data:null})
    }
}

module.exports = profile;