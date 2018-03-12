var User = require('../api/models/user.js');
var Activity = require('../api/models/activities.js');
var ActivityGroups = require('../api/models/groups.js');

var data = require('../data/rideSort.json');


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

  server.get('/data', function (req, res) {
    res.send(data);
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
  //  profilePic: req.body.profilePic,
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
        //  profilePic: req.body[key].profilePic,
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




  server.get('/api/carlessDB/logactivity1', function (req, res) {
    console.log("Activity saved to database.");
        var newActivity = new Activity();
        newActivity.userId = '5a9534ab137aae52ecd2fdc9';
        newActivity.type = "Ride";
        newActivity.distance = 4250;
        newActivity.created_at = new Date();
        
        newActivity.save((err) => {
          if(err)
            throw err;
        });	
  });

      















      server.get('/api/activities/dailydata', function (req, res, next) {        
        var dailyDataConstructor = function (userId, userFirstName, userLastName, dayDistance) {
          this.userId = userId;
          this.userFirstName = userFirstName;
          this.userLastName = userLastName;
          this.dayDistance = dayDistance;
        }
        
        var activityMap = [];
        var userMap = [];

        var dailyData =[];

        forEachCount = 0;

        class BreakSignal {};

        //filtriranje aktivnosti po trenutnom danu
        var now = new Date(); 

        var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        Activity.find({"created_at": {$gte: startOfToday}
        
        }).then(function (activity) {
          if (activity[0] == null) {
              userMap.push('noData');
              res.send(userMap);
              throw new BreakSignal();
          }else{
            activity.forEach(function(activity) {
              activityMap.push(activity);
            })
            return activityMap;
          }
        }).then(function(activityMap){
          activityMap.forEach(function(activity) {
            var userId = activity.userId
            
            User.find()
            .then(function(users){
              users.forEach(function(user) {
                userMap.push(user);
              });
              return userMap;
            }).then(function(userMap){
              var found = false;
              for(var i = 0; i < dailyData.length; i++) {
                if (dailyData[i].userId === userId) {
                  found = true;
                    break;
                }
              }
              if(found == true){
                userIndex = dailyData.findIndex((obj => obj.userId === userId));
                dailyData[userIndex].dayDistance = dailyData[userIndex].dayDistance + activity.distance;

              }else{

              var user = userMap.find(o => o.id === userId);
              
                if(user.groupId === req.user.groupId){
                  var activityData = new dailyDataConstructor(
                    activity.userId,
                    user.firstName,
                    user.lastName, 
                    activity.distance
                  );

                  activityData = JSON.stringify(activityData);
                  activityData = JSON.parse(activityData);

                  dailyData.push(activityData);
                }
              }

              if(activityMap[forEachCount + 1] == null){
                if(typeof dailyData !== 'undefined' && dailyData.length > 0){
                  res.send(dailyData);
                }else{
                  dailyData.push('noData');
                  res.send(dailyData);
                }
              }
              forEachCount++
              
            })
              
          })

        }).catch(BreakSignal, () => {});
      });


      server.get('/api/activities/weeklydata', function (req, res, next) {        
        var weeklyDataConstructor = function (userId, userFirstName, userLastName, weekDistance) {
          this.userId = userId;
          this.userFirstName = userFirstName;
          this.userLastName = userLastName;
          this.weekDistance = weekDistance;
        }
        
        var activityMap = [];
        var userMap = [];

        var weeklyData =[];

        forEachCount = 0;

        class BreakSignal {};

        //filtriranje aktivnosti po trenutnom danu
        function getMonday(d) {
          d = new Date(d);
          var day = d.getDay(),
              diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
          return new Date(d.setDate(diff));
        }
        
        startOfWeek = getMonday(new Date()).setHours(0,0,0,0) - (1*60*60*1000);
        var now = new Date();

        Activity.find({"created_at": {"$gte": startOfWeek, "$lt": now}
        
        }).then(function (activity) {
          if (activity[0] == null) {
              userMap.push('noData');
              res.send(userMap);
              throw new BreakSignal();
          }else{
            activity.forEach(function(activity) {
              activityMap.push(activity);
            })
            return activityMap;
          }
        }).then(function(activityMap){
          activityMap.forEach(function(activity) {
            var userId = activity.userId
            
            User.find()
            .then(function(users){
              users.forEach(function(user) {
                userMap.push(user);
              });
              return userMap;
            }).then(function(userMap){
              var found = false;
              for(var i = 0; i < weeklyData.length; i++) {
                if (weeklyData[i].userId === userId) {
                  found = true;
                    break;
                }
              }
              if(found == true){
                userIndex = weeklyData.findIndex((obj => obj.userId === userId));
                weeklyData[userIndex].weekDistance = weeklyData[userIndex].weekDistance + activity.distance;

              }else{

              var user = userMap.find(o => o.id === userId);
              
                if(user.groupId === req.user.groupId){
                  var activityData = new weeklyDataConstructor(
                    activity.userId,
                    user.firstName,
                    user.lastName, 
                    activity.distance
                  );

                  activityData = JSON.stringify(activityData);
                  activityData = JSON.parse(activityData);

                  weeklyData.push(activityData);
                }
              }

              if(activityMap[forEachCount + 1] == null){
                if(typeof weeklyData !== 'undefined' && weeklyData.length > 0){
                  res.send(weeklyData);
                }else{
                  weeklyData.push('noData');
                  res.send(weeklyData);
                }
              }
              forEachCount++
              
            })
              
          })

        }).catch(BreakSignal, () => {});
      });


      server.get('/api/activities/monthlydata', function (req, res, next) {        
        var monthlyDataConstructor = function (userId, userFirstName, userLastName, monthDistance) {
          this.userId = userId;
          this.userFirstName = userFirstName;
          this.userLastName = userLastName;
          this.monthDistance = monthDistance;
        }
        
        var activityMap = [];
        var userMap = [];

        var monthlyData =[];

        forEachCount = 0;

        class BreakSignal {};

        //filtriranje aktivnosti po trenutnom danu
        var now = new Date();
        var startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        Activity.find({"created_at": {"$gte": startOfMonth, "$lt": now}
        
        }).then(function (activity) {
          if (activity[0] == null) {
              userMap.push('noData');
              res.send(userMap);
              throw new BreakSignal();
          }else{
            activity.forEach(function(activity) {
              activityMap.push(activity);
            })
            return activityMap;
          }
        }).then(function(activityMap){
          activityMap.forEach(function(activity) {
            var userId = activity.userId
            
            User.find()
            .then(function(users){
              users.forEach(function(user) {
                userMap.push(user);
              });
              return userMap;
            }).then(function(userMap){
              var found = false;
              for(var i = 0; i < monthlyData.length; i++) {
                if (monthlyData[i].userId === userId) {
                  found = true;
                    break;
                }
              }
              if(found == true){
                userIndex = monthlyData.findIndex((obj => obj.userId === userId));
                monthlyData[userIndex].monthDistance = monthlyData[userIndex].monthDistance + activity.distance;

              }else{

              var user = userMap.find(o => o.id === userId);
              
                if(user.groupId === req.user.groupId){
                  var activityData = new monthlyDataConstructor(
                    activity.userId,
                    user.firstName,
                    user.lastName, 
                    activity.distance
                  );

                  activityData = JSON.stringify(activityData);
                  activityData = JSON.parse(activityData);

                  monthlyData.push(activityData);
                }
              }

              if(activityMap[forEachCount + 1] == null){
                if(typeof monthlyData !== 'undefined' && monthlyData.length > 0){
                  res.send(monthlyData);
                }else{
                  monthlyData.push('noData');
                  res.send(monthlyData);
                }
              }
              forEachCount++
              
            })
              
          })

        }).catch(BreakSignal, () => {});
      });


      server.get('/api/activities/yearlydata', function (req, res, next) {        
        var yearlyDataConstructor = function (userId, userFirstName, userLastName, yearDistance) {
          this.userId = userId;
          this.userFirstName = userFirstName;
          this.userLastName = userLastName;
          this.yearDistance = yearDistance;
        }
        
        var activityMap = [];
        var userMap = [];

        var yearlyData =[];

        forEachCount = 0;

        class BreakSignal {};

        //filtriranje aktivnosti po trenutnom danu
        var now = new Date();
        var startOfYear = new Date(now.getFullYear(), 0, 1);

        Activity.find({"created_at": {"$gte": startOfYear, "$lt": now}
        
        }).then(function (activity) {
          if (activity[0] == null) {
              userMap.push('noData');
              res.send(userMap);
              throw new BreakSignal();
          }else{
            activity.forEach(function(activity) {
              activityMap.push(activity);
            })
            return activityMap;
          }
        }).then(function(activityMap){
          activityMap.forEach(function(activity) {
            var userId = activity.userId
            
            User.find()
            .then(function(users){
              users.forEach(function(user) {
                userMap.push(user);
              });
              return userMap;
            }).then(function(userMap){
              var found = false;
              for(var i = 0; i < yearlyData.length; i++) {
                if (yearlyData[i].userId === userId) {
                  found = true;
                    break;
                }
              }
              if(found == true){
                userIndex = yearlyData.findIndex((obj => obj.userId === userId));
                yearlyData[userIndex].yearDistance = yearlyData[userIndex].yearDistance + activity.distance;

              }else{

              var user = userMap.find(o => o.id === userId);

                if(user.groupId === req.user.groupId){
                  var activityData = new yearlyDataConstructor(
                    activity.userId,
                    user.firstName,
                    user.lastName, 
                    activity.distance
                  );

                  activityData = JSON.stringify(activityData);
                  activityData = JSON.parse(activityData);

                  
                  yearlyData.push(activityData);
                }
              }

              if(activityMap[forEachCount + 1] == null){
                if(typeof yearlyData !== 'undefined' && yearlyData.length > 0){
                  res.send(yearlyData);
                }else{
                  yearlyData.push('noData');
                  res.send(yearlyData);
                }
              }
              forEachCount++
              
            })
              
          })

        }).catch(BreakSignal, () => {});
      });



}
