import { Router, Response, Request, NextFunction } from 'express';
import * as conf from '../config';
import * as fs from 'fs';
import * as path from 'path';

const discogs = require('disconnect');
const session = require('express-session');

const apiRouter: Router = Router();
const Discogs = discogs.Client;

const dis = new Discogs(
  conf.headers.userAgent,
  { consumerKey: conf.keys.consumerKey },
  { consumerSecret: conf.keys.consumerSecret }
);

let sess = { dataAccessed: '', dataRequested: '', username: '', identity: '' };

let auth = conf.hasOwnProperty('accessData') ? sess.dataAccessed || conf['accessData'] : '';

let username = sess.username || conf.username;

apiRouter.get('/authorize', (request: Request, response: Response) => {
  const oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    conf.keys.consumerKey,
    conf.keys.consumerSecret,
    conf.apiBase + '/callback',
    function(err, requestData){
      if (err) {
        response.jsonp(err);
      } else {
        sess = session;
        sess.dataRequested = requestData;
        response.redirect(requestData.authorizeUrl);
      }
    }
  );
});

apiRouter.get('/callback', (request: Request, response: Response) => {
  const oAuth = new Discogs(sess.dataRequested).oauth();
  oAuth.getAccessToken(
    request.query.oauth_verifier,
    function(err, accessData){
      if (err) {
        response.jsonp(err);
      } else {
        sess = session;
        sess.dataAccessed = accessData;

        let data =
            "\n" +
            "export const accessData = " + JSON.stringify(accessData) +
            ";\r\n";

        try {
          fs.appendFileSync(path.resolve('server/config.ts'), data);
        } catch (err) {
          console.log(err);
        }

        response.redirect('http://localhost:4200/identity');
      }
    }
  );
});

apiRouter.get('/identity', function(request: Request, response: Response) {
  let identity = sess.dataAccessed || conf[''];
  const disc = new Discogs(identity);
  disc.getIdentity(function(err, data){
    if (data) {
      response.jsonp({
        title: username + '\'s Identity',
        author: 'maxperei',
        session: data
      });
    } else {
      response.jsonp({
        message: 'You must authenticate to access this resource.'
      });
    }

  });
});

apiRouter.get('/profile', function (request: Request, response: Response) {
  let usr = new Discogs(auth).user();
  usr.getProfile(username, function(err, data){
    if (err) {
      response.json(err);
    } else {
      response.jsonp(data);
    }
  });
});

apiRouter.get('/owner/:page/:per_page', (request: Request, response: Response) => {
  let page = request.params.page, per_page = request.params.per_page;
  let inv = new Discogs(auth).marketplace();

  inv.getInventory(username, { page: page, per_page: per_page }, (err, data) => {
    if (auth) { // || data
      response.jsonp(data);
    } else {
      response.jsonp({
        message: 'Missing user-agent.'
      });
    }
  });
});

apiRouter.get('/releases/:id', (request: Request, response: Response, next: NextFunction) => {
  let id = request.params.id;
  let db = new Discogs(auth).database();
  db.getRelease(id, (err, data) => {
    response.jsonp(data);
  });
});

apiRouter.get('/release', (request: Request, response: Response) => {
  let id = 7017407;
  let db = new Discogs().database();
  db.getRelease(id, (err, data) => {
    response.send(data);
  });
});

apiRouter.get('/:page/:per_page', (request: Request, response: Response) => {
  if (!auth) {
    response.jsonp({
      message: 'You must authenticate to access this resource.'
    });
  } else {
    let page = request.params.page, per_page = request.params.per_page;
    let col = new Discogs(auth).user().collection();

    col.getReleases(username, 0, { page: page, per_page: per_page }, (err, data) => {
      response.jsonp({
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
