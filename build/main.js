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
  username: String,
  sex: String,
  email: String,
  city: String,
  state: String,
  profilePic: String,
  userBio: String,
  groupId: { type: mongoose.Schema.ObjectId },
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

var host = process.env.HOST || '0.0.0.0';
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
var config = __webpack_require__(24);
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

/*eslint-disable*/

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
					newUser.firstName = null;
					newUser.lastName = null;
					newUser.username = null;
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
        'clientID': '24180',
        'clientSecret': 'd03c440b12e127955225e74d2b24dadf2e2b0cd2',
        'callbackURL': 'http://localhost:3000/auth/strava/callback'
    }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-disable*/
var strava = __webpack_require__(14);
var multer = __webpack_require__(15);
var crypto = __webpack_require__(16);
var fs = __webpack_require__(17);

var User = __webpack_require__(2);
var Activity = __webpack_require__(18);
var ActivityGroup = __webpack_require__(19);

var stravaConfig = __webpack_require__(20);

var polylineEdgePoints = __webpack_require__(21);

var mongoose = __webpack_require__(0);

module.exports = function (server, passport) {

  server.get('/auth/strava', passport.authenticate('strava'));

  server.get('/auth/strava/callback', passport.authenticate('strava', {
    failureRedirect: '/',
    successRedirect: '/',
    failureFlash: true
  }));

  server.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  var groupMap = [];
  server.get('/api/activity/groups', function (req, res) {
    ActivityGroup.find({}, function (err, group) {
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
          groupId: req.body.groupId ? mongoose.Types.ObjectId(req.body.groupId) : null,
          profilePic: req.body.profilePic,
          state: req.body.state,
          city: req.body.city,
          email: req.body.email,
          sex: req.body.sex,
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          username: req.body.username
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
                groupId: mongoose.Types.ObjectId(req.body[key].groupId),
                profilePic: req.body[key].profilePic,
                state: req.body[key].state,
                city: req.body[key].city,
                email: req.body[key].email,
                sex: req.body[key].sex,
                lastName: req.body[key].lastName,
                firstName: req.body[key].firstName,
                username: req.body[key].username
              } }, { new: true }, function (err, user) {
              if (err) return handleError(err);
            });
          }
        }
        res.json();
      }
    }
  });

  var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
      return cb(null, './static/img/users/');
    },
    filename: function filename(req, file, callback) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return callback(err);

        callback(null, raw.toString('hex') + '.jpg');
      });
    }
  });

  var upload = multer({ storage: storage,
    limits: {
      fileSize: 1000000
    }
  });

  server.post('/user/upload_avatar', upload.single('avatar'), function (req, res) {
    if (!req.file) {
      return res.send({
        success: false
      });
    } else {
      ;

      var path = req.file.path.split("static");

      User.findByIdAndUpdate(req.body.userId, { $set: {

          profilePic: path[1]

        } }, { new: true }, function (err, user) {
        if (err) return handleError(err);
        res.json();
      });

      var oldPhotoPath = './static/' + req.body.oldPath;

      if (fs.existsSync(oldPhotoPath)) {
        fs.unlink(oldPhotoPath, function (err) {
          if (err) throw err;
        });
      }

      return res.send({
        success: true,
        newPath: path[1]
      });
    }
  });

  server.post('/user/delete_avatar', function (req, res) {

    User.findByIdAndUpdate(req.body.userId, { $set: { profilePic: null } }, { new: true }, function (err, user) {
      if (err) return handleError(err);
      res.json();
    });

    var oldPhotoPath = './static/' + req.body.oldPath;

    if (fs.existsSync(oldPhotoPath)) {
      fs.unlink(oldPhotoPath, function (err) {
        if (err) throw err;
      });
    }

    return res.send({
      success: true,
      newPath: null
    });
  });

  server.post('/api/delete_user_from_group', function (req, res) {

    User.findByIdAndUpdate(req.body._id, { $set: { groupId: null } }, { new: true }, function (err, user) {
      if (err) return handleError(err);
      res.json();
    });
  });

  server.post('/api/update_group', function (req, res) {

    var updateQuery = {};

    if (!req.body.locations) {
      updateQuery.locations = [];
    } else {
      updateQuery.locations = req.body.locations;
    }

    if (!req.body.timeBox) {
      updateQuery.timeBox = [];
    } else {
      updateQuery.timeBox = req.body.timeBox;
    }

    ActivityGroup.findOneAndUpdate({ _id: req.body._id }, { $set: updateQuery }, { new: true }, function (err, group) {
      if (err) return handleError(err);
      res.json();
    });
  });

  // -------------- Webhook Events --------------

  server.get('/webhook/strava/strava_callback', function (req, res) {
    res.status(200);
    res.json({ "hub.challenge": req.query['hub.challenge'] });
  });

  server.post('/webhook/strava/strava_callback', function (req, res) {

    if (req.body.object_type == "activity") {
      var endTime = function endTime(startTimeISO, elapsedTime) {

        var start_time = startTimeISO; // ISO format
        var elapsed_time = elapsedTime; // seconds

        var t = new Date(start_time);
        t.setSeconds(t.getSeconds() + elapsed_time); // adding seconds

        var end_time = t.toISOString(); // converting time to ISO format

        return end_time;
      };

      var userId;

      User.findOne({ 'strava.id': req.body.owner_id }, function (err, user) {
        if (err) console.log("ERROR - can't find user by strava ID");

        if (user) {
          userId = user._id;
        }
      });

      Activity.findOne({ stravaId: req.body.object_id }, function (err, activity) {
        if (err) console.log("ERROR - can't find activity in database!");

        if (!activity) {
          strava.activities.get({ id: req.body.object_id, 'access_token': stravaConfig.access_token }, function (err, data) {

            var edgePoints = polylineEdgePoints.positionPointsFromPolyline(data.map.polyline);

            var newActivity = new Activity({
              stravaId: data.id,
              userId: mongoose.Types.ObjectId(userId),
              title: data.name,
              type: data.type,
              distance: data.distance, // in meters
              duration: data.elapsed_time, // in sec
              endTime: endTime(data.start_date, data.elapsed_time),
              startPoint: edgePoints.startPoint,
              endPoint: edgePoints.endPoint,
              map: {
                id: data.map.id,
                polyline: data.map.polyline,
                summaryPolyline: data.map.summary_polyline
              },
              created_at: data.start_date, // ISO format
              updated_at: data.start_date // ISO format

            });

            newActivity.save(function (err) {
              if (err) {
                console.log("ERROR - can't save activity to database!");
                throw err;
              }
            });
          });
        }
      });
    }
  });

  server.get('/log/group', function (req, res) {

    var newGroup = new ActivityGroup({
      adminMail: "danijel.m.js@gmail.com",
      groupName: "Test grupa",
      private: false,
      groupDescription: "Grupa za testiranje CarLess aplikacije",
      locations: [],
      timeBox: [],
      maxDistance: 400,
      created_at: Date.now(),
      updated_at: Date.now()

    });

    newGroup.save(function (err) {
      if (err) {
        console.log("ERROR - can't save group to database!");
        throw err;
      }
    });
  });

  // server.get('/api/useractivities', function (req, res) {
  //   console.log("Hoce?");

  //   strava.athlete.listActivities({'access_token':'cf9be88f3d1b6c3ebba37445b43345f14f530915'}, function(err, data){
  //     console.log(data)
  //   })
  // });

  // server.get('/api/polyline', function (req, res) {
  // var polyline = "{g{wGus}cBMOFg@AS@SDI?[IW@{AFWNSG[BUIUAi@B]Qo@UWc@W[Uo@[g@Sg@a@uBiAo@KM@u@ED@I?GCCkAKMBs@Re@A_@I]@WPK?GLSGGU?KEAIBFOEFBIDOOG?EEJJ`@HGAFJZDAQ?_@BOA[MMAg@Gi@@]Ik@Cg@GW?YDWIy@@UEy@@KFETFBDBL@p@HZOBDD";


  // console.log(object);
  // })


  // server.get('/api/logactivity', function (req, res) {

  //   req.body.object_id = '1183905954';

  //   Activity.findOne({stravaId: req.body.object_id}, function(err, activity) {
  //     if (err) console.log("ERROR - can't find activity in database!");

  //     if(!activity){
  //       strava.activities.get({id: req.body.object_id, 'access_token':'cf9be88f3d1b6c3ebba37445b43345f14f530915'}, function(err, data){

  //         var edgePoints = polylineEdgePoints.positionPointsFromPolyline(data.map.polyline);
  //         console.log(data);
  //         var newActivity = new Activity({
  //           stravaId:  data.id,
  //           userId: mongoose.Types.ObjectId("59ee08edfc6a6c101ba66fca"),
  //           type: data.type,
  //           distance: data.distance, // in meters
  //           duration: data.elapsed_time, // in sec
  //           endTime: endTime(data.start_date, data.elapsed_time),
  //           startPoint: edgePoints.startPoint,
  //           endPoint: edgePoints.endPoint,
  //           map: {
  //             id: data.map.id,
  //             polyline: data.map.polyline,
  //             summaryPolyline: data.map.summary_polyline
  //           },
  //           created_at: data.start_date, // ISO format
  //           updated_at: data.start_date // ISO format

  //         });

  //         newActivity.save(function(err){
  //           if(err){
  //             console.log("ERROR - can't save activity to database!");
  //             throw err;
  //           }
  //         });

  //       });
  //     }

  //   })

  // });


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


  // require('./activities/dailyLog.js')(server, User, Activity, ActivityGroup);

  // require('./activities/weeklyLog.js')(server, User, Activity, ActivityGroup);

  // require('./activities/monthlyLog.js')(server, User, Activity, ActivityGroup);

  // require('./activities/yearlyLog.js')(server, User, Activity, ActivityGroup);


  __webpack_require__(22)(server, User, Activity, ActivityGroup);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("strava-v3");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

