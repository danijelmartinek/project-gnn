
module.exports = function(server, passport){
    
  server.get('/auth/strava', passport.authenticate('strava'));

  server.get('/auth/strava/callback', passport.authenticate('strava', {
    failureRedirect: 'http://localhost:3000',
    successRedirect: 'http://localhost:3000',
    failureFlash: true
  }));

  server.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  })
}
