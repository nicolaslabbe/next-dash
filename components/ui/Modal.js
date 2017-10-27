import React from "react";

import Text from "./Text";

class Modal extends React.Component {
  render() {
    const { className } = this.props;
    var style = {};
    this.props.background
      ? (style.backgroundColor = this.props.background)
      : null;
    style.display = this.props.visible ? "block" : "none";
    return (
      <div className="modal" style={style}>
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-content-text">
              <Text>Are you sure ?</Text>
            </div>
            <div className="modal-content-button">
              {this.props.onCancel ? (
                <div
                  className="modal-button"
                  onClick={event => this.props.onCancel(event)}
                >
                  <Text>Cancel</Text>
                </div>
              ) : null}
              <div
                className="modal-button"
                onClick={event => this.props.onValid(event)}
              >
                <Text>Ok</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
