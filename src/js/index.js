import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Durachek from './containers/Durachek.js';

import '../css/index.less';

render(
  <Provider store={configureStore()}>
    <Durachek />
  </Provider>,
  document.getElementById('root'),
);
