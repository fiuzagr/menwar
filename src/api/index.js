import express from 'express';

// init
let app = express();

// Bootstrap db config
//require('./config/db').default();

// Bootstrap migration
// require('./config/migrations').default();

// Bootstrap application settings
require('./config/express').default(app);

// Bootstrap routes settings
require('./routes').default(app);


// Needed CommonJS export
module.exports = app;

