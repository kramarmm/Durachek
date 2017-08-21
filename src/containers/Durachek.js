import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as croupieActions from '../actions/croupie.js';

import Start from '../components/start.js';
import Process from '../components/process.js';
import End from '../components/end.js';

const Durachek = props => (
  <div>

    {
      props.croupie.gameState === 'start' ? (
        <Start />
      ) : props.croupie.gameState === 'end' ? (
        <End />
      ) : null
    }

    <Process
      croupie={props.croupie}
      mind={props.mind}
    />

  </div>
);

function mapStateToProps(state) {
  return {
    croupie: state.croupie,
    mind: state.mind,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(croupieActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Durachek);
