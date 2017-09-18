import React from 'react';

const styles = {
  messagesBlock: {
    position: 'absolute',
    top: '225px',
    width: '803px',
    textAlign: 'end',
    color: 'white',
    letterSpacing: '.1em',
    textTransform: 'uppercase',
  },
};

export default function Messages(props) {
  return (
    <div style={styles.messagesBlock}>
      {
        props.messages.map((msg, i) => (
          <div
            key={i}
            className="msg-animation"
            style={{
              animationDelay: `${i * 0.4}s`,
              opacity: '0',
              paddingBottom: '10px',
            }}
          >
            {msg}
          </div>
        ))
      }
    </div>
  );
}
