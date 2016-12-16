var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;

var dis = new Discogs(
  'Sample/0.1',
  { consumerKey: 'tKJDUtRDoJpIDNsIQHCm' },
  { consumerSecret: 'CiHUbhnJpOqdMUeERvsFZBYNpKawZwlW' }
);

var sess = {};

/* GET `disco` page. */
router.get('/', function(req, res, next) {
  if(!sess.dataAccessed) {
    res.render('disco', {
      title: 'Disconnect',
      author: 'bartve',
      git: 'https://github.com/bartve/disconnect.git',
      sessionDebug: JSON.stringify(req.session)
    });
  }else{
    console.log(sess);
    var col = new Discogs(sess.dataAccessed).user().collection();
    col.getReleases(sess.username, 0, {page: 1, per_page: 75}, function(err, data){
      res.render('disco', {
        title: 'Welcome to '+sess.username+'\'s Collection',
        author: 'maxperei',
        releases: data.releases
      });
    });
  }
});

router.get('/authorize', function(req, res, next) {
  var oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    'tKJDUtRDoJpIDNsIQHCm',
    'CiHUbhnJpOqdMUeERvsFZBYNpKawZwlW',
    'http://localhost:3000/disco/callback',
    function(err, requestData){
      // Persist "requestData" here so that the callback handler can
      // access it later after returning from the authorize url
      sess = req.session;
      sess.dataRequested = requestData;
      res.redirect(requestData.authorizeUrl);
    }
  );
});

router.get('/callback', function(req, res, next){
  var oAuth = new Discogs(sess.dataRequested).oauth();
  oAuth.getAccessToken(
    req.query.oauth_verifier, // Verification code sent back by Discogs
    function(err, accessData){
      // Persist "accessData" here for following OAuth calls
      sess = req.session;
      sess.dataAccessed = accessData;
      res.redirect('/disco/identity');
    }
  );
});

router.get('/identity', function(req, res, next){
  var dis = new Discogs(sess.dataAccessed);
  dis.getIdentity(function(err, data){
    sess.identity = data;
    sess.username = data.username;
    res.render('disco', {
      title: sess.username+'\'s Identity',
      author: 'maxperei',
      identity: JSON.stringify(sess.identity)
    });
  });
});

router.get('/raw', function(req, res, next){
  if(!sess.dataAccessed){
    res.redirect('/disco/authorize');
  }else{
    var col = new Discogs(sess.dataAccessed).user().collection();
    col.getReleases(sess.username, 0, {page: 1, per_page: 75}, function(err, data) {
      res.jsonp(data);
    });
  }
});

router.get('/image', function(req, res, next) {
  var db = new Discogs(sess.dataAccessed).database();
  db.getRelease(176126, function(err, data){
    var url = data.images[0].resource_url;
    db.getImage(url, function(err, data, rateLimit){
      // Data contains the raw binary image data
      res.send(data);
    });
  });
})

module.exports = router;
