var jwt = require('jsonwebtoken');
var config = require('./config');

exports.setToken = function(userInfo) {
	return new Promise((resolve, reject) => {
		const token = jwt.sign(userInfo, config.TokenSecret, {
			expiresIn: '30s',
			issuer: 'songshuainan'
		});
		if (token) {
			resolve(token);
		} else {
			reject('生成token失败');
		}
	});
};

exports.verToken = function(token) {
	return new Promise((resolve, reject) => {
		var info = jwt.verify(token, config.TokenSecret);
		resolve(info);
	});
};
