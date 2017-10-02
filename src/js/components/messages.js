import React from 'react';

export default function Messages(props) {
  return (
    <div className="messages-block">
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
