var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET home page. */
let login = (req, res, next)=> {
  console.log('登录');
  res.render('index', { title: '' });
}
router.get('/login', login);

module.exports = router;
