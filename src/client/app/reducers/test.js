//import { assign } from 'lodash';

import { SET_STATE } from 'app/actions/state';


// TODO change to immutable
//const initialState = {
  //test: '',
//};
const initialState = 'test 1';


export default function (state = initialState, action) {
  switch (action.type) {
  case SET_STATE:
    return action.state.test;
  default:
    return state;
  }
}

