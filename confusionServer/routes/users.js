var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

// ADMIN : liste des users ***************************************
router.get('/',
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
  User.find({}, function(err, users) {
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  });  
});

// USER : informations de connexion *******************************
router.get('/who', 
  authenticate.verifyUser,
  //authenticate.verifyAdmin,
  function(req, res) {
    res.send(req.user.username +', '+ req.user.firstname +', '+ req.user.lastname);
  } 
);

// USER : nouveau user ***************************************
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

// USER : login **********************************************
router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in! ', username: req.user.username, firstname: req.user.firstname, lastname: req.user.lastname});
});

/*router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});*/

// USER : logout **********************************************
router.get('/logout', 
  authenticate.verifyUser,
  (req, res) => {
    var username = req.user.username;
    req.logout();
    res.send("You have successfully been logged out " + username + "!") ;
    //res.redirect('/');   
  });

module.exports = router;
