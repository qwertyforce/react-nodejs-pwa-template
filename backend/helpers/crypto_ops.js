const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db_ops=require('./db_ops.js')
const SALTROUNDS = 10

async function generate_activation_token() {
    const token = new Promise((resolve, reject) => {
        crypto.randomBytes(16, async function(ex, buffer) {
            if (ex) {
                reject("error");
            }
            let token = buffer.toString("base64").replace(/\/|=|[+]/g, '')
            let users = await db_ops.not_activated_user.find_not_activated_user_by_token(token) //check if token exists
            if (users.length === 0) {
                resolve(token);
            } else {
                let token_1 = await generate_activation_token()
                resolve(token_1)
            }
        });
    });
    return token;
}

async function generate_password_recovery_token() {
    const token = new Promise((resolve, reject) => {
        crypto.randomBytes(16, async function(ex, buffer) {
            if (ex) {
                reject("error");
            }
            let token = buffer.toString("base64").replace(/\/|=|[+]/g, '')
            let user_id = await db_ops.password_recovery.find_user_id_by_password_recovery_token(token) //check if token exists
            if (user_id.length === 0) {
                resolve(token);
            } else {
                let token_1 = await generate_password_recovery_token()
                resolve(token_1)
            }
        });
    });
    return token;
}

async function hash_password(password){
let hashed_pass =  bcrypt.hash(password, SALTROUNDS);
return hashed_pass
}
async function check_password(password,hash){
let result =  bcrypt.compare(password,hash);
return result
}

module.exports =  {
    generate_activation_token,
    generate_password_recovery_token,
    hash_password,
    check_password}