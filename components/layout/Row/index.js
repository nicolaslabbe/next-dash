import React from "react";

class Row extends React.Component {
  render() {
    const {
      className,
      alignXs,
      alignSm,
      alignMd,
      alignLg,
      valignXs,
      valignSm,
      valignMd,
      valignLg
    } = this.props;
    return (
      <div
        onClick={() => this.props.onClick && this.props.onClick()}
        className={`${className ? className : ""} row ${alignXs
          ? alignXs + "-xs"
          : ""} ${alignSm ? alignSm + "-sm" : ""} ${alignMd
          ? alignMd + "-md"
          : ""} ${alignLg ? alignLg + "-lg" : ""} ${valignXs
          ? valignXs + "-xs"
          : ""} ${valignSm ? valignSm + "-sm" : ""} ${valignMd
          ? valignMd + "-md"
          : ""} ${valignLg ? valignLg + "-lg" : ""}`}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Row;
