var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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


module.exports = router;
