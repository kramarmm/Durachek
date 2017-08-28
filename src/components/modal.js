import React, { Component } from 'react';

const backdropStyle = {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  zIndex: '1040',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  width: '700px',
  height: '300px',
  maxWidth: '100%',
  maxHeight: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  color: 'white',
  background: 'rgba(0, 0, 0, 0.35)',
  border: '2px solid rgb(0, 211, 255)',
  transition: 'all .2s ease-in-out',
};

// .pure-modal > * {
//   display: flex;
//   max-height: 100vh;
//   flex-direction: column;
// }

// .pure-modal > * > * {
//   flex: 0 0 auto;
// }

const closeStyle = {
  position: 'absolute',
  right: '10px',
  top: '10px',
  zIndex: '1',
  width: '30px',
  height: '30px',
  textAlign: 'center',
  lineHeight: '30px',
  cursor: 'pointer',
}

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
    };
    
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div>
        {
          this.state.isOpen ? (
            <div style={backdropStyle}>
              <div style={modalStyle}>
                <div
                  onClick={this.close}
                  style={closeStyle}
                >
                  X
                </div>
                {this.props.children}
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default Start;
