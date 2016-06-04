import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form} from 'redux-form';

//import todos from './todos'
//import visibilityFilter from './visibilityFilter'

//const reducers = combineReducers({
  //todos,
  //visibilityFilter,
//});

const reducers = combineReducers({
  routing,
  form,
});

export default reducers;

