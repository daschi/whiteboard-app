var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/index', function(req, res) {
  console.log(req.cookies['connect.sid']);
  res.render('index', { title: 'Simple Whiteboard', name: "Daniela" });
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
