import { Router, Response, Request } from 'express';
const discogs = require('disconnect');
import { headers, token, key } from "../config";
const session = require('express-session');

const discoRouter: Router = Router();
const Discogs = discogs.Client;

const dis = new Discogs(
  headers.userAgent,
  { consumerKey: key.consumerKey },
  { consumerSecret: key.consumerSecret }
);

var sess = { dataAccessed: '', dataRequested: '', username: '', identity: ''};

discoRouter.get('/', function(request: Request, response: Response) {
  if(!sess.dataAccessed) {
    response.jsonp({
      title: 'Disconnect',
      author: 'bartve',
      git: 'https://github.com/bartve/disconnect.git',
      sessionDebug: JSON.stringify(session)
    });
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

discoRouter.get('/authorize', function(request: Request, response: Response) {
  const oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    'tKJDUtRDoJpIDNsIQHCm',
    'CiHUbhnJpOqdMUeERvsFZBYNpKawZwlW',
    'http://localhost:3000/disco/callback',
    function(err, requestData){
      sess = session;
      sess.dataRequested = requestData;
      response.redirect(requestData.authorizeUrl);
    }
  );
});

discoRouter.get('/callback', function(request: Request, response: Response) {
  const oAuth = new Discogs(sess.dataRequested).oauth();
  oAuth.getAccessToken(
    request.query.oauth_verifier,
    function(err, accessData){
      sess = session;
      sess.dataAccessed = accessData;
      response.redirect('/disco/identity');
    }
  );
});

discoRouter.get('/identity', function(request: Request, response: Response) {
  const dis = new Discogs(sess.dataAccessed);
  dis.getIdentity(function(err, data){
    sess.identity = data;
    sess.username = data.username;
    response.json({
      title: sess.username+'\'s Identity',
      author: 'maxperei',
      identity: JSON.stringify(sess.identity)
    });
  });
});

discoRouter.get('/raw', function(request: Request, response: Response) {
  if(!sess.dataAccessed){
    response.redirect('/disco/authorize');
  }else{
    const col = new Discogs(sess.dataAccessed).user().collection();
    col.getReleases(sess.username, 0, {page: 1, per_page: 75}, function(err, data) {
      response.jsonp(data);
    });
  }
});

discoRouter.get('/image', function(request: Request, response: Response) {
  const db = new Discogs(sess.dataAccessed).database();
  db.getRelease(176126, function(err, data){
    var url: string = data.images[0].resource_url;
    db.getImage(url, function(err, data, rateLimit){
      response.send(data);
    });
  });
});

export { discoRouter };
