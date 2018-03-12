const mongoose = require('mongoose');

// activity Schema
mongoose.Promise = global.Promise;
var activitySchema = new mongoose.Schema({
    userId: String,
    type: String,
    distance: Number,
    duration: Number,
    endPoint: Array,
    map: {
        id: String,
        polyline: String,
        summaryPolyline: String
    },
    created_at: Date
});

module.exports = mongoose.model('Activity', activitySchema);