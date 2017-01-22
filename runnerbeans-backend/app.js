var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var cors = require('cors');
var expressJWT = require('express-jwt');

var port = process.env.PORT || 8080;
var routes = require('./routes/routes');

var app = express();

// view engine setup

//app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.engine('html', require('ejs').renderFile);
//https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.listen(port);
console.log('Server started! At http://localhost:' + port);

//https://jwt.io/introduction/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'steve', saveUninitialized: false, resave: false}));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
