import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOutCards } from '../desk/desk.actions';
import StartButton from './start-button';

class EndScreen extends Component {
  render() {
    const {
      user,
      robot,
    } = this.props;

    const userHaveNoCards = !user.cards.length;
    const robotHaveNoCards = !robot.cards.length;

    return (
      <div className="main-block">
        {
          userHaveNoCards
          && robotHaveNoCards ? (
            <div className="end-text font-lg">
              Friendship won!
            </div>
          ) : userHaveNoCards ? (
            <div className="end-text font-lg">
              You are the winner!
            </div>
          ) : (
            <div className="end-text font-lg">
              Robot is the winner!
            </div>
          )
        }

        <StartButton
          getOutCards={this.props.getOutCards}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  robot: state.robot,
});

export default connect(
  mapStateToProps,
  {
    getOutCards,
  }
)(EndScreen);
