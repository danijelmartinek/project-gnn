var User = require('./models/user.js');

module.exports = function(app, passport){
    app.get('/', (req, res) => {
        res.send("Landing Page FTW");
        // strava.athletes.get({'access_token': '1d9bc9a7d7a19ec9d2d718b7303f624d6e38529f'}, (err, payload, limits) => {
        //   console.log(payload);
        // });
    });

    app.get('/auth/strava', passport.authenticate('strava', {scope: ['view_private']}), (req, res) => {
			// ...empty spaces, what are we living for? ... - QUEEN
    });
    
    app.get('/auth/strava/callback', passport.authenticate('strava', {failureRedirect: '/login'}), (req, res) => {
      console.log("Came to callback!");
      res.redirect('/');
		});
    
    app.get('/profile', isLoggedIn, (req, res) => {
      res.send("This is your profile!");
    });
    
    app.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });
 
    app.get('/login', (req, res) => {
      res.send("Login");
    });

    app.get('/unlink/strava', (req, res) => {
			var user = req.user;
			
			user.strava.token = null;

			user.save((err) => {
				if(err)
					throw err;
				res.redirect('/');
			});
		});
		
		
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
}
