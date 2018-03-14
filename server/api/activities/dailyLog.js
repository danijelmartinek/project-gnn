
module.exports = function(server, User, Activity, ActivityGroups){
        
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
}