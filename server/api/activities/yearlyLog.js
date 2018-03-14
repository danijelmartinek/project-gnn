
module.exports = function(server, User, Activity, ActivityGroups){
    
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