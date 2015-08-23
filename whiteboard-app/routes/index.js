var express = require('express');
var router = express.Router();
var session = require('client-sessions');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Simple Whiteboard', name: "Daniela" });
  // console.log(req.cookies['connect.sid']);
  // console.log(req.session);
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