import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  // backgroundImage: ''
  background: 'red',
};

@Radium
class LooTable extends Component {
  render() {
    return (
      <span style={styles}>
        Hello!
      </span>
    );
  }
}

export default LooTable;
