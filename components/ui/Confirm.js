import React from "react";

import { Text, Button } from "./";

class Confirm extends React.Component {
  render() {
    const { className } = this.props;
    var style = {};
    this.props.background
      ? (style.backgroundColor = this.props.background)
      : null;
    style.display = this.props.visible ? "block" : "none";
    return (
      <div className="confirm" style={style}>
        <Button
          className="alert"
          onClick={() => this.props.onCancel && this.props.onCancel()}
        >
          cancel
        </Button>
        <Button onClick={() => this.props.onConfirm && this.props.onConfirm()}>
          confirm
        </Button>
      </div>
    );
  }
}

export default Confirm;
