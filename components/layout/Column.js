import React from "react";

class Column extends React.Component {
  render() {
    const {
      xs,
      sm,
      md,
      lg,
      autoXs,
      autoSm,
      autoMd,
      autoLg,
      offsetXs,
      offsetSm,
      offsetMd,
      offsetLg,
      className
    } = this.props;
    return (
      <div
        className={`${className ? className : ""} ${xs
          ? "col-xs-" + xs
          : ""} ${sm ? "col-sm-" + sm : ""} ${md ? "col-md-" + md : ""} ${lg
          ? "col-lg-" + lg
          : ""} ${autoXs ? "col-xs" : ""} ${autoSm ? "col-sm" : ""} ${autoMd
          ? "col-md"
          : ""} ${autoLg ? "col-lg" : ""} ${offsetXs
          ? "col-xs-offset-" + offsetXs
          : ""} ${offsetSm ? "col-sm-offset-" + offsetSm : ""} ${offsetMd
          ? "col-md-offset-" + offsetMd
          : ""} ${offsetLg ? "col-lg-offset-" + offsetLg : ""}
			`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Column;
