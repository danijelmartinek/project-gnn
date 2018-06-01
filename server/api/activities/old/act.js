/*eslint-disable*/


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
                    distance: {$sum: "$distance"}, // sum of activity distances for each user
                    activityCount: {$sum: 1} // adding +1 activity count for each user
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
                        _id: 0, // *id* field from userData will be hidden
                        strava: 0, // *strava* field from userData will be hidden
                        __v: 0,
                        created_at: 0,
                        updated_at: 0,
                        state: 0,
                        city: 0
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
                            distance: "$distance",
                            activityCount: "$activityCount"
                        }
                    } 
                }
            }
        ], function (err, result) {
            if (err) {
                next(err);
            } else {

                console.log(JSON.stringify(result));

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