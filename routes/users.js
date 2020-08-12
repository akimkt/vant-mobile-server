var express = require('express');
var router = express.Router();
var Tokens = require('../utils/tokens');
var { paramAll, encryPassword } = require('./../utils/common');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('1');
});
router.post('/login', function(req, res, next) {
	var par = paramAll(req);
	if (par.userName === 'admin' && (par.password === '123456' || par.password === '1234567')) {
		var userInfo = {
			userName: par.userName,
			password: encryPassword(par.password)
		};
		Tokens.setToken(userInfo)
			.then((token) => {
				res.send({
					code: 200,
					msg: '登录成功',
					token
				});
			})
			.catch((err) => {
				res.send({
					code: 0,
					msg: err
				});
			});
	} else {
		res.send({
			code: 0,
			msg: '用户名或密码错误'
		});
	}
});
router.get('/info', function(req, res, next) {
	res.send({
		code: 0,
		data: {
			userName: 'admin'
		}
	});
});
module.exports = router;
