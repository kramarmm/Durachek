import React from 'react';
import { connect } from 'react-redux';

import * as croupieActions from '../actions/croupie.js';

import Start from '../components/start.js';
import Process from '../components/process.js';
import End from '../components/end.js';

const rootStyles = {
  color: 'white',
  fontFamily: 'Arial',
  backgroundColor: '#011419',
};

const Durachek = props => (
  <div style={rootStyles}>
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
