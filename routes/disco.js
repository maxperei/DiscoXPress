var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;

/* GET disconnect page. */
router.get('/', function(req, res, next) {
  var db = new Discogs().database();
  db.getRelease(176126, function(err, data){
    res.send(data);
  });
});

module.exports = router;
