var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var routeRouter = require('./routes/route');
var cors  = require('cors');
var session = require("express-session");
var app = express();

app.use(session({
  secret: 'shh',
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routeRouter);
app.listen(3001);

// Mongo db connection 
mongoose.connect('mongodb://localhost:27017/school');
var db = mongoose.connection;
db.on('connected',()=>{
  console.log("Successfully connected to mongodb");
});

db.on('error',(err)=>{
  console.log("error in connecting to mongodb: " + err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
