const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const moment = require('moment')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('获取用户信息');
});

router.post('/login', function(req, res, next) {
  const {userName, password} = req.body
  if(userName==='admin' && password==='123456') {
    let expires = moment().add(1,'days').valueOf();  //设置过期时间
    let token = jwt.encode({
       iss: u_id,
       exp: expires
    }, app.get('jwtTokenSecret'));
    res.send({
      code: 200,
      msg: '登录成功',
      token
    });
  } else {
    res.send({
      code: 0,
      msg: '用户名或密码错误'
    });
  }
});
module.exports = router;
