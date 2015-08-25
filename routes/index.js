var express = require('express');
var router = express.Router();
var monk = require('monk');
var app = require('../app');

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.cookies['connect.sid']);
  res.render('index', { title: 'Simple Whiteboard + Chat', name: "Daniela" });
});

module.exports = router;
