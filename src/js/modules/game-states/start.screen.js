import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOutCards } from '../desk/desk.actions';

class StartScreen extends Component {
  render() {
    return (
      <div className="main-block">
        <div
          className="btn btn-start"
          onClick={this.props.getOutCards}
        >
          Start
          <svg width="130" height="65" viewBox="0 0 130 65" xmlns="http://www.w3.org/2000/svg">
            <rect x='0' y='0' fill='none' width='130' height='65'/>
          </svg>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    getOutCards
  },
)(StartScreen);
