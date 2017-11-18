import React from "react";

// ui
import { Icon } from "../";
import style from "./style.css";

class ButtonIcon extends React.Component {
  render() {
    const { className, color, onClick } = this.props;
    return (
      <div
        className="button-icon"
        style={{ background: color || "transparent" }}
        onClick={() => onClick && onClick()}
      >
        <Icon
          color={color && color === "black" ? "white" : "black"}
          name={this.props.icon}
        />
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default ButtonIcon;
