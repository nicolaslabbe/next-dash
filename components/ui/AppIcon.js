import React from "react";

import Icon from "./Icon";

class AppIcon extends React.Component {
  render() {
    const { className } = this.props;
    var style = {};
    this.props.background
      ? (style.backgroundColor = this.props.background)
      : null;
    return (
      <div
        className={`${className ? className : ""} app-icon`}
        onClick={() => this.props.onClick && this.props.onClick()}
        style={style}
      >
        <Icon name={this.props.name} />
      </div>
    );
  }
}

export default AppIcon;
