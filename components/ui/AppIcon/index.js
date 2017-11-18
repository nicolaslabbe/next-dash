import React from "react";

import { Icon } from "../";

import style from "./style.css";

class AppIcon extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div
        className="app-icon"
        onClick={() => this.props.onClick && this.props.onClick()}
      >
        <Icon name={this.props.name} />
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default AppIcon;
