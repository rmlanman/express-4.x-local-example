var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/* GET home page. */
router.get('/', ensureLoggedIn(), function(req, res, next) {
  res.render('index', { user: req.user });
});

module.exports = router;
