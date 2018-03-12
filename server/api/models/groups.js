const mongoose = require('mongoose');

// group Schema
mongoose.Promise = global.Promise;
var groupSchema = new mongoose.Schema({
  adminMail: String,
  groupName: String,
  groupDescription: String,
  created_at: Date,
  updated_at: Date
});

// make this available to our users in our Node applications
module.exports = mongoose.model('Group', groupSchema);
