import React, { Component } from 'react';

import Modal from './modal.js';

class Start extends Component {

  render() {

    const lastVisit = parseInt(localStorage.lastVisit, 10);
    const lastVisitMoreThanThirtyMinutes = lastVisit ? Date.now() - lastVisit > 1800000 :;

    return (
      <Modal
        isOpen={!lastVisitMoreThanThirtyMinutes}
      >
        {
          isNewUser ? (
            <div>isNewUser</div>
          ) : null
        }
      </Modal>
    );
  }
}

export default Start;


// to localStorage 
// lastVisit (for modal greetings)
// 