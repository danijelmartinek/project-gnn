const mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
    id: String,
    user_id: String,
    type: String,
    distance: Number,
    end_point: Array,
    map: {
        id: String,
        polyline: String,
        summary_polyline: String
    }
});

module.exports = mongoose.model('Activity', activitySchema);