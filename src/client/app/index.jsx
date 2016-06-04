// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
import '../style/index.styl';

// ajax pace
//require('pace');

// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
// require('babel/polyfill');
require('es6-promise').polyfill();

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';


// config
import config from './config.json';

// Reducers
import reducers from './reducers';

// Routes
import Routes from './Routes';

// create store
import createStore from 'lib/store';

// create history
import createHistory from 'lib/history';
const history = createHistory(config.url.base);

// store
const store = createStore(reducers, history, window.__INITIAL_STATE__);
// Create an enhanced history that syncs navigation events with the store
const finalHistory = syncHistoryWithStore(history, store);

// socket
import socket from 'lib/socket';
window.socket = socket({
  path: config.url.socket,
}, store);


render((
  <Provider store={store}>
    <Routes history={finalHistory} />
  </Provider>
), document.getElementById('content'));


if (process.env.IS_DEV && module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}

