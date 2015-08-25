var express = require('express');
var routes = require('./routes/index');
var path = require('path');
var app = express();
var engine = require('ejs-locals');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MongoDB Setup
var mongo = require('mongodb')
var monk = require('monk')
var db = monk('//localhost/27017/whiteboard-app')

var fs = require('fs'); // file system library


// Set up all environments
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Other dependencies/middlware

// configure app (in app.js, unless it's the server then it's in bin/www)
// use middleware (in app.js)
// define routes (in routes folder)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session requires 3 things: secret, saveuninitialized, resave
// app.use(session({ secret: "secretSecret", saveUninitialized: true, resave: true }));

// make the db accessible to our router
// By adding this function to app.use, we're adding the db object to every HTTP request our app makes.
app.use(function(req, res, next){
  req.db = db;
  next();
})

app.use('/', routes);
// app.use('/users', users); // Difficult to route to index path from here


// load all files in models directory
fs.readdirSync(__dirname + '/models').forEach(function(filename){
    require(__dirname + '/models/' + filename);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

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
