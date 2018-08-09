import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOutCards } from '../desk/desk.actions';
import StartButton from './start-button';

class StartScreen extends Component {
  render() {
    return (
      <div className="main-block">
      <StartButton
        getOutCards={this.props.getOutCards}
      />
      </div>
    );
  }
}

export default connect(
  null,
  {
    getOutCards,
  },
)(StartScreen);
