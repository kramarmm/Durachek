import React, { Component } from 'react';

class SmallDimensions extends Component {
  render() {
    return (
      <div className="main-block">
        <div className="small-dimensions-block">
          <div className="text-color-main font-lg">
            Your screen is very small :(
          </div>
          <img
            className="sad-icon"
            src="images/sad.svg"
            alt="Sad icon"
          />
        </div>
      </div>
    );
  }
}

export default SmallDimensions;
