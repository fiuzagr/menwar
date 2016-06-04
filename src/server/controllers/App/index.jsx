const debug = require('debug')(process.env.DEBUG_ROOT + ':App');

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet';

// Reducers
import reducers from 'app/reducers';

// config
import config from 'app/config.json';

// routes
import routes from 'app/Routes';

// libs
import createHistory from 'lib/history';
import createStore from 'lib/store';


const render = (res, options) => {
  res.render(
    'app/index',
    options
  );
};

// inject config in all routes
const createElement = (Component, props) => (
  <Component config={config} {...props} />
);


const index = (req, res) => {
  if (process.env.IS_DEV) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  let style = webpackIsomorphicTools.assets().styles;
  let script = webpackIsomorphicTools.assets().javascript;
  let initialState = JSON.stringify({});
  let html = 'Universal JS';
  let head = {};

  // inline style
  if (!style.app) {
    // inline style in development env
    style = require('style/index.styl')._style;
  }


  // disable ssr on dev env
  //if (process.env.IS_DEV) {
    //render(res, {html, head, style, script, initialState});
    //return;
  //}


  // createHistory
  const history = createHistory(config.url.base);
  // createStore
  const store = createStore(reducers, history, {});
  // Create an enhanced history that syncs navigation events with the store
  const finalHistory = syncHistoryWithStore(history, store);


  // location
  const location = (req.originalUrl.replace(config.url.base, '') || '/');


  match(
    {
      routes: routes({history: finalHistory}),
      history: finalHistory,
      location,
    },
    (error, redirectLocation, renderProps) => {
      if (error) {
        debug(error.message);
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.

        html = renderToString((
          <Provider store={store}>
            <RouterContext createElement={createElement} {...renderProps} />
          </Provider>
        ));

        head = Helmet.rewind();

        // fix react-router-redux
        // https://github.com/reactjs/react-router-redux/issues/284
        let storeState = store.getState();
        storeState.routing.locationBeforeTransitions.pathname = location;
        storeState.routing.locationBeforeTransitions.basename =
          config.url.base === '/' ? '' : config.url.base;
        initialState = JSON.stringify(storeState);

        render(res, {html, head, style, script, initialState});

      } else {
        res.status(404).send('Not found');
      }
    }
  );

};


export default {
  index,
};

