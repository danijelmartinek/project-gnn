/*eslint-disable*/
const strava = require('strava-v3');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');

var User = require('../api/models/user.js');
var Activity = require('../api/models/activities.js');
var ActivityGroup = require('../api/models/groups.js');

var stravaConfig = require('./../data/strava_config.json');

var polylineEdgePoints = require('./map/polylineEdgePoints.js');

var mongoose = require('mongoose');

module.exports = function(server, passport){

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
    ActivityGroup.find({}, function(err, group){
      group.forEach(function(group) {
        groupMap.push(group);
      });
      res.contentType('application/json');
      res.send(groupMap);
      groupMap = [];
    });
  });


  var usersMap = [];
  server.get('/api/users', function (req, res) {
    User.find({}, function(err, users){
      users.forEach(function(user) {
        usersMap.push(user);
      });
      res.contentType('application/json');
      res.send(usersMap);
      usersMap = [];
    });
  });


 server.post('/api/update_user', function(req, res) {
  var count = Object.keys(req.body).length;

  if (req.body._id) {    
    User.findByIdAndUpdate(req.body._id,{$set:{
      userBio: req.body.userBio,
      groupId: (req.body.groupId) ? mongoose.Types.ObjectId(req.body.groupId): null,
      profilePic: req.body.profilePic,
      state: req.body.state,
      city: req.body.city,
      email: req.body.email,
      sex: req.body.sex,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      username: req.body.username
    }}, {new: true}, function (err, user) {
      if (err) return handleError(err);
      res.json();
    });
  }else{
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    }else{
      for(var key in req.body) {
        if(req.body.hasOwnProperty(key)){
          User.findByIdAndUpdate(req.body[key]._id,{$set:{
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
          }}, {new: true}, function (err, user) {
            if (err) return handleError(err);
          });
        }
      }
      res.json();
    }
  }
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './static/img/users/');
  },
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);
    
      callback(null, raw.toString('hex') + '.jpg');
    });
  }
});

var upload = multer({storage: storage, 
  limits: {
      fileSize: 1000000
  }
});

server.post('/user/upload_avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.send({
      success: false
    });

  } else {;
    
    var path = req.file.path.split("static");

    User.findByIdAndUpdate(req.body.userId,{$set:{

      profilePic: path[1]

    }}, {new: true}, function (err, user) {
      if (err) return handleError(err);
      res.json();
    });

    var oldPhotoPath = './static/' + req.body.oldPath;

    if (fs.existsSync(oldPhotoPath)) {
      fs.unlink(oldPhotoPath, (err) => {
        if (err) throw err;
      });
    }

    return res.send({
      success: true,
      newPath: path[1]
    })
  }
});

server.post('/user/delete_avatar', function(req, res) {
  
    User.findByIdAndUpdate(req.body.userId,{$set:{profilePic: null}}, {new: true}, function (err, user) {
      if (err) return handleError(err);
      res.json();
    });

    var oldPhotoPath = './static/' + req.body.oldPath;
    
    if (fs.existsSync(oldPhotoPath)) {
      fs.unlink(oldPhotoPath, (err) => {
        if (err) throw err;
      });
    }

    return res.send({
      success: true,
      newPath: null
    })
});



server.post('/api/delete_user_from_group', function(req, res) {
  
    User.findByIdAndUpdate(req.body._id,{$set:{groupId: null}}, {new: true}, function (err, user) {
      if (err) return handleError(err);
      res.json();
    });
});

server.post('/api/update_group', function(req, res) {

  const updateQuery = {};

  if (!req.body.locations) {
    updateQuery.locations = [];
  }else{
    updateQuery.locations = req.body.locations;
  }

  if (!req.body.timeBox) {
    updateQuery.timeBox = [];
  }else{
    updateQuery.timeBox = req.body.timeBox;  
  }
  
  ActivityGroup.findOneAndUpdate({_id: req.body._id}, {$set: updateQuery}, {new: true}, function (err, group) {
    if (err) return handleError(err);
    res.json();
  });
});


// -------------- Webhook Events --------------

server.get('/webhook/strava/strava_callback', function(req, res){
  res.status(200);
  res.json({"hub.challenge": req.query['hub.challenge']});
});

server.post('/webhook/strava/strava_callback', function(req, res) {

  if(req.body.object_type == "activity"){

    var userId;

    function endTime(startTimeISO, elapsedTime){
      
        var start_time = startTimeISO; // ISO format
        var elapsed_time = elapsedTime; // seconds
      
        var t = new Date(start_time);
        t.setSeconds(t.getSeconds() + elapsed_time); // adding seconds
      
        var end_time = t.toISOString(); // converting time to ISO format
      
        return end_time;
      
      }

    User.findOne({'strava.id': req.body.owner_id}, function (err, user){
      if (err) console.log("ERROR - can't find user by strava ID");

      if(user){
        userId = user._id;
      }
    });

    Activity.findOne({stravaId: req.body.object_id}, function(err, activity) {
      if (err) console.log("ERROR - can't find activity in database!");

      if(!activity){
        strava.activities.get({id: req.body.object_id, 'access_token': stravaConfig.access_token}, function(err, data){
          if(data.manual == false){
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

            newActivity.save(function(err){
              if(err){
                console.log("ERROR - can't save activity to database!");
                throw err;
              }
            });
          }

        });
      }

    })
  }
})


// STRAVA WEBHOOK
// curl -X POST https://api.strava.com/api/v3/push_subscriptions \
// -F client_id={Strava_app_id} \
// -F client_secret={Strava_app_secret} \
// -F 'callback_url=http://{domain}/webhook/strava/strava_callback' \
// -F 'verify_token=STRAVA'


  require('./activities/activities.js')(server, User, Activity, ActivityGroup);
}
