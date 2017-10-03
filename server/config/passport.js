const configAuth = require('./auth.js');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
var User = require('../app/models/user.js');

module.exports = function(passport){
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	// passport.serializeUser(function(user, done) {
	// 	done(null, user);
	// });
	
	// passport.deserializeUser(function(obj, done) {
	// 	done(null, obj);
	// });

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
					console.log("Error -> first if");
					return done(err);
				}
				if(user){
					console.log("User found -> second if");
					console.log(user);
					return done(null, user);
				}
				else{
					console.log("Else");
					var newUser = new User();
					newUser.strava.id = profile._json.id;
					newUser.strava.token = profile.token;
					newUser.firstName = profile._json.firstname;
					newUser.lastName = profile._json.lastname;
					newUser.email = profile._json.email;
					newUser.profile_pic = profile._json.profile;
					newUser.sex = profile._json.sex;
					// newUser.created_at = Date.now();
					// newUser.updated_at = Date.now();
					
					newUser.save((err) => {
						if(err)
							throw err;
						return done(null, newUser);
					});			
				}
			});
			// return done(null, profile);
		});
  }));
	//strava login
	// passport.use(new StravaStrategy({
  //   clientID: configAuth.stravaAuth.clientID,
  //   clientSecret: configAuth.stravaAuth.clientSecret,
  //   callbackURL: configAuth.stravaAuth.callbackURL
  // },
	// 	function(accessToken, refreshToken, profile, cb) {
			// process.nextTick(function () {
			// 	User.findOne({'strava.id': profile._json.id}, (err, user) => {
			// 		if(err){
			// 			console.log("Error -> first if");
			// 			return done(err);
			// 		}
			// 		if(user){
			// 			console.log("User found -> second if");
			// 			return done(null, user);
			// 		}
			// 		else{
			// 			console.log("Else");
			// 			var newUser = new User();
			// 			newUser.strava.id = profile._json.id;
			// 			newUser.strava.token = profile.token;
			// 			newUser.firstName = profile._json.firstname;
			// 			newUser.lastName = profile._json.lastname;
			// 			newUser.email = profile._json.email;
			// 			newUser.profile_pic = profile._json.profile;
			// 			newUser.sex = profile._json.sex;
			// 			newUser.created_at = Date.now();
			// 			newUser.updated_at = Date.now();
						
			// 			newUser.save((err) => {
			// 				if(err)
			// 					throw err;
			// 				return done(null, newUser);
			// 			});			
			// 		}
			// 	});
			// });
	// 	}
	// ));
}