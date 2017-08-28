import React, { Component } from 'react';
import Card from './card.js';

const styles = {
  backgroundColor: 'rgb(48, 26, 66)',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
};

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
