
/**
 * Module dependencies.
 */

var express  = require( 'express' )
  , route    = require( './config/route' )
  , http     = require( 'http' )
  , path     = require( 'path' )
  , keys     = require('./config/secret')
  , passport = require ( 'passport' );

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.locals.title = "Punchlist"
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    done(err, user);
});

var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    // consumerKey: "w9EgrmQLQuCsqRD5fGw",
    // consumerSecret: "czgXWPfZFvKrwpdAsRjYsxqvqjnR1BmHbvLwvk1wb7U",
    consumerKey: keys.consumerKey,
    consumerSecret: keys.consumerSecret,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log( arguments );
  }
));

route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
