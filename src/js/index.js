import React from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './config/create-store';
import MainScreen from './modules/game-states/main.screen';

import '../styles/index.less';

ReactDOM.render(
  <Provider store={createStore()}>
    <MainScreen />
  </Provider>,
  document.getElementById('js-root'),
);
