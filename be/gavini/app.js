const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routers = require('./routes/router');
const modules = require('./modules/appmodules');
require('./config/passport');

new modules().getInstance();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// Add the new version.
app.use('/api/v1', routers.v1);
app.use('/api/v2', routers.v2);

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
