import React, { Component } from 'react';
import Radium from 'radium';
import Card from './card.js';

const styles = {
  backgroundColor: '#191A1F',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
};

@Radium
class LooTable extends Component {
  render() {
    return (
      <div style={styles}>
        <Card card="8c" place="2" />
      </div>
    );
  }
}

export default LooTable;
