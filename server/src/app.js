const express = require('express');
const mongo = require('mongodb').MongoClient;
const strava = require('strava-v3');

const app = express();

app.set('port', process.env.PORT || 3000);


app.get('/', function(req, res){
  res.send("This is home");
});

app.get('/oauth', function(req, res){
  res.send("Who are you?");
});

app.listen(app.get('port'), function(){
  console.log("App running on the port " + app.get('port'));
});
