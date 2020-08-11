var express = require('express');
var router = express.Router();
var token = require('./../plugin/token');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('获取用户信息');
});

router.post('/login', function(req, res, next) {
	const { userName, password } = req.body;
	if (userName === 'admin' && password === '123456') {
		console.log(userName);
		token
			.setToken(userName)
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
	console.log(req.query);
	res.send({
		code: 0,
		data: {
			userName: 'admin'
		}
	});
});
module.exports = router;
