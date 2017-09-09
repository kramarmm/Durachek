import React from 'react';

import moveEyes from '../assets/eyes.js';

const styles = {
  background: {
    backgroundImage: 'url(images/background.png)',
    backgroundPosition: 'center center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },

  contentBlock: {
    height: '60vh',
    width: '65vw',
    boxShadow: 'rgba(0, 0, 0, 0.08) -3px 4px 4px, rgba(0, 0, 0, 0.24) 0px 1px 8px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBlock: {
    margin: '0 50px',
  },

  helloText: {
    color: '#22bcc3',
    textTransform: 'uppercase',
    fontSize: '60px',
  },

  tenderText: {
    color: '#ea5d5a',
    fontStyle: 'italic',
    fontSize: '30px',
    textAlign: 'center',
  },

  startBtn: {
    textDecoration: 'none',
    backgroundColor: 'white',
    border: '2px solid #5c5c5c',
    minWidth: '405px',
    padding: '13px 0 12px 0',
    textTransform: 'uppercase',
    fontSize: '29px',
    marginTop: '60px',
    color: '#5c5c5c',
    cursor: 'pointer',
    transition: 'all .2s',
  },

  robot: {
    height: '430px',
    width: '430px',
  },
};

export default function Start(props) {
  return (
    <div style={styles.background}>
      <div style={styles.contentBlock}>

        <div style={styles.textBlock}>
          <div style={styles.helloText}>
            здравствуй, <br />кусок мяса!
          </div>

          <div style={styles.tenderText}>
            я тебя сделаю...
          </div>

          <button
            style={styles.startBtn}
            onClick={props.getOutCards}
            className="start-game-btn"
          >
            начать игру
          </button>
        </div>

        <div style={styles.robot} className="robot-levitation">
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
  );
}

function eyes() {
  moveEyes();
  requestAnimationFrame(eyes);
}
eyes();
