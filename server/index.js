const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const mongoose = require('mongoose');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const StravaStrategy = require('passport-strava').Strategy;

const configDB = require('./config/database.js');

var server = express();

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'

mongoose.connect(configDB.url, () => {
  console.log("Connection to db established!");
});

// For serving static files from public directory
// server.use(express.static('public'));
server.use(cookieParser());
server.use(bodyParser());
server.use(session({
  secret: 'c4rl3ss doggo'
}));
server.use(passport.initialize());
server.use(passport.session());

require('./config/passport.js')(passport);
require('./api/routes.js')(server, passport);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
server.use(nuxt.render)

// Listen the server
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console