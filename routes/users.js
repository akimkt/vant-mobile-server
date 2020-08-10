var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('获取用户信息');
});

router.post('/login', function(req, res, next) {

  res.send('登录');
});
module.exports = router;
