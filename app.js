var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bootstrapRouter = require('./routes/bootstrap');
var app = express();
var Tokens = require('./utils/tokens');
var expressJwt = require('express-jwt');
var Configs = require('./utils/config');
const cors = require('cors');
app.use(cors());
// app.all('*', function(req, res, next) {
//   console.log('body', req.url);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 解析token获取用户信息
app.use(function(req, res, next) {
	var reqToken = req.headers['authorization'];
	if (reqToken == undefined) {
		return next();
	} else {
		Tokens.verToken(reqToken)
			.then((data) => {
				req.data = data;
				return next();
			})
			.catch((error) => {
				return next();
			});
	}
});
//验证token是否过期并规定哪些路由不用验证
app.use(
	expressJwt({
		secret: Configs.TokenSecret,
		algorithms: [ 'HS256' ]
	}).unless({
		path: [ '/users/login' ] //除了这个地址，其他的URL请求接口都需要验证
	})
);
//当token失效返回提示信息
app.use(function(err, req, res, next) {
	if (err.status == 401) {
		return res.status(401).send({
			code: err.code,
			inner: err.inner
		});
	}
});
// error handler
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bootstrap', bootstrapRouter);

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
