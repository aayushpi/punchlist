var PagesController = require( '../controllers/pagescontroller' )
,   AuthController  = require( '../controllers/authcontroller' );

var verifyUser      = function ( req, res, next ){
  if ( req.session.passport.user ) return next();
  res.redirect ( '/login' );
};

var route           = function( app ){
  app.get( '/', verifyUser, PagesController.home );
  app.get( '/login', AuthController.login );
};

module.exports = route;
