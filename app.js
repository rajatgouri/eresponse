var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category'); 
var serviceRouter = require('./routes/service'); 
var placeRouter = require('./routes/registerPlace');
var placeRatingRouter = require('./routes/placeRating');
var nearByPlaceRouter = require('./routes/nearByPlace');
var imageRouter = require('./routes/images.js');
var mongoose = require('mongoose');

var cors = require('cors');
var app = express();
app.use(cors());

//CONNECT WITH MONGOOSE CODE : START
var url = "mongodb://localhost:27017/eResponse";
mongoose.connect(url);
//CONNECT WITH MONGOOSE CODE : END

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter); 
app.use('/service', serviceRouter); 
app.use('/registerPlace', placeRouter); 
app.use('/PlaceRating', placeRatingRouter); 
app.use('/nearByPlace', nearByPlaceRouter); 
app.use('/images',imageRouter);
app.use('/resources',express.static(__dirname + '/data'));


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
