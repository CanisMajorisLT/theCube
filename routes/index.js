var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/textarea', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('examples_page');
});


module.exports = router;
