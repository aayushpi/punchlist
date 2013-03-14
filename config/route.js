var PagesController = require ( '../controllers/pagescontroller' )
,   AuthController  = require ( '../controllers/authcontroller' )
,   passport        = require ( 'passport' );

var verifyUser      = function ( req, res, next ){
  if ( req.session.passport.user ) return next();
  res.redirect ( '/login' );
};

var route           = function( app ){
  app.get( '/', verifyUser, PagesController.home );
  app.get( '/login', AuthController.login );
  app.get( '/logout', verifyUser, AuthController.logout );

  // Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
  app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));
};

module.exports = route;
