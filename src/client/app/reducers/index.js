import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import state from './state';
import test from './test';
//import visibilityFilter from './visibilityFilter';

const simpleReducers = {
  test,
  state,
};
const combinedSimpleReducers = combineReducers(simpleReducers);

const reducers = combineReducers({
  test,
  state,
  routing,
  form,
});


// EXPOSE
export default reducers;
export {
  combinedSimpleReducers,
};
