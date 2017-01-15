var express = require('express');
var router = express.Router();

// https://www.youtube.com/watch?v=bf8L9tQi_MQ&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR&index=9

var titleRunner = ' | Runnerbeans';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', header: this.title + titleRunner});
});

router.get('/about', function(req, res, next) {
  res.send('some about us page!');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Sign in', header: this.title + titleRunner});
});

module.exports = router;
