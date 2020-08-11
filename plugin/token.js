var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

exports.setToken = function(username) {
	return new Promise((resolve, reject) => {
		const token = jwt.sign(
			{
				name: username
			},
			signkey,
			{ expiresIn: '1h' }
		);
		if (token) {
			resolve(token);
		} else {
			reject('生成token失败');
		}
	});
};

exports.verToken = function(token) {
	console.log('token', token);
	return new Promise((resolve, reject) => {
		var info = jwt.verify(token.split(' ')[1], signkey);
		resolve(info);
		console.log('111', info);
	});
};
