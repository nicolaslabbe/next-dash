import React from "react";

class Button extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <div
        className={`${className ? className : ""} button`}
        onClick={() => this.props.onClick && this.props.onClick()}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
