const mongoose = require('mongoose');

// user Schema
var userSchema = new mongoose.Schema({
  strava:{
    id: String,
    token: String,
  },
  firstName: String,
  lastName: String,
  email: String,
  profile_pic: String,
  sex: String,
  created_at: Date,
  updated_at: Date
});

// make this available to our users in our Node applications
module.exports = mongoose.model('User', userSchema);
