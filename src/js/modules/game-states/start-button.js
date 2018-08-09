import React from 'react';

export default function StartButton({ getOutCards }) {
  return (
    <div
      className="btn btn-start"
      onClick={getOutCards}
    >
      Start
      <svg
        width="130"
        height="65"
        viewBox="0 0 130 65"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x='0'
          y='0'
          fill='none'
          width='130'
          height='65'
        />
      </svg>
    </div>
  );
}
