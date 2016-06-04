import fs from 'fs';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'morgan';
import FileStreamRotator from 'file-stream-rotator';


//let debug = require('debug')(process.env.DEBUG_ROOT + ':express');
const sessionSecret = process.env.SESSION_SECRET;


// configure log file
let log = null;
if (process.env.NODE_ENV === 'production') {
  const logDirectory = path.join(process.env.ROOT_PATH, 'log');
  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  // create a rotating write stream
  const accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/api-access-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYY-MM-DD', // eslint-disable-line camelcase
  });
  log = {
    stream: accessLogStream,
  };
}



export default (app) => {

  // logger
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev', log));
  }


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

};

