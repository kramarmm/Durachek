import React from 'react';
import { connect } from 'react-redux';

import * as croupieActions from '../actions/croupie.js';

import Start from '../components/start.js';
import Process from '../components/process.js';
import End from '../components/end.js';

const styles = {
  color: 'balck',
  fontFamily: 'Arial',
  backgroundImage: 'url(images/background.png)',
  backgroundPosition: 'center center',
};

const Durachek = props => (
  <div style={styles}>
    <div className="wrapper">
      {
        props.croupie.gameState === 'start' ? (
          <Start
            getOutCards={props.getOutCards}
          />
        ) : props.croupie.gameState === 'end' ? (
          <End />
        ) : props.croupie.gameState === 'process' ? (
          <Process />
        ) : null
      }
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    croupie: state.croupie,
    robot: state.robot,
  };
}

export default connect(
  mapStateToProps,
  croupieActions,
)(Durachek);
