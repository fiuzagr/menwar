import fs from 'fs';
import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'morgan';
import FileStreamRotator from 'file-stream-rotator';
import httpProxy from 'http-proxy';


const debug = require('debug')(process.env.DEBUG_ROOT + ':express');
const sessionSecret = process.env.SESSION_SECRET;


// configure log file
let log = null;
if (process.env.NODE_ENV === 'production') {
  const logDirectory = path.join(process.env.ROOT_PATH, 'log');
  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  // create a rotating write stream
  const accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYY-MM-DD', // eslint-disable-line camelcase
  });
  log = {
    stream: accessLogStream,
  };
}


const targetUrl = process.env.API_URL;
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true,
});
global.proxy = proxy;

// added the error handling to avoid:
// https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    debug('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});



export default (app, passport) => {

  // logger
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev', log));
  }


  // views path
  app.set('views', path.join(__dirname, '../views'));
  // render engine pug (jade)
  app.set('view engine', 'pug');

  // uncomment after placing your favicon in /public
  //app.use(
  //  favicon(
  //    path.join(process.env.ROOT_PATH, 'build/public', 'favicon.ico')
  //  )
  //);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.set('trust proxy', 1); // trust first proxy
  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }));
  //app.use(flash());
  app.use(helmet()); // many security rules


  // only in production
  if (process.env.NODE_ENV === 'production') {
    // load hash from webpack
    app.use((req, res, next) => {
      let hashValue = '';
      try {
        hashValue = fs.readFileSync(
          path
            .join(process.env.ROOT_PATH, 'build/hash.txt')
        );
      } catch(e) {
        hashValue = '';
      }

      res.locals.buildHash = hashValue;

      next();
    });

    // public content
    app.use(
      express
        .static(path.join(process.env.ROOT_PATH, 'build/public'))
    );
  }

  // Proxy to API server
  app.use('/api', (req, res) => {
    proxy.web(req, res, {target: targetUrl});
  });

  app.use('/ws', (req, res) => {
    proxy.web(req, res, {target: targetUrl + '/ws'});
  });

};

