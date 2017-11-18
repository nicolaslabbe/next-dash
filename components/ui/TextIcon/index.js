import React from "react";

// ui
import { Icon } from "../";
import style from "./style.css";

class TextIcon extends React.Component {
  render() {
    return (
      <div className="text-icon">
        <div className="icon">
          <Icon color="white" name={this.props.icon} />
        </div>
        {this.props.children}
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default TextIcon;
