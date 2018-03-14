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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

var mongoose = __webpack_require__(0);

// user Schema
mongoose.Promise = global.Promise;
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
  groupId: String,
  created_at: Date,
  updated_at: Date
});

// make this available to our users in our Node applications
module.exports = mongoose.model('User', userSchema);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(4),
    Nuxt = _require.Nuxt,
    Builder = _require.Builder;

var express = __webpack_require__(5);
var mongoose = __webpack_require__(0);
var session = __webpack_require__(6);
var cookieParser = __webpack_require__(7);
var bodyParser = __webpack_require__(8);
var passport = __webpack_require__(9);
var StravaStrategy = __webpack_require__(1).Strategy;

var configDB = __webpack_require__(10);

var server = express();

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || '3000';

mongoose.connect(configDB.url, function () {});

// For serving static files from public directory
// server.use(express.static('public'));
server.use(cookieParser());
server.use(bodyParser());
server.use(session({
  secret: 'c4rl3ss doggo'
}));
server.use(passport.initialize());
server.use(passport.session());

__webpack_require__(11)(passport);
__webpack_require__(13)(server, passport);

// Import and Set Nuxt.js options
var config = __webpack_require__(20);
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
    'url': 'mongodb://localhost/carlessDB'
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var configAuth = __webpack_require__(12);
var StravaStrategy = __webpack_require__(1).Strategy;
var User = __webpack_require__(2);

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
					newUser.groupId = null;
					newUser.created_at = Date.now();
					newUser.updated_at = Date.now();

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
/* 12 */
/***/ (function(module, exports) {

module.exports = {
    'stravaAuth': {
        'clientID': '20070',
        'clientSecret': '30aa8be4649723167e242710ff20e270571761a8',
        'callbackURL': 'http://localhost:3000/auth/strava/callback'
    }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var User = __webpack_require__(2);
var Activity = __webpack_require__(14);
var ActivityGroups = __webpack_require__(15);

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

  var groupMap = [];
  server.get('/api/activity/groups', function (req, res) {
    ActivityGroups.find({}, function (err, group) {
      group.forEach(function (group) {
        groupMap.push(group);
      });
      res.contentType('application/json');
      res.send(groupMap);
      groupMap = [];
    });
  });

  var usersMap = [];
  server.get('/api/users', function (req, res) {
    User.find({}, function (err, users) {
      users.forEach(function (user) {
        usersMap.push(user);
      });
      res.contentType('application/json');
      res.send(usersMap);
      usersMap = [];
    });
  });

  server.post('/api/update_user', function (req, res) {
    var count = Object.keys(req.body).length;

    if (req.body._id) {
      User.findByIdAndUpdate(req.body._id, { $set: {
          userBio: req.body.userBio,
          groupId: req.body.groupId,
          profilePic: req.body.profilePic,
          state: req.body.state,
          city: req.body.city,
          email: req.body.email,
          sex: req.body.sex,
          lastName: req.body.lastName,
          firstName: req.body.firstName
        } }, { new: true }, function (err, user) {
        if (err) return handleError(err);
        res.json();
      });
    } else {
      if (req.body.constructor === Object && Object.keys(req.body).length === 0) {} else {
        for (var key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            User.findByIdAndUpdate(req.body[key]._id, { $set: {
                userBio: req.body[key].userBio,
                groupId: req.body[key].groupId,
                profilePic: req.body[key].profilePic,
                state: req.body[key].state,
                city: req.body[key].city,
                email: req.body[key].email,
                sex: req.body[key].sex,
                lastName: req.body[key].lastName,
                firstName: req.body[key].firstName
              } }, { new: true }, function (err, user) {
              if (err) return handleError(err);
            });
          }
        }
        res.json();
      }
    }
  });

  // server.get('/api/carlessDB/logactivity1', function (req, res) {
  //   console.log("Activity saved to database.");
  //       var newActivity = new Activity();
  //       newActivity.userId = '5a9534ab137aae52ecd2fdc9';
  //       newActivity.type = "Ride";
  //       newActivity.distance = 4250;
  //       newActivity.created_at = new Date();

  //       newActivity.save((err) => {
  //         if(err)
  //           throw err;
  //       });	
  // });


  __webpack_require__(16)(server, User, Activity, ActivityGroups);

  __webpack_require__(17)(server, User, Activity, ActivityGroups);

  __webpack_require__(18)(server, User, Activity, ActivityGroups);

  __webpack_require__(19)(server, User, Activity, ActivityGroups);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

// activity Schema
mongoose.Promise = global.Promise;
var activitySchema = new mongoose.Schema({
    userId: String,
    type: String,
    distance: Number,
    duration: Number,
    endPoint: Array,
    map: {
        id: String,
        polyline: String,
        summaryPolyline: String
    },
    created_at: Date
});

module.exports = mongoose.model('Activity', activitySchema);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

// group Schema
mongoose.Promise = global.Promise;
var groupSchema = new mongoose.Schema({
  adminMail: String,
  groupName: String,
  groupDescription: String,
  created_at: Date,
  updated_at: Date
});

// make this available to our users in our Node applications
module.exports = mongoose.model('Group', groupSchema);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (server, User, Activity, ActivityGroups) {

    server.get('/api/activities/dailydata', function (req, res, next) {
        var dailyDataConstructor = function dailyDataConstructor(userId, userFirstName, userLastName, dayDistance) {
            this.userId = userId;
            this.userFirstName = userFirstName;
            this.userLastName = userLastName;
            this.dayDistance = dayDistance;
        };

        var activityMap = [];
        var userMap = [];

        var dailyData = [];

        forEachCount = 0;

        var BreakSignal = function BreakSignal() {
            _classCallCheck(this, BreakSignal);
        };

        ;

        //filtriranje aktivnosti po trenutnom danu
        var now = new Date();

        var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        Activity.find({ "created_at": { $gte: startOfToday }

        }).then(function (activity) {
            if (activity[0] == null) {
                userMap.push('noData');
                res.send(userMap);
                throw new BreakSignal();
            } else {
                activity.forEach(function (activity) {
                    activityMap.push(activity);
                });
                return activityMap;
            }
        }).then(function (activityMap) {
            activityMap.forEach(function (activity) {
                var userId = activity.userId;

                User.find().then(function (users) {
                    users.forEach(function (user) {
                        userMap.push(user);
                    });
                    return userMap;
                }).then(function (userMap) {
                    var found = false;
                    for (var i = 0; i < dailyData.length; i++) {
                        if (dailyData[i].userId === userId) {
                            found = true;
                            break;
                        }
                    }
                    if (found == true) {
                        userIndex = dailyData.findIndex(function (obj) {
                            return obj.userId === userId;
                        });
                        dailyData[userIndex].dayDistance = dailyData[userIndex].dayDistance + activity.distance;
                    } else {

                        var user = userMap.find(function (o) {
                            return o.id === userId;
                        });

                        if (user.groupId === req.user.groupId) {
                            var activityData = new dailyDataConstructor(activity.userId, user.firstName, user.lastName, activity.distance);

                            activityData = JSON.stringify(activityData);
                            activityData = JSON.parse(activityData);

                            dailyData.push(activityData);
                        }
                    }

                    if (activityMap[forEachCount + 1] == null) {
                        if (typeof dailyData !== 'undefined' && dailyData.length > 0) {
                            res.send(dailyData);
                        } else {
                            dailyData.push('noData');
                            res.send(dailyData);
                        }
                    }
                    forEachCount++;
                });
            });
        }).catch(BreakSignal, function () {});
    });
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (server, User, Activity, ActivityGroups) {

  server.get('/api/activities/weeklydata', function (req, res, next) {
    var weeklyDataConstructor = function weeklyDataConstructor(userId, userFirstName, userLastName, weekDistance) {
      this.userId = userId;
      this.userFirstName = userFirstName;
      this.userLastName = userLastName;
      this.weekDistance = weekDistance;
    };

    var activityMap = [];
    var userMap = [];

    var weeklyData = [];

    forEachCount = 0;

    var BreakSignal = function BreakSignal() {
      _classCallCheck(this, BreakSignal);
    };

    ;

    //filtriranje aktivnosti po trenutnom danu
    function getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
          diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }

    startOfWeek = getMonday(new Date()).setHours(0, 0, 0, 0) - 1 * 60 * 60 * 1000;
    var now = new Date();

    Activity.find({ "created_at": { "$gte": startOfWeek, "$lt": now }

    }).then(function (activity) {
      if (activity[0] == null) {
        userMap.push('noData');
        res.send(userMap);
        throw new BreakSignal();
      } else {
        activity.forEach(function (activity) {
          activityMap.push(activity);
        });
        return activityMap;
      }
    }).then(function (activityMap) {
      activityMap.forEach(function (activity) {
        var userId = activity.userId;

        User.find().then(function (users) {
          users.forEach(function (user) {
            userMap.push(user);
          });
          return userMap;
        }).then(function (userMap) {
          var found = false;
          for (var i = 0; i < weeklyData.length; i++) {
            if (weeklyData[i].userId === userId) {
              found = true;
              break;
            }
          }
          if (found == true) {
            userIndex = weeklyData.findIndex(function (obj) {
              return obj.userId === userId;
            });
            weeklyData[userIndex].weekDistance = weeklyData[userIndex].weekDistance + activity.distance;
          } else {

            var user = userMap.find(function (o) {
              return o.id === userId;
            });

            if (user.groupId === req.user.groupId) {
              var activityData = new weeklyDataConstructor(activity.userId, user.firstName, user.lastName, activity.distance);

              activityData = JSON.stringify(activityData);
              activityData = JSON.parse(activityData);

              weeklyData.push(activityData);
            }
          }

          if (activityMap[forEachCount + 1] == null) {
            if (typeof weeklyData !== 'undefined' && weeklyData.length > 0) {
              res.send(weeklyData);
            } else {
              weeklyData.push('noData');
              res.send(weeklyData);
            }
          }
          forEachCount++;
        });
      });
    }).catch(BreakSignal, function () {});
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (server, User, Activity, ActivityGroups) {

  server.get('/api/activities/monthlydata', function (req, res, next) {
    var monthlyDataConstructor = function monthlyDataConstructor(userId, userFirstName, userLastName, monthDistance) {
      this.userId = userId;
      this.userFirstName = userFirstName;
      this.userLastName = userLastName;
      this.monthDistance = monthDistance;
    };

    var activityMap = [];
    var userMap = [];

    var monthlyData = [];

    forEachCount = 0;

    var BreakSignal = function BreakSignal() {
      _classCallCheck(this, BreakSignal);
    };

    ;

    //filtriranje aktivnosti po trenutnom danu
    var now = new Date();
    var startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    Activity.find({ "created_at": { "$gte": startOfMonth, "$lt": now }

    }).then(function (activity) {
      if (activity[0] == null) {
        userMap.push('noData');
        res.send(userMap);
        throw new BreakSignal();
      } else {
        activity.forEach(function (activity) {
          activityMap.push(activity);
        });
        return activityMap;
      }
    }).then(function (activityMap) {
      activityMap.forEach(function (activity) {
        var userId = activity.userId;

        User.find().then(function (users) {
          users.forEach(function (user) {
            userMap.push(user);
          });
          return userMap;
        }).then(function (userMap) {
          var found = false;
          for (var i = 0; i < monthlyData.length; i++) {
            if (monthlyData[i].userId === userId) {
              found = true;
              break;
            }
          }
          if (found == true) {
            userIndex = monthlyData.findIndex(function (obj) {
              return obj.userId === userId;
            });
            monthlyData[userIndex].monthDistance = monthlyData[userIndex].monthDistance + activity.distance;
          } else {

            var user = userMap.find(function (o) {
              return o.id === userId;
            });

            if (user.groupId === req.user.groupId) {
              var activityData = new monthlyDataConstructor(activity.userId, user.firstName, user.lastName, activity.distance);

              activityData = JSON.stringify(activityData);
              activityData = JSON.parse(activityData);

              monthlyData.push(activityData);
            }
          }

          if (activityMap[forEachCount + 1] == null) {
            if (typeof monthlyData !== 'undefined' && monthlyData.length > 0) {
              res.send(monthlyData);
            } else {
              monthlyData.push('noData');
              res.send(monthlyData);
            }
          }
          forEachCount++;
        });
      });
    }).catch(BreakSignal, function () {});
  });
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (server, User, Activity, ActivityGroups) {

  server.get('/api/activities/yearlydata', function (req, res, next) {
    var yearlyDataConstructor = function yearlyDataConstructor(userId, userFirstName, userLastName, yearDistance) {
      this.userId = userId;
      this.userFirstName = userFirstName;
      this.userLastName = userLastName;
      this.yearDistance = yearDistance;
    };

    var activityMap = [];
    var userMap = [];

    var yearlyData = [];

    forEachCount = 0;

    var BreakSignal = function BreakSignal() {
      _classCallCheck(this, BreakSignal);
    };

    ;

    //filtriranje aktivnosti po trenutnom danu
    var now = new Date();
    var startOfYear = new Date(now.getFullYear(), 0, 1);

    Activity.find({ "created_at": { "$gte": startOfYear, "$lt": now }

    }).then(function (activity) {
      if (activity[0] == null) {
        userMap.push('noData');
        res.send(userMap);
        throw new BreakSignal();
      } else {
        activity.forEach(function (activity) {
          activityMap.push(activity);
        });
        return activityMap;
      }
    }).then(function (activityMap) {
      activityMap.forEach(function (activity) {
        var userId = activity.userId;

        User.find().then(function (users) {
          users.forEach(function (user) {
            userMap.push(user);
          });
          return userMap;
        }).then(function (userMap) {
          var found = false;
          for (var i = 0; i < yearlyData.length; i++) {
            if (yearlyData[i].userId === userId) {
              found = true;
              break;
            }
          }
          if (found == true) {
            userIndex = yearlyData.findIndex(function (obj) {
              return obj.userId === userId;
            });
            yearlyData[userIndex].yearDistance = yearlyData[userIndex].yearDistance + activity.distance;
          } else {

            var user = userMap.find(function (o) {
              return o.id === userId;
            });

            if (user.groupId === req.user.groupId) {
              var activityData = new yearlyDataConstructor(activity.userId, user.firstName, user.lastName, activity.distance);

              activityData = JSON.stringify(activityData);
              activityData = JSON.parse(activityData);

              yearlyData.push(activityData);
            }
          }

          if (activityMap[forEachCount + 1] == null) {
            if (typeof yearlyData !== 'undefined' && yearlyData.length > 0) {
              res.send(yearlyData);
            } else {
              yearlyData.push('noData');
              res.send(yearlyData);
            }
          }
          forEachCount++;
        });
      });
    }).catch(BreakSignal, function () {});
  });
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = _defineProperty({

  serverMiddleware: [
    // Will register file from project api directory to handle /api/* requires
    // { path: '/', handler: '~/server/api/logger.js' },
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }, { rel: 'preconnect', href: 'https://www.strava.com/login' }]
  },
  router: {
    base: "/"
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vuetify', 'vue-table-component'],
    extractCSS: true,
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },

  plugins: [{ src: '~plugins/vuetify' }]
}, 'css', ['~/assets/css/app.styl']);

/***/ })
/******/ ]);
//# sourceMappingURL=main.map