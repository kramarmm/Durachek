import React from 'react';
import { connect } from 'react-redux';

import { start, game, end } from '../desk/desk.consts.js';

import ErrorScreen from '../error-handler/error.screen';

import StartScreen from './start.screen.js';
import EndScreen from './end.screen.js';
import DeskScreen from '../desk/desk.screen.js';

const MainScreen = props => (
  <ErrorScreen>
    <div className="main">
      <div className="wrapper">
        {
          props.desk.gameState === start ? (
            <StartScreen />
          ) : props.desk.gameState === end ? (
            <EndScreen />
          ) : props.desk.gameState === game ? (
            <DeskScreen />
          ) : null
        }
      </div>
    </div>
  </ErrorScreen>
);

const mapStateToProps = state => ({
  desk: state.desk,
});

export default connect(
  mapStateToProps,
)(MainScreen);
