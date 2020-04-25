const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const rateLimit = require("express-rate-limit");
const cors = require('cors')
const https = require('https');
const path = require('path');
const {check} = require('express-validator');
const Recaptcha = require('express-recaptcha').RecaptchaV3;
const fs = require('fs');

const PASS_MIN=8;
const PASS_MAX=128;

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
const recaptcha = new Recaptcha('6LcqV9QUAAAAAEybBVr0FWnUnFQmOVxGoQ_Muhtb', '6LcqV9QUAAAAAOA18kbCEWRBhF4g4LjSTaFRVe9P');
app.use(limiter);
app.use(function (req, res, next) {
  res.setHeader('X-Content-Type-Options', "nosniff")
  res.setHeader('X-Frame-Options', "Deny")  //clickjacking protection
  next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.use(cors());
app.disable('x-powered-by');
app.use(cookieParser());
app.use(session({
    secret: 'ghuieorifigyfuu9u3i45jtr73490548t7ht',
    resave: false,
    saveUninitialized: true,
    name: "session",
    cookie: {      
        maxAge: 14 * 24 * 60 * 60 * 1000,              //use secure: true   
        sameSite: 'lax'
    },
    store: new MongoStore({
        url: 'mongodb://localhost/user_data',
        ttl: 14 * 24 * 60 * 60
    }) // = 14 days. Default 
}))

const port = 80;
app.listen(port, () => { //Uncomment if you want to use http
    console.log(`Server is listening on port ${port}`);
});

//  https.createServer({
//       key: fs.readFileSync('privkey.pem'),
//       cert: fs.readFileSync('cert.pem')
//     }, app).listen(port);

// console.log(`Server is listening on port ${port}`);

const profile=require('./routes/profile.js')
const google_oauth_redirect=require('./routes/google_oauth_redirect.js') 
const github_oauth_redirect=require('./routes/github_oauth_redirect.js') 

const github_oauth_callback=require('./routes/github_oauth_callback.js') 
const google_oauth_callback=require('./routes/google_oauth_callback.js') 

const signup=require('./routes/signup.js') 
const login=require('./routes/login.js') 
const change_password=require('./routes/change_password.js') 
const forgot_password=require('./routes/forgot_password.js') 

const activate_account_email=require('./routes/activate_account_email.js') 

app.get('/profile',profile)



app.get('/auth/google',google_oauth_redirect)
app.get('/auth/github',github_oauth_redirect)

app.get('/auth/github/callback',github_oauth_callback)
app.get('/auth/google/callback',google_oauth_callback)


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'))
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'))
})
app.get('/forgot_password', (req, res) => {
    res.sendFile(path.join(__dirname, 'forgot_password.html'))
})
app.get('/change_password', (req, res) => {
    res.sendFile(path.join(__dirname, 'change_password.html'))
})

app.post('/signup', [
    recaptcha.middleware.verify,
    check('email').isEmail(),
    check('password').isLength({
        min: PASS_MIN,
        max: PASS_MAX
    })
    ],signup)

app.post('/login', [
    recaptcha.middleware.verify,
    check('email').isEmail(),
    check('password').isLength({
        min: PASS_MIN,
        max: PASS_MAX
    }),
], login)


app.post('/change_pw', [
    recaptcha.middleware.verify,
    check('password').isLength({
        min: PASS_MIN,
        max: PASS_MAX
    }),
],change_password)

app.post('/forgot_pw', [
    recaptcha.middleware.verify,
    check('email').isEmail(),
],forgot_password)

app.get('/activate',activate_account_email)

app.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                res.send('<p>error</p>')
            } else {
                res.send('<p>logout successful</p><div><a href="/login">Go to login page</a></div>')
            }
        });
    }
})