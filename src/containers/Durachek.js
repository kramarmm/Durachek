import React from 'react';
import { connect } from 'react-redux';

import * as croupieActions from '../actions/croupie.js';

import Start from '../components/start.js';
import Process from '../components/process.js';
import End from '../components/end.js';

const Durachek = props => (
  <div>

    {
      props.croupie.gameState === 'start' ? (
        <Start
          getOutCards={props.getOutCards}
        />
      ) : props.croupie.gameState === 'end' ? (
        <End />
      ) : null
    }

    <Process />

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
