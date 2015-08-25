var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var monk = require('monk');
var app = require('../app');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.cookies['connect.sid']);
  res.render('index', { title: 'Simple Whiteboard', name: "Daniela" });
});


router.get('/users', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

router.get('/users/new', function(req, res) {
  res.render('users/new', { title: 'Sign up for a todo app just because' })
});

/* POST to add a user */
router.post('/users/create', function(req, res) {
  // Set up internal db variable
  var db = req.db;
  // Get the form values from the request's body
  var username = req.body.username;
  var email = req.body.email;

  // Set the db collection we want to add to
  var collection = db.get('usercollection');
  console.log(username)
  // Submit data to the database
  collection.insert({
    "username" : username,
    "email" : email
    }, function (err, doc) {
      if (err) {
        // If it fails do this
        res.send("There was a problem with the database");
      }
      else {
      // otherwise redirect user to the success page
      res.redirect('/users');
      }
    });
});

// Learning about setting sessions
// /* GET Login page */
// router.get('/login', function(req, res, next) {
//   res.render('login', {title: 'Simple Whitebord', name: 'Daniela'});
// });

// /* GET session ID */
// router.get('/user/:id', function(req, res){
// 	res.session = req.params.id;
// 	console.log(res.session)
// 	res.send('<a href="/user">Your session is: </a>' + res.session)
// });

module.exports = router;
// module.exports = app.locals;

