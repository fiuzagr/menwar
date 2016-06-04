import React, { PropTypes } from 'react';
// react router
import {
  Router,
  Route,
  IndexRoute,
  // Redirect,
} from 'react-router';


// config
import config from './config.json';

// application component
import Main from 'components/Main';
// app pages
import {
  HomePage,
  NotFoundPage,
} from 'institutional/pages';


// inject config in all routes
const createElement = (Component, props) => (
  <Component config={config} {...props} />
);


let Routes = (props) => {
  const { history } = props;

  return (
    <Router history={history} createElement={createElement}>
      <Route path='/' component={Main}>
        <IndexRoute
          component={HomePage} />
        <Route
          path='*'
          component={NotFoundPage} />
      </Route>
    </Router>
  );
};
Routes.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Routes;

