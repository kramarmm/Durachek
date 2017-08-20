import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Durachek from './containers/Durachek.js';

render(
  <Provider store={configureStore()}>
    <Durachek />
  </Provider>,
  document.getElementsByClassName('root')[0],
);
