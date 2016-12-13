var express = require('express');
var router = express.Router();

/* GET disconnect page. */
router.get('/', function(req, res, next) {
  res.render('disco', {
    title: 'Disconnect',
    author: '@bartve',
    git: 'https://github.com/bartve/disconnect.git'
  });
});

module.exports = router;
