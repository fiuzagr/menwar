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


import Main from 'components/Main';
import Application from 'app/components/Application';
// app pages
import {
  LoginPage,
  RegisterPage,
  NotFoundPage,
} from 'app/pages';



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
          component={LoginPage} />
        <Route
          path='/cadastro'
          component={RegisterPage} />
        <Route path='/' component={Application}>
          <Route
            path='*'
            component={NotFoundPage} />
        </Route>
      </Route>
    </Router>
  );
};
Routes.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Routes;

