var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('获取用户信息');
});

router.post('/login', function(req, res, next) {
  const {username, password} = req.body
  console.log(username, password);
  res.send({
    code: 200,
    msg: '登录成功'
  });
});
module.exports = router;
