var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Simple Whiteboard', name: "Daniela" });
  // console.log(req.cookies['connect.sid']);
});

/* GET users page. */
router.get('/users', function(req, res) {
  mongoose.model('users').find(function(err, users) {
    res.send(users);
  })
})

/* GET todo list page. */
router.get('/todo', function(req, res) {
  res.send("hello from the todo route!");
})

router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Sign up for a todo app just because' })
});

/* POST to add a user */
router.post('/adduser', function(req, res) {
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
      res.redirect('userlist');
      }
    });
});

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
