import {
  createStore as _createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { routerMiddleware } from 'react-router-redux';


const createStore = (reducers, history, data = {}) => {

  let devTools = [];
  if (
    process.env.BROWSER
    && process.env.IS_DEV
    && window.devToolsExtension
  ) {
    devTools = [
      window.devToolsExtension(),
    ];
  }

  const store = _createStore(
    reducers,
    data,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      ...devTools
    )
  );

  return store;
};


const createApiStore = (reducers) => {
  const store = _createStore(reducers);
  return store;
};


// EXPOSE
export default createStore;
export {
  createApiStore,
};

