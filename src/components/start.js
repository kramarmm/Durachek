import React, { Component } from 'react';

import Modal from './modal.js';

class Start extends Component {

  render() {
    return (
      <Modal
        isOpen
      >
        <button
          onClick={this.props.getOutCards}
        >
          Start
        </button>
      </Modal>
    );
  }
}

export default Start;
