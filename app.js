const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// add new modules and files here
//adds the session and passport middleware and
//adds the appropriate route handler paths. 
//also creates an instance of express called app.
const session = require('express-session');
const passport = require('passport');

const index = require('./routes/index');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const app = express();

// load environment variables
//allows us to store sensitive info in enviroment variables
//which we can add to our git ignore file to keep them safe.
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// add new express-session and passport middleware here
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUnitialized: true,
}));
//adds passport and express session middleware, 
//having express-session session and passport.session seems
//like it could leaqd to tears. also which one does what?
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// add route middleware here
// adds routes as authRoutes and userRoutes
app.use('/',index);
app.use('/auth',authRoutes);
app.use('/user',userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
