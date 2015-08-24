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