// activity Schema
mongoose.Promise = global.Promise;
var activitySchema = new mongoose.Schema({
    stravaId: String,
    userId: { type: mongoose.Schema.ObjectId, required: true },
    title: String,
    type: String,
    distance: Number,
    duration: Number,
    endTime: String,
    startPoint: {
        position: {
            lat: String,
            lng: String
        }
    },
    endPoint: {
        position: {
            lat: String,
            lng: String
        }
    },
    map: {
        id: String,
        polyline: String,
        summaryPolyline: String
    },
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Activity', activitySchema);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(0);

// group Schema
mongoose.Promise = global.Promise;
var groupSchema = new mongoose.Schema({
  adminMail: String,
  groupName: String,
  private: Boolean,
  groupDescription: String,
  locations: [],
  timeBox: [],
  maxDistance: Number,
  created_at: Date,
  updated_at: Date
});

// make this available to our users in our Node applications
module.exports = mongoose.model('Group', groupSchema);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {"access_token":"cf9be88f3d1b6c3ebba37445b43345f14f530915","client_id":"24180","client_secret":"d03c440b12e127955225e74d2b24dadf2e2b0cd2","redirect_uri":"http://localhost:3000/auth/strava/callback"}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/*eslint-disable*/

module.exports = {

    positionPointsFromPolyline: function positionPointsFromPolyline(polyline, precision) {
        var polylineDecode = function polylineDecode(str, precision) {
            var index = 0,
                lat = 0,
                lng = 0,
                coordinates = [],
                shift = 0,
                result = 0,
                byte = null,
                latitude_change,
                longitude_change,
                factor = Math.pow(10, precision || 5);

            // Coordinates have variable length when encoded, so just keep
            // track of whether we've hit the end of the string. In each
            // loop iteration, a single coordinate is decoded.
            while (index < str.length) {

                // Reset shift, result, and byte
                byte = null;
                shift = 0;
                result = 0;

                do {
                    byte = str.charCodeAt(index++) - 63;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);

                latitude_change = result & 1 ? ~(result >> 1) : result >> 1;

                shift = result = 0;

                do {
                    byte = str.charCodeAt(index++) - 63;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);

                longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

                lat += latitude_change;
                lng += longitude_change;

                coordinates.push([lat / factor, lng / factor]);
            }

            return coordinates;
        };

        var path = polylineDecode(polyline, precision);

        var start = path[0];
        var end = path[path.length - 1];

        var edgePoints = {
            startPoint: {
                position: {
                    lat: start[0],
                    lng: start[1]
                }
            },

            endPoint: {
                position: {
                    lat: end[0],
                    lng: end[1]
                }
            }
        };

        return edgePoints;
    }

};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-disable*/

var AtoB = __webpack_require__(23);

// COMMENTS:

// -- TEXT -- -> TEXT is heading or description of code block, start of code block
// -- TEXT [END] -- -> end of code block

// text -> text is description of code line

// *text* -> text is variable
// 'text' -> text is value of variable
// "text" -> text is string


module.exports = function (server, User, Activity, ActivityGroups) {

    server.use('/api/activities/:timeRange/:mode', function (req, res, next) {

        var mode = req.params.mode; // returning data mode from route ('all', [by id], other -> send "empty")
        var timeRange = req.params.timeRange; //returning time range of activities from route ('daily', 'weekly', 'monthly' -> DEFAULT, 'yearly')

        if (timeRange == 'daily') {
            var time = new Date().setHours(0, 0, 0, 0); // start of day
        } else if (timeRange == 'weekly') {
            var curr = new Date();
            var firstOfWeek = curr.getDate() - curr.getDay(); // first day is the day of the month - the day of the week
            var time = new Date(curr.setDate(firstOfWeek)).setHours(0, 0, 0, 0); //start of week
        } else if (timeRange == 'monthly') {
            var time = new Date().getTime() - 30 * 24 * 60 * 60 * 1000; // start of month
        } else if (timeRange == "yearly") {
            var time = new Date(new Date().getFullYear(), 0, 1).setHours(0, 0, 0, 0); // start of year
        } else {
            var time = new Date().getTime() - 30 * 24 * 60 * 60 * 1000; // start of month
        }

        var radius = 100; //meters


        var rad = function rad(x) {
            return x * Math.PI / 180;
        };

        var getDistance = function getDistance(p1, p2) {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(p2.lat - p1.lat);
            var dLong = rad(p2.lng - p1.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d; // returns the distance in meter
        };

        Activity.aggregate([{
            $match: {
                created_at: { $gt: new Date(time) }, // filter activities by date 
                type: "Ride" // filter activities by type
            }
        }, {
            $group: {
                _id: "$userId", // group by user id
                activities: {
                    $push: {
                        _id: "$_id",
                        distance: "$distance",
                        endPoint: "$endPoint",
                        endTime: "$endTime"
                    }
                }

            }
        }, {
            $lookup: {
                from: "users", // connecting to *users* collection (not model!!!)
                localField: "_id", // local field to compare from activities collection
                foreignField: "_id", // foreign field to compare from users collection
                as: "userData" // variable in which will data be written
            }
        }, {
            $unwind: '$userData'
        }, {
            $project: {
                userData: {
                    __v: 0,
                    created_at: 0,
                    updated_at: 0
                }
            }
        }, {
            $group: {
                _id: "$userData.groupId", // grouping users by group id
                users: {
                    $push: { // pushes each user in *users* array for each group id
                        userId: "$_id",
                        userData: "$userData",
                        activities: "$activities"
                    }
                }
            }
        }, {
            $lookup: {
                from: "groups",
                localField: "_id",
                foreignField: "_id",
                as: "groupInfo"
            }
        }, {
            $unwind: '$groupInfo'
        }], function (err, result) {
            if (err) {
                next(err);
            } else {

                var noUsers = [];
                var loopGroups = 0;

                result.forEach(function (group, groupIndex) {
                    var noActivities = [];
                    var loopUsers = 0;

                    group.users.forEach(function (user, userIndex) {
                        var notPass = [];
                        var loopActivities = 0;

                        var distance = 0;
                        var activityCount = 0;
                        user.activities.forEach(function (activity, index) {

                            var AtoBdistance = {};
                            var timeBox = {};

                            if (group.groupInfo.locations[0]) {
                                AtoBdistance = AtoB.AtoBdistance(group.groupInfo.locations[0], activity.endPoint, group.groupInfo.maxDistance);
                            } else {
                                AtoBdistance.isInMaxRange = true;
                            }

                            if (group.groupInfo.timeBox[0]) {
                                timeBox = AtoB.timeBox(group.groupInfo.timeBox, activity.endTime);
                            } else {
                                timeBox.isInAny = true;
                            }

                            if (AtoBdistance.isInMaxRange == false) {
                                notPass.push(index);
                            } else if (timeBox.isInAny == false) {
                                notPass.push(index);
                            }
                        });

                        notPass.forEach(function (index) {
                            index = index - loopActivities;
                            user.activities.splice(index, 1);
                            loopActivities = loopActivities + 1;
                        });

                        user.activities.forEach(function (activity) {
                            distance = distance + activity.distance;
                            activityCount = activityCount + 1;
                        });

                        if (distance == 0 && activityCount == 0) {
                            noActivities.push(userIndex);
                        } else {
                            user.distance = distance;
                            user.activityCount = activityCount;
                        }
                    });

                    noActivities.forEach(function (index) {
                        index = index - loopUsers;
                        group.users.splice(index, 1);
                        loopUsers = loopUsers + 1;
                    });

                    if (group.users[0] == null) {
                        noUsers.push(groupIndex);
                    }
                });

                noUsers.forEach(function (index) {
                    index = index - loopGroups;
                    result.splice(index, 1);
                    loopGroups = loopGroups + 1;
                });

                //-- RETURNING DATA BY *mode* --

                // checking if *mode* is group ID
                var foundGroupId = false;
                for (var i = 0; i < result.length; i++) {
                    if (result[i]._id == mode) {
                        foundGroupId = true;
                        break;
                    }
                }

                // checking if *mode* is 'all'
                if (mode == 'all') {
                    res.send(result); // sending all results
                }

                // checking if *mode* doesn't exist
                else if (mode == null) {
                        res.send(result); // sending all results
                    }

                    // if *mode* is group ID, sending activities of that group
                    else if (foundGroupId) {
                            result.forEach(function (group) {
                                // serching for group by ID
                                if (mode == group._id) {
                                    res.send(group); //sending activities of group
                                }
                            });
                        } else {
                            res.status(200).json("empty"); // anything else, send "empty"
                        }
            }
        });
    });
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*eslint-disable*/

module.exports = {

    AtoBdistance: function AtoBdistance(location1, location2, maxRange) {

        function toRad(x) {
            return x * Math.PI / 180;
        }

        var lat1 = location1.position.lat;
        var lon1 = location1.position.lng;

        var lat2 = location2.position.lat;
        var lon2 = location2.position.lng;

        var R = 6371000; // m 

        var x1 = lat2 - lat1;
        var dLat = toRad(x1);
        var x2 = lon2 - lon1;
        var dLon = toRad(x2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        var isInMaxRange;
        var distance;

        if (d > maxRange) {
            isInMaxRange = false;
        } else {
            isInMaxRange = true;
        }

        var result = {
            distance: d,
            isInMaxRange: isInMaxRange
        };

        return result;
    },

    timeBox: function timeBox(timeBoxArray, selectedTime) {
        function ISOtoDaySeconds(date) {
            var d = new Date(date);
            var datetext = d.toTimeString();

            datetext = datetext.split(' ')[0]; // Take the first value from array

            var a = datetext.split(':'); // split it at the colons
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

            return seconds;
        }

        function HHandMMtoSec(timeString) {
            var hms = timeString; // input string
            var a = hms.split(':'); // split it at the colons

            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = +a[0] * 60 * 60 + +a[1] * 60;

            return seconds;
        }

        var time = ISOtoDaySeconds(selectedTime);

        var isInAny = false;
        var passedTimeframesIndex = [];

        timeBoxArray.forEach(function (timeframe, index) {
            var timeframeStart = HHandMMtoSec(timeframe.start);
            var timeframeEnd = HHandMMtoSec(timeframe.end);

            if (timeframeStart <= time && time <= timeframeEnd) {
                isInAny = true;
                passedTimeframesIndex.push(index);
            }
        });

        var timeframes = {
            isInAny: isInAny,
            passedTimeframeIndexes: passedTimeframesIndex
        };

        return timeframes;
    }
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*eslint-disable*/

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
    vendor: ['axios', 'vuetify'],
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

      if (!ctx.isClient) {
        // This instructs Webpack to include `vue2-google-maps`'s Vue files
        // for server-side rendering
        config.externals.splice(0, 0, function (context, request, callback) {
          if (/^vue2-google-maps($|\/)/.test(request)) {
            callback(null, false);
          } else {
            callback();
          }
        });
      }
    }
  },

  plugins: [{ src: '~plugins/vuetify' }, { src: '~plugins/googleMaps' }, { src: '~plugins/croppa' }]
}, 'css', ['~/assets/css/app.styl']);

/***/ })
/******/ ]);
//# sourceMappingURL=main.map