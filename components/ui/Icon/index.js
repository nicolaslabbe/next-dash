import React from "react";
import style from "./style.css";

class Icon extends React.Component {
  render() {
    const { className } = this.props;
    var style = {};
    this.props.color ? (style.color = this.props.color) : null;
    this.props.size ? (style.fontSize = this.props.size) : null;
    var classIconName =
      this.props.name.length === 1 ? "weather-icons" : "material-icons";

    return (
      <div className="icon">
        <i
          className={`${className ? className : ""} ${classIconName} ${this
            .props.dark
            ? "dark"
            : ""}`}
          style={style}
        >
          {this.props.name}
        </i>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Icon;
