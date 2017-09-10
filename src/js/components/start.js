import React from 'react';

import moveEyes from '../assets/eyes.js';

const styles = {
  mainBlock: {
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
    width: '50%',
  },

  helloText: {
    backgroundImage: 'url(images/hello-text.svg)',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    maxWidth: '415px',
    height: '0',
    padding: '0',
    paddingBottom: 'calc(100% * 1.95 / 4.5)',
  },

  startBtn: {
    textDecoration: 'none',
    backgroundColor: 'white',
    border: '2px solid #5c5c5c',
    padding: '13px 0 12px 0',
    textTransform: 'uppercase',
    fontSize: '29px',
    marginTop: '60px',
    color: '#5c5c5c',
    cursor: 'pointer',
    transition: 'all .2s',
    width: '100%',
    maxWidth: '415px',
    outline: 'none',
  },

  robotBlock: {
    width: '50%',
  },

  innerRobotBlock: {
  },
};

export default function Start(props) {
  return (
    <div style={styles.mainBlock} className="start-block">
      <div style={styles.contentBlock}>

        <div style={styles.textBlock}>
          <div style={styles.helloText} />

          <button
            style={styles.startBtn}
            onClick={() => {
              document.querySelector('.wrapper').classList.add('darken');
              document.querySelector('.start-block').classList.add('fade-out');
              props.getOutCards();
            }}
            className="start-game-btn"
          >
            начать игру
          </button>
        </div>

        <div style={styles.robotBlock} className="robot-levitation">
          <div style={styles.innerRobotBlock}>
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

function eyes() {
  moveEyes();
  requestAnimationFrame(eyes);
}
eyes();
