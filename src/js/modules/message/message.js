import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      visible: false,
    };

    this.hide = this.hide.bind(this);
  }

  componentWillMount() {
    if (this.props.message.text.length) {
      this.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.message.text.length
      && this.props.message.timestamp !== nextProps.message.timestamp
    ) {
      this.show();
    }
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  show() {
    this.setState({
      visible: true,
    });

    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(
      this.hide,
      1500
    );
  }

  render() {
    if (!this.state.visible) return null;

    return (
      <div className="message">
        <div className="message-text">
          {this.props.message.text}
        </div>
      </div>
    );
  }
}

export default Message;
