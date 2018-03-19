import { Router, Response, Request, NextFunction } from 'express';
const discogs = require('disconnect');
import {apiBase, headers, token, key, username} from '../config';
const session = require('express-session');

const apiRouter: Router = Router();
const Discogs = discogs.Client;

const dis = new Discogs(
  headers.userAgent,
  { consumerKey: key.consumerKey },
  { consumerSecret: key.consumerSecret }
);

let sess = { dataAccessed: '', dataRequested: '', username: '', identity: ''};

apiRouter.get('/releases/:id', function(request: Request, response: Response, next: NextFunction) {
  let id = request.params.id;
  let db = new Discogs(sess.dataAccessed).database();
  db.getRelease(id, function(err, data){
    response.jsonp(data);
  });
});

apiRouter.get('/authorize', function(request: Request, response: Response) {
  const oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    'tKJDUtRDoJpIDNsIQHCm',
    'CiHUbhnJpOqdMUeERvsFZBYNpKawZwlW',
    apiBase + '/callback',
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
      response.redirect('http://localhost:4200/identity');
    }
  );
});

apiRouter.get('/identity', function(request: Request, response: Response) {
  const disc = new Discogs(sess.dataAccessed);
  disc.getIdentity(function(err, data){
    if (data) {
      sess.identity = data;
      sess.username = data.username;
      response.jsonp({
        title: sess.username + '\'s Identity',
        author: 'maxperei',
        session: sess.identity
      });
    } else {
      response.jsonp({
        message: 'You must authenticate to access this resource.'
      });
    }

  });
});

apiRouter.get('/profile', function (request: Request, response: Response) {
  let usr = new Discogs(sess.dataAccessed).user();
  usr.getProfile(sess.username, function(err, data) {
    response.jsonp(data);
  });
});

apiRouter.get('/cougouyou/:page/:per_page', function(request: Request, response: Response) {
  let page = request.params.page, per_page = request.params.per_page;
  let inv = new Discogs(sess.dataAccessed).marketplace();
  inv.getInventory('cougouyou_music', { page: page, per_page: per_page }, function(err, data) {
    response.jsonp({
      inventory: data
    });
  });
});

apiRouter.get('/owner/:page/:per_page', function(request: Request, response: Response) {
  let page = request.params.page, per_page = request.params.per_page;
  let inv = new Discogs(sess.dataAccessed).marketplace();
  inv.getInventory(sess.username, { page: page, per_page: per_page }, function(err, data) {
    if (data) {
      response.jsonp(data);
    } else {
      response.jsonp({
        message: 'Missing user-agent.'
      });
    }
  });
});

apiRouter.get('/release', function(request: Request, response: Response) {
  let id = 7017407;
  let db = new Discogs().database();
  db.getRelease(id, function(err, data){
    response.send(data);
  });
});

apiRouter.get('/:page/:per_page', function(request: Request, response: Response) {
  if (!sess.dataAccessed) {
    response.jsonp({
      message: 'You must authenticate to access this resource.'
    });
  } else {
    let page = request.params.page, per_page = request.params.per_page;
    let col = new Discogs(sess.dataAccessed).user().collection();
    col.getReleases(sess.username, 0, { page: page, per_page: per_page }, function(err, data) {
      response.jsonp({
        title: 'Welcome to ' + sess.username + '\'s Collection',
        author: 'maxperei',
        releases: data
      });
    });
  }
});

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
    let url: string = data.images[0].resource_url;
    db.getImage(url, function(err, data, rateLimit){
      response.send(data);
    });
  });
});*/

export { apiRouter };
