import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Durachek from './containers/Durachek.js';

import '../css/hovers.css';
import '../css/animations.css';
import '../css/eyes.css';

render(
  <Provider store={configureStore()}>
    <Durachek />
  </Provider>,
  document.getElementById('root'),
);
