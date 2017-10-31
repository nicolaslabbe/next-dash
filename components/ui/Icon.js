import React from "react";

class Icon extends React.Component {
  render() {
    const { className } = this.props;
    var style = {};
    this.props.color ? (style.color = this.props.color) : null;
    this.props.size ? (style.fontSize = this.props.size) : null;
    var classIconName =
      this.props.name.length === 1 ? "weather-icons" : "material-icons";

    return (
      <i
        className={`${className ? className : ""} icon ${classIconName} ${this
          .props.dark
          ? "dark"
          : ""}`}
        style={style}
      >
        {this.props.name}
      </i>
    );
  }
}

export default Icon;
