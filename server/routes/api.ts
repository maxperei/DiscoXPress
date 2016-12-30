import { Router, Response, Request } from 'express';
const discogs = require('disconnect');
import { apiBase, headers, token, key } from "../config";
const session = require('express-session');

const apiRouter: Router = Router();
const Discogs = discogs.Client;

const dis = new Discogs(
  headers.userAgent,
  { consumerKey: key.consumerKey },
  { consumerSecret: key.consumerSecret }
);

var sess = { dataAccessed: '', dataRequested: '', username: '', identity: ''};

apiRouter.get('/', function(request: Request, response: Response) {
  if(!sess.dataAccessed) {
    // WTF ???
    response.redirect('/api/authorize');
    //response.json(sess);
  }else{
    var col = new Discogs(sess.dataAccessed).user().collection();
    col.getReleases(sess.username, 0, {page: 1, per_page: 75}, function(err, data){
      response.jsonp({
        title: 'Welcome to '+sess.username+'\'s Collection',
        author: 'maxperei',
        releases: data.releases
      });
    });
  }
});

apiRouter.get('/authorize', function(request: Request, response: Response) {
  const oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    'tKJDUtRDoJpIDNsIQHCm',
    'CiHUbhnJpOqdMUeERvsFZBYNpKawZwlW',
    apiBase+'/callback',
    function(err, requestData){
      sess = session;
      sess.dataRequested = requestData;
      response.redirect(requestData.authorizeUrl);
    }
  );
});

apiRouter.get('/callback', function(request: Request, response: Response) {
  const oAuth = new Discogs(sess.dataRequested).oauth();
  oAuth.getAccessToken(
    request.query.oauth_verifier,
    function(err, accessData){
      sess = session;
      sess.dataAccessed = accessData;
      response.redirect('/api/identity');
    }
  );
});

apiRouter.get('/identity', function(request: Request, response: Response) {
  const dis = new Discogs(sess.dataAccessed);
  dis.getIdentity(function(err, data){
    sess.identity = data;
    sess.username = data.username;
    response.json({
      title: sess.username+'\'s Identity',
      author: 'maxperei',
      identity: sess.identity
    });
  });
});

apiRouter.get('/profile', function (request: Request, response: Response) {
  var usr = new Discogs(sess.dataAccessed).user();
  usr.getProfile(sess.username, function(err, data){
    response.jsonp(data);
  });
});

apiRouter.get('/cougouyou', function(request: Request, response: Response) {
  var inv = new Discogs(sess.dataAccessed).marketplace();
  inv.getInventory('cougouyou_music', function(err, data){
    response.jsonp({
      inventory: data
    });
  });
})

/*apiRouter.get('/raw', function(request: Request, response: Response) {
  if(!sess.dataAccessed){
    response.redirect('/api/authorize');
  }else{
    const col = new Discogs(sess.dataAccessed).user().collection();
    col.getReleases(sess.username, 0, {page: 1, per_page: 75}, function(err, data) {
      response.jsonp(data);
    });
  }
});*/

/*apiRouter.get('/image', function(request: Request, response: Response) {
  const db = new Discogs(sess.dataAccessed).database();
  db.getRelease(176126, function(err, data){
    var url: string = data.images[0].resource_url;
    db.getImage(url, function(err, data, rateLimit){
      response.send(data);
    });
  });
});*/

export { apiRouter };
