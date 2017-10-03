const express = require('express');
const mongoose = require('mongoose');
const strava = require('strava-v3');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const configDB = require('./config/database.js');

const app = express();
var port = process.env.PORT || 3000;

mongoose.connect(configDB.url, () => {
  console.log("Connection to db established!");
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'HelloFucker',
                 saveUninitialized: true,
                 resave: true}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport);
require('./app/routes.js')(app, passport);

// app.get('/auth/token', (req, res, next) => {
//   var code = req.query.code;
//   var token = "";
//   console.log(code);
//   strava.oauth.getToken(code, function(err, payload, limits){
//     console.log('1');
//     console.log(payload);
//     token=payload.access_token;
//     console.log(token);

//   });
//   console.log('2');
//   next();
// });

// //callback URI, fetches the token
// app.get('/auth/token', (req, res) => {
//   console.log('3');
//   res.send('Authentication complete');
// });


// strava.oauth.getRequestAccessURL({scope: 'view_private, write'}, function(err,payload, limits){
//   console.log(payload);
// });

// strava.athletes.stats({'id':'24635605'}, (err, payload, limits) => {
//   console.log(payload);
// });

//landing page
// app.use('/', function (req, res) {
//   console.log(req.cookies);
//   console.log(req.session);
//   res.send('Landing Page');
// });

//setting up app listen
app.listen(port, function () {
  console.log('App listening on port 3000!');
});