import express from 'express';
//import passport from 'passport';
let passport = null;

// init
let app = express();

// Bootstrap db config
//require('./config/db').default();

// Bootstrap migration
// require('./config/migrations').default();

// Bootstrap passport config
//require('./config/passport').default(passport);

// Bootstrap application settings
require('./config/express').default(app, passport);

// Bootstrap routes settings
require('./routes').default(app, passport);


// Needed CommonJS export
module.exports = app;
