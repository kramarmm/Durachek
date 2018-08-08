import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            <div>Friendship won!</div>
          ) : userHaveNoCards ? (
            <div>You are the winner!</div>
          ) : (
            <div>Robot is the winner!</div>
          )
        }
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
)(EndScreen);
