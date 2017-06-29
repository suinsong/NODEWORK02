var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');// 몽구스 모듈을 import

// mongoose와 mongoDB 연결설정

var dbConn = mongoose.connection; // 연결커넥션 만듦(잘되고있나 감시하는 목적)

// DB가 정상적으로 열렸는지 감시, 메시지를 알려주는 역할
dbConn.once('open',function(){ // 최초로 시동될때만 뜸
	console.log("MongoDB open OK!!")
});

dbConn.on('error',function(){
	console.err; // 아무 가공없이 오류메시지를 콘솔에 보여줌
});

// DB를 연결
mongoose.connect('mongodb://localhost/iot');
 


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// mongodb를 사용하기 위한 membervo클래스를 이용해서 객체를 선언함
var memberVO= require('./models/memberVO.js');


// controller는 model다음에 선언
									// 이것을 memberController에서 (app,mVO)로 받앗음
var memberController = require('./routes/memberController.js')(app,memberVO);







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
