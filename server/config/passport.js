/*eslint-disable*/

const configAuth = require('./auth.js');
const StravaStrategy = require('passport-strava').Strategy;
var User = require('../api/models/user.js');

module.exports = function(passport){
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(new StravaStrategy({
		clientID: configAuth.stravaAuth.clientID,
		clientSecret: configAuth.stravaAuth.clientSecret,
		callbackURL: configAuth.stravaAuth.callbackURL
	},
	
	function(accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		process.nextTick(function () {
			User.findOne({'strava.id': profile._json.id}, (err, user) => {
				if(err){
					console.log("Error");
					return done(err);
				}
				if(user){
					return done(null, user);
				}
				else{
					console.log("User " + profile._json.firstname + " " + profile._json.lastname + " saved to database.");
					var newUser = new User();
					newUser.strava.id = profile._json.id;
					newUser.strava.token = profile.token;
					newUser.firstName = null;
					newUser.lastName = null;
					newUser.username = null;
					newUser.sex = profile._json.sex;
					newUser.email = profile._json.email;
					newUser.city = profile._json.city;
					newUser.state = profile._json.state;
					newUser.profilePic = profile._json.profile;
					newUser.userBio = null;
					newUser.groupId = null;
					newUser.created_at = Date.now();
					newUser.updated_at = Date.now();
					
					newUser.save((err) => {
						if(err)
							throw err;
						return done(null, newUser);
					});			
				}
			});
		});
  }));
}