var User = require('../api/models/user.js');
var Activity = require('../api/models/activities.js');
var ActivityGroups = require('../api/models/groups.js');

module.exports = function(server, passport){

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
    ActivityGroups.find({}, function(err, group){
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
      groupId: req.body.groupId,
      profilePic: req.body.profilePic,
      state: req.body.state,
      city: req.body.city,
      email: req.body.email,
      sex: req.body.sex,
      lastName: req.body.lastName,
      firstName: req.body.firstName
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
            groupId: req.body[key].groupId,
            profilePic: req.body[key].profilePic,
            state: req.body[key].state,
            city: req.body[key].city,
            email: req.body[key].email,
            sex: req.body[key].sex,
            lastName: req.body[key].lastName,
            firstName: req.body[key].firstName
          }}, {new: true}, function (err, user) {
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


  require('./activities/dailyLog.js')(server, User, Activity, ActivityGroups);

  require('./activities/weeklyLog.js')(server, User, Activity, ActivityGroups);
  
  require('./activities/monthlyLog.js')(server, User, Activity, ActivityGroups);

  require('./activities/yearlyLog.js')(server, User, Activity, ActivityGroups);

}
