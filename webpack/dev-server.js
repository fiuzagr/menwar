import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';


/**
 * Load .env file
 */
require('dotenv').load({silent: true});


/**
 * Set env variables
 */
process.env.NODE_ENV = 'development';
process.env.DEBUG_ROOT = 'Dev';
process.env.ROOT_PATH = path.resolve(__dirname, '..');


// debug
const debug = require('debug')(process.env.DEBUG_ROOT + ':webpack-dev-server');
debug('Initializing...');


// init
let app = express();
let server = require(path.join(process.env.ROOT_PATH, 'index.js'));

/**
 * Get port from environment and store in Express.
 */
const port = (server.normalizePort(process.env.PORT, 1)) || '3001';
app.set('port', port);
const ip = process.env.IP || '0.0.0.0';
app.set('ip', ip);



/**
 * Webpack dev server
 */
const webpackConfig = require('./config.dev');
const webpackCompiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
  contentBase: 'http://' + app.get('ip') + ':' + app.get('port'),
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  stats: {
    colors: true,
    progress: true,
  },
}));

app.use(webpackHotMiddleware(webpackCompiler));


/**
 * Create server
 */
server.default(app, ip, port);

