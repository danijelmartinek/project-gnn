const mongoose = require('mongoose');

// group Schema
mongoose.Promise = global.Promise;
var groupSchema = new mongoose.Schema({
  adminMail: String,
  groupName: String,
  private: Boolean,
  groupDescription: String,
  locations: [],
  timeBox: [],
  maxDistance: Number,
  created_at: Date,
  updated_at: Date
});

// make this available to our users in our Node applications
module.exports = mongoose.model('Group', groupSchema);
