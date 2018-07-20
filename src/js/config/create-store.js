import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import MainReducer from './main-reducer';

let store = {};

/* eslint-disable */
export default function () {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    store = createStore(
        MainReducer,
        composeEnhancers(
            applyMiddleware(thunk),
        ),
    );
  } else {
    store = createStore(
      MainReducer,
      applyMiddleware(thunk),
    );
  }

  if (module.hot) {
    module.hot.accept('./main-reducer.js', () => {
      const nextRootReducer = require('./main-reducer.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
/* eslint-enable */
