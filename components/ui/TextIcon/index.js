import React from "react";

// ui
import { Icon } from "../";

class TextIcon extends React.Component {
  render() {
    return (
      <div
        className={`text-icon ${this.props.className
          ? this.props.className
          : ""}`}
      >
        <Icon name={this.props.icon} />
        {this.props.children}
      </div>
    );
  }
}

export default TextIcon;
