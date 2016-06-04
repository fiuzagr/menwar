require('es6-promise').polyfill();
/**
 * Load .env file
 */
require('dotenv').load({silent: true});


var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');
var HashPlugin = require('hash-webpack-plugin');

var koutoSwiss = require('kouto-swiss');
var jeet = require('jeet');
var autoprefixer = require('autoprefixer');


// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));


function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

// port and ip from ENV
var port = (+process.env.PORT + 1) || '3001';
var ip = process.env.IP || '0.0.0.0';
var publicPath = 'http://' + ip + ':' + port;


module.exports = function (options) {
  options.lint = fs.existsSync(path.join(__dirname, '/../.eslintrc')) && options.lint !== false;

  var localIdentName = options.production ? '[hash:base64]' : '[path]-[local]-[hash:base64:5]';
  var cssLoaders = 'style!css?localIdentName=' + localIdentName + '!postcss';
  var stylusLoaders = cssLoaders + '!stylus';
  var jsxLoaders = ['react-hot', 'babel'];
  var jsonLoaders = 'json';

  if (options.production) {
    cssLoaders = extractForProduction(cssLoaders);
    stylusLoaders = extractForProduction(stylusLoaders);
  }


  return {
    entry: options.testing ? {} : (options.production ? {
      app: './src/client/app/index.jsx',
      institutional: './src/client/institutional/index.jsx',
    } : {
      app: ['./src/client/app/index.jsx', 'webpack-hot-middleware/client?path=' + publicPath + '/__webpack_hmr&reload=true'],
      institutional: ['./src/client/institutional/index.jsx', 'webpack-hot-middleware/client?path=' + publicPath + '/__webpack_hmr&reload=true'],
    }),
    cache: !options.production,
    debug: !options.production,
    devtool: options.devtool,
    devServer: {
      historyApiFallback: true,
    },
    output: options.testing ? {} : {
      path: options.production ? './build/public' : path.join(__dirname, '../tmp'),
      publicPath: options.production ? '/' : publicPath + '/',
      filename: options.production ? 'script/[name]-[hash].js' : '[name]/index.js',
    },
    module: {
      preLoaders: options.lint ? [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint',
        },
      ] : [],
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: jsxLoaders,
        },
        {
          test: /\.css$/,
          loader: cssLoaders,
        },
        {
          test: /\.styl$/,
          loader: stylusLoaders,
        },
        {
          test: /\.json$/,
          loader: jsonLoaders,
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite?' + JSON.stringify({
            name: '[name]_[hash]',
          }),
        },
        {
          test: /\.png$/,
          loader: 'url?limit=100000&mimetype=image/png',
        },
        {
          test: /\.gif$/,
          loader: 'url?limit=100000&mimetype=image/gif',
        },
        {
          test: /\.jpg$/,
          loader: 'file',
        },
      ],
    },
    stylus: {
      use: [koutoSwiss(), jeet()],
    },
    postcss: function () {
      return [autoprefixer({browsers: ['last 2 versions']})];
    },
    resolve: {
      root: path.join(__dirname, '/../'),
      modulesDirectories: [
        'node_modules',
        'src/client',
      ],
      extensions: ['', '.js', '.jsx'],
    },
    plugins: options.testing ? [] : (options.production ? [
      // Important to keep React file size down
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          'BROWSER': JSON.stringify(true),
          'IS_DEV': JSON.stringify(false),
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new ExtractTextPlugin('style/[name]-[hash].css'),
      new AppCachePlugin({
        output: '/manifest.appcache',
        settings: ['prefer-online'],
      }),
      new HashPlugin({ path: './build', fileName: 'hash.txt' }),
      webpackIsomorphicToolsPlugin,
    ] : [
      // Important to keep React file size down
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development'),
          'BROWSER': JSON.stringify(true),
          'IS_DEV': JSON.stringify(true),
        },
      }),
      // new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new AppCachePlugin({
        output: '/manifest.appcache',
        settings: ['prefer-online'],
      }),
      webpackIsomorphicToolsPlugin.development(),
    ]),
  };
};
