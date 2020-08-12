// var crypto = require('crypto');
// var md5 = crypto.createHash('md5');
var md5 = require('md5');
exports.paramAll = function(req) {
	var parameter = {};
	if (req.params) {
		for (var key in req.params) {
			parameter[key] = req.params[key];
		}
	}
	if (req.body) {
		for (var key in req.body) {
			parameter[key] = req.body[key];
		}
	}
	if (req.query) {
		for (var key in req.query) {
			parameter[key] = req.query[key];
		}
	}
	return parameter;
};

// // digest只能调用一次，所以用单例模式,但是仍然存在问题，如果密码变了怎么办？
// exports.encryPassword = (function() {
// 	let result = null;
// 	return function(password) {
// 		if (!result) {
// 			//加密后的密码
// 			result = md5.update(password).digest('hex');
// 		}
// 		return result;
// 	};
// })();

exports.encryPassword = function(password) {
	return md5(password);
};
