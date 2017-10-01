import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Durachek from './containers/Durachek.js';

import '../css/index.less';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Durachek />
  </Provider>,
  document.getElementById('root'),
);
