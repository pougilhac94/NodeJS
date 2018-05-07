var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
//  la durée du jeton est d'une heure
       {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req, res, next) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.json({ lastname: req.user.lastname, admin: req.user.admin });
    if (req.user.admin) 
        { 
        console.log("Utilisateur avec droit admin : ", req.user.username, " Admin ", req.user.admin);
        return next();
        }
    else { 
        console.log("Utilisateur sans droit admin : ", req.user.username, " Admin ", req.user.admin);
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
  };

  exports.verifyOrdinaryUser = function(req, res, next) {
    if (req.user.user) 
        { 
        console.log("Utilisateur avec droit ordinaire : ", req.user.username, " User ", req.user.user);
        return next();
        }
    else { 
        console.log("Utilisateur sans droit ordinaire : ", req.user.username, " User ", req.user.user);
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
  };
