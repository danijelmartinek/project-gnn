
module.exports = function(server, User, Activity, ActivityGroups){
    
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
}