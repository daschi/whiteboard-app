var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

router.get('/new', function(req, res) {
  res.render('users/new', { title: 'Sign up for a todo app just because' })
});

/* POST to add a user */
router.post('/create', function(req, res) {
  // Set up internal db variable
  var db = req.db;
  // Get the form values from the request's body
  var userName = req.body.username;
  var email = req.body.email;

  // Set the db collection we want to add to
  var collection = db.get('usercollection');

  // Submit data to the database
  collection.insert({
    "username" : userName,
    "email" : email
    }, function (err, doc) {
      if (err) {
        // If it fails do this
        res.send("There was a problem with the database");
      }
      else {
      // otherwise redirect user to the success page
      res.redirect('/index', { username: userName, email: email });
      }
    });
});



module.exports = router;
