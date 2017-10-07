import React, { Component } from 'react';
import eyesMoving from '../assets/eyes.js';

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    eyesMoving();
  }

  startGame() {
    document.querySelector('.wrapper').classList.add('darken');
    document.querySelector('.start-block').classList.add('fade-out');
    this.props.getOutCards();
  }

  render() {
    return (
      <div className="main-block start-block">
        <div className="content-block">

          <div className="text-block">
            <div className="hello-text" />

            <button
              className="start-btn"
              onClick={this.startGame}
            >
              начать игру
            </button>
          </div>

          <div className="robot-text robot-levitation">
            <div>
              <div id="left-eye">
                <div id="left-pupil" />
              </div>
              <div id="right-eye">
                <div id="right-pupil" />
              </div>
              <img src="images/robot.svg" alt="robot" />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
