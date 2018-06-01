/*eslint-disable*/

var AtoB = require('./activityFilters.js');


// COMMENTS:

// -- TEXT -- -> TEXT is heading or description of code block, start of code block
// -- TEXT [END] -- -> end of code block

// text -> text is description of code line

// *text* -> text is variable
// 'text' -> text is value of variable
// "text" -> text is string


module.exports = function(server, User, Activity, ActivityGroups){
    
    server.use('/api/activities/:timeRange/:mode', function (req, res, next) { 

        var mode = req.params.mode; // returning data mode from route ('all', [by id], other -> send "empty")
        var timeRange = req.params.timeRange; //returning time range of activities from route ('daily', 'weekly', 'monthly' -> DEFAULT, 'yearly')

        if(timeRange == 'daily'){
            var time = new Date().setHours(0,0,0,0); // start of day
        }
        else if(timeRange == 'weekly'){
            var curr = new Date;
            var firstOfWeek = curr.getDate() - curr.getDay(); // first day is the day of the month - the day of the week
            var time = new Date(curr.setDate(firstOfWeek)).setHours(0,0,0,0);  //start of week
        }
        else if(timeRange == 'monthly'){
            var time = new Date().getTime() - 30 * 24 * 60 * 60 * 1000; // start of month
        }
        else if(timeRange == "yearly"){
            var time = new Date(new Date().getFullYear(), 0, 1).setHours(0,0,0,0); // start of year
        }
        else{
            var time = new Date().getTime() - 30 * 24 * 60 * 60 * 1000; // start of month
        }

        var radius = 100; //meters



        var rad = function(x) {
            return x * Math.PI / 180;
          };
          
          var getDistance = function(p1, p2) {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(p2.lat - p1.lat);
            var dLong = rad(p2.lng - p1.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
              Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d; // returns the distance in meter
          };
        
        Activity.aggregate([
            {
                $match: {
                    created_at: {$gt: new Date(time)},  // filter activities by date 
                    type: "Ride"  // filter activities by type
                }
            },
            {
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
            },
            {
                $lookup:
                  {
                    from: "users", // connecting to *users* collection (not model!!!)
                    localField: "_id", // local field to compare from activities collection
                    foreignField: "_id", // foreign field to compare from users collection
                    as: "userData" // variable in which will data be written
                  }
            },
            {
                $unwind: '$userData'
            },
            {
                $project: {
                    userData: {
                        __v: 0,
                        created_at: 0,
                        updated_at: 0,
                    }
                }
            },
            {
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
            },
            {
                $lookup:
                  {
                    from: "groups",
                    localField: "_id",
                    foreignField: "_id",
                    as: "groupInfo"
                  }
            },
            {
                $unwind: '$groupInfo'
            }

        ], function (err, result) {
            if (err) {
                next(err);
            } else {

                var noUsers = [];
                var loopGroups = 0;

                result.forEach(function(group, groupIndex) {
                    var noActivities = [];
                    var loopUsers = 0;

                    group.users.forEach(function(user, userIndex) {
                        var notPass = [];
                        var loopActivities = 0;

                        var distance = 0;
                        var activityCount = 0;
                        user.activities.forEach(function(activity, index) {

                            var AtoBdistance = {};
                            var timeBox = {};

                            if(group.groupInfo.locations[0]){
                                AtoBdistance = AtoB.AtoBdistance(group.groupInfo.locations[0], activity.endPoint, group.groupInfo.maxDistance);
                            }
                            else{AtoBdistance.isInMaxRange = true}
                            
                            if(group.groupInfo.timeBox[0]){
                                timeBox = AtoB.timeBox(group.groupInfo.timeBox, activity.endTime);
                            }
                            else{timeBox.isInAny = true}

                            if(AtoBdistance.isInMaxRange == false){
                                notPass.push(index);
                            }
                            else if(timeBox.isInAny == false){
                                notPass.push(index);
                            }
                           
                        })

                        notPass.forEach(function(index) {
                            index = index - loopActivities;
                            user.activities.splice(index, 1);
                            loopActivities = loopActivities + 1;
                        })

                        user.activities.forEach(function(activity) {
                            distance = distance + activity.distance;
                            activityCount = activityCount + 1;
                        })

                        if(distance == 0 && activityCount == 0){
                            noActivities.push(userIndex);
                        }else{
                            user.distance = distance;
                            user.activityCount = activityCount;
                        }
                        
                    })

                    noActivities.forEach(function(index) {
                        index = index - loopUsers;
                        group.users.splice(index, 1);
                        loopUsers = loopUsers + 1;
                    })

                    if(group.users[0] == null){
                        noUsers.push(groupIndex);
                    }

                })

                noUsers.forEach(function(index) {
                    index = index - loopGroups;
                    result.splice(index, 1);
                    loopGroups = loopGroups + 1;
                })



                //-- RETURNING DATA BY *mode* --

                // checking if *mode* is group ID
                var foundGroupId = false;
                for(var i = 0; i < result.length; i++) {
                    if (result[i]._id == mode) {
                        foundGroupId = true;
                        break;
                    }
                }

                // checking if *mode* is 'all'
                if(mode == 'all'){
                    res.send(result);  // sending all results
                }

                // checking if *mode* doesn't exist
                else if(mode == null){
                    res.send(result);// sending all results
                }

                // if *mode* is group ID, sending activities of that group
                else if(foundGroupId){
                    result.forEach(function(group) { // serching for group by ID
                        if(mode == group._id){
                            res.send(group); //sending activities of group
                        }
                    });
                }
                else{
                    res.status(200).json("empty"); // anything else, send "empty"
                }
            }
        });

    });
}