import React, { Component } from 'react';
import { connect } from 'react-redux';

import { start, game, end } from '../desk/desk.consts.js';

import ErrorScreen from '../error-handler/error.screen';


import SmallDimensions from './small-dimensions.screen';
import StartScreen from './start.screen.js';
import EndScreen from './end.screen.js';
import DeskScreen from '../desk/desk.screen.js';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SmallDimensions: false,
    };

    this.onResize = this.onResize.bind(this);
  }

  componentWillMount() {
    this.onResize();

    window.addEventListener(
      'resize',
      this.onResize,
    );
  }

  onResize() {
    this.setState({
      SmallDimensions: window.innerWidth < 800 ||
      window.innerHeight < 500,
    });
  }

  render() {
    const {
      desk,
    } = this.props;

    return (
      <ErrorScreen>
        <div className="main">
          <div className="wrapper">
            <a
              href="https://github.com/kramarmm/Durachek"
              target="_blank"
              className="github"
              rel="noopener noreferrer"
            >
              <img src="./images/github.png" />
            </a>
            {
              this.state.SmallDimensions ? (
                <SmallDimensions />
              ) : (
                desk.gameState === start ? (
                  <StartScreen />
                ) : desk.gameState === end ? (
                  <EndScreen />
                ) : desk.gameState === game ? (
                  <DeskScreen />
                ) : null
              )
            }
          </div>
        </div>
      </ErrorScreen>
    );
  }
}

const mapStateToProps = state => ({
  desk: state.desk,
});

export default connect(
  mapStateToProps,
)(MainScreen);
