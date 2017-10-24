require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("passport-strava");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(3),
    Nuxt = _require.Nuxt,
    Builder = _require.Builder;

var express = __webpack_require__(4);
var mongoose = __webpack_require__(0);
var session = __webpack_require__(5);
var cookieParser = __webpack_require__(6);
var bodyParser = __webpack_require__(7);
var passport = __webpack_require__(8);
var StravaStrategy = __webpack_require__(1).Strategy;

var configDB = __webpack_require__(9);

var server = express();

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || '3000';

mongoose.connect(configDB.url, function () {
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

__webpack_require__(10)(passport);
__webpack_require__(13)(server, passport);

// Import and Set Nuxt.js options
var config = __webpack_require__(14);
config.dev = !("development" === 'production');

// Init Nuxt.js
var nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  var builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
server.use(nuxt.render);

// Listen the server
server.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
    'url': 'mongodb://localhost/carlessDB'
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var configAuth = __webpack_require__(11);
var StravaStrategy = __webpack_require__(1).Strategy;
var User = __webpack_require__(12);

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new StravaStrategy({
		clientID: configAuth.stravaAuth.clientID,
		clientSecret: configAuth.stravaAuth.clientSecret,
		callbackURL: configAuth.stravaAuth.callbackURL
	}, function (accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		process.nextTick(function () {
			User.findOne({ 'strava.id': profile._json.id }, function (err, user) {
				if (err) {
					console.log("Error");
					return done(err);
				}
				if (user) {
					console.log("User " + profile._json.firstname + " " + profile._json.lastname + " found in database.");
					return done(null, user);
				} else {
					console.log("User " + profile._json.firstname + " " + profile._json.lastname + " saved to database.");
					var newUser = new User();
					newUser.strava.id = profile._json.id;
					newUser.strava.token = profile.token;
					newUser.firstName = profile._json.firstname;
					newUser.lastName = profile._json.lastname;
					newUser.sex = profile._json.sex;
					newUser.email = profile._json.email;
					newUser.city = profile._json.city;
					newUser.state = profile._json.state;
					newUser.profilePic = profile._json.profile;
					newUser.userBio = null;
					// newUser.created_at = Date.now();
					// newUser.updated_at = Date.now();

					newUser.save(function (err) {
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
    'stravaAuth': {
        'clientID': '20070',
        'clientSecret': '30aa8be4649723167e242710ff20e270571761a8',
        'callbackURL': 'http://localhost:3000/auth/strava/callback'
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

// user Schema
var userSchema = new mongoose.Schema({
  strava: {
    id: String,
    token: String
  },
  firstName: String,
  lastName: String,
  sex: String,
  email: String,
  city: String,
  state: String,
  profilePic: String,
  userBio: String,
  created_at: Date,
  updated_at: Date
});

// make this available to our users in our Node applications
module.exports = mongoose.model('User', userSchema);

/***/ }),
/* 13 */
/***/ (function(module, exports) {


module.exports = function (server, passport) {

  server.get('/auth/strava', passport.authenticate('strava'));

  server.get('/auth/strava/callback', passport.authenticate('strava', {
    failureRedirect: 'http://localhost:3000',
    successRedirect: 'http://localhost:3000',
    failureFlash: true
  }));

  server.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var _build;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = _defineProperty({
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: (_build = {
    vendor: ['axios']
  }, _defineProperty(_build, 'vendor', ['vuetify']), _defineProperty(_build, 'extractCSS', true), _defineProperty(_build, 'extend', function extend(config, ctx) {
    if (ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      });
    }
  }), _build),
  /*
  ** Load Vuetify into the app
  */
  plugins: ['~/plugins/vuetify']
}, 'css', ['~/assets/css/app.styl']);

/***/ })
/******/ ]);
//# sourceMappingURL=main.map