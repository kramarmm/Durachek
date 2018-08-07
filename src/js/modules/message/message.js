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
    if (this.props.text.length) {
      this.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.text.length
      && this.props.text !== nextProps.text
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
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Message;
