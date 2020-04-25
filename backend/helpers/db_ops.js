var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/';
const crypto = require('crypto');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const db_main = 'user_data';
const client = new MongoClient(url, options);
client.connect(function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected successfully to db server");
    }
});
client.db(db_main).listCollections({
    name: "not_activated_users"
}).toArray().then(function(items) {
    if (items.length === 0) {
        client.db(db_main).collection("not_activated_users").createIndex({
            "createdAt": 1
        }, {
            expireAfterSeconds: 86400
        });
    }
});

client.db(db_main).listCollections({
    name: "password_recovery"
}).toArray().then(function(items) {
    if (items.length === 0) {
        client.db(db_main).collection("password_recovery").createIndex({
            "createdAt": 1
        }, {
            expireAfterSeconds: 86400
        });
    }
});

async function findDocuments(collection_name, selector) {
    const collection = client.db(db_main).collection(collection_name);
    let result = collection.find(selector).toArray()
    return result
}
async function removeDocument(collection_name, selector) {
    const collection = client.db(db_main).collection(collection_name);
    collection.deleteOne(selector)
}

async function insertDocuments(collection_name, documents) {
    const collection = client.db(db_main).collection(collection_name);
    collection.insertMany(documents)
    // let result = await collection.insertMany(documents);
    // return result
}
async function updateDocument(collection_name,selector,update) {
  const collection = client.db(db_main).collection(collection_name);
  collection.updateOne(selector, { $set: update })
  // let result= await collection.updateOne(selector, { $set: update })

}

async function generate_id() {
    const id = new Promise((resolve, reject) => {
        crypto.randomBytes(32, async function(ex, buffer) {
            if (ex) {
                reject("error");
            }
            let id = buffer.toString("base64")
            let users = await find_user_by_id(id) //check if id exists
            if (users.length === 0) {
                resolve(id);
            } else {
                let id_1 = await generate_id()
                resolve(id_1)
            }
        });
    });
    return id;
}







////////////////////////////////////////PASSWORD RECOVERY
async function update_user_password_by_id(id,password) {
    updateDocument("users", {id: id},{password:password})
}

async function delete_password_recovery_token(token) {
    removeDocument("password_recovery", {
        token: token
    })
}

async function save_password_recovery_token(token, user_id) {
    insertDocuments("password_recovery", [{
        "createdAt": new Date(),
        token: token,
        user_id: user_id,
    }])
}

async function find_user_id_by_password_recovery_token(token) {
    let user = findDocuments("password_recovery", {
        token: token
    })
    return user
}
//////////////////////////////////////////

//////////////////////////////////////////ACTIVATED USER
async function find_user_by_email(email) {
    let user = findDocuments("users", {
        email: email
    })
    return user
}

async function find_user_by_oauth_id(oauth_id) {
    let user = findDocuments("users", {
        oauth_id: oauth_id
    })
    return user
}

async function find_user_by_id(id) {
    let user = findDocuments("users", {
        id: id
    })
    return user
}

async function create_new_user_activated(email, pass) {
    var id=await generate_id()
    insertDocuments("users", [{
        email: email,
        id: id,
        password: pass,
        activated: true
    }])
}


async function create_new_user_activated_github(oauth_id) {
    var id=await generate_id()
    insertDocuments("users", [{
        oauth_id: oauth_id,
        id: id,
        activated: true
    }])
    return id
}

async function create_new_user_activated_google(oauth_id,email) {
    var id=await generate_id()
    insertDocuments("users", [{
        oauth_id: oauth_id,
        email_google:email,
        id: id,
        activated: true
    }])
    return id
}
/////////////////////////////////////////////////////////


//////////////////////////////////////////NOT ACTIVATED USER
async function find_not_activated_user_by_token(token) {
    let user = findDocuments("not_activated_users", {
        token: token
    })
    return user
}

async function delete_not_activated_user_by_token(token) {
    removeDocument("not_activated_users", {
        token: token
    })
}

async function create_new_user_not_activated(email, pass, token) {
    insertDocuments("not_activated_users", [{
        "createdAt": new Date(),
        email: email,
        token: token,
        password: pass,
        activated: false
    }])
}
/////////////////////////////////////////////////////////

module.exports =  {
    password_recovery:{
        update_user_password_by_id,
        delete_password_recovery_token,
        save_password_recovery_token,
        find_user_id_by_password_recovery_token
    },
    activated_user:{
        find_user_by_email,
        find_user_by_oauth_id,
        find_user_by_id,
        create_new_user_activated,
        create_new_user_activated_github,
        create_new_user_activated_google
    },
    not_activated_user:{
        find_not_activated_user_by_token,
        delete_not_activated_user_by_token,
        create_new_user_not_activated
    }
}