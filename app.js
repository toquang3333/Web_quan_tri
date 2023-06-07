var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var spRouter = require('./routes/danhsach');
var sanphamRouter = require('./routes/sanpham');
var homeRouter = require('./routes/home');
var adminRouter = require('./routes/danhsachadmin');
var sanphamDTRouter = require('./routes/sanphamDT');
var dangki = require('./routes/dangki');
var infor = require('./routes/infor');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(session({
  secret: 'hndqekj3nnn2nj3n2jjdejn2jje3dqmdkfjk3',
  resave: false,
  saveUninitialized: true ,
  // cookie: { secure: true }
 }))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ds',spRouter);
app.use('/sp',sanphamRouter);
app.use('/home',homeRouter);
app.use('/admin',adminRouter);
app.use('/spT',sanphamDTRouter);
app.use('/dk',dangki);
app.use('/if',infor);
app.use('/api',api);


 
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
  if (req.originalUrl.indexOf('/api') == 0) {
    res.json(
      {
        msg: err.message
      }
    );
  } else {
    res.render('error');
  }

});

module.exports = app;
