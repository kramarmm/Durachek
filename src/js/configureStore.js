import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import DurachekReducer from './reducers/durachek.js';
// here i can past my API for third parameter in actions
//   applyMiddleware(thunk.withExtraArgument(api))

/* eslint-disable */
export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
      DurachekReducer,
      composeEnhancers(
          applyMiddleware(thunk),
      ),
  );

  if (module.hot) {
    module.hot.accept('./reducers/durachek.js', () => {
      const nextRootReducer = require('./reducers/durachek.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
/* eslint-enable */