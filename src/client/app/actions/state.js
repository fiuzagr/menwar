
/**
 * Action types
 */
export const SET_STATE = 'SET_STATE';


/**
 * Action creators
 */
export function setState(state) {
  return {type: SET_STATE, state};
}

