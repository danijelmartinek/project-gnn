const mongoose = require('mongoose');

// user Schema
mongoose.Promise = global.Promise;
var userSchema = new mongoose.Schema({
  strava: {
    id: String,
    token: String,
  },
  firstName: String,
  lastName: String,
  username: String,
  sex: String,
  email: String,
  city: String,
  state: String,
  profilePic: String,
  userBio: String,
  groupId: { type: mongoose.Schema.ObjectId},
  created_at: Date,
  updated_at: Date
});

// make this available to our users in our Node applications
module.exports = mongoose.model('User', userSchema);
