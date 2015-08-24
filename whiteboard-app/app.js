var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var routes = require('./routes/index');
var fs = require('fs'); // file system library
var mongoose = require('mongoose');
var db = require('./data/db/db');
var favicon = require('serve-favicon');

// configure app (in app.js, unless it's the server then it's in bin/www)
// use middleware (in app.js)
// define routes (in routes folder)

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect mongodb database
// mongoose.connect("db.url");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(cookieParser());

// Session requires 3 things: secret, saveuninitialized, resave
app.use(session({ secret: "secretSecret", saveUninitialized: true, resave: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// load all files in models directory
fs.readdirSync(__dirname + '/models').forEach(function(filename){
    require(__dirname + '/models/' + filename);
})


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
