
module.exports = function(server, User, Activity, ActivityGroups){
    
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
}