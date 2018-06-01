const mongoose = require('mongoose');

// activity Schema
mongoose.Promise = global.Promise;
var activitySchema = new mongoose.Schema({
    stravaId: String,
    userId: { type: mongoose.Schema.ObjectId, required: true},
    title: String,
    type: String,
    distance: Number,
    duration: Number,
    endTime: String,
    startPoint: {
        position: {
            lat: String,
            lng: String
        }
    },
    endPoint: {
        position: {
            lat: String,
            lng: String
        }
    },
    map: {
        id: String,
        polyline: String,
        summaryPolyline: String
    },
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Activity', activitySchema);