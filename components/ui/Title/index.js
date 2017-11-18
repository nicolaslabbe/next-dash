import React from "react";
import style from "./style.css";

class Title extends React.Component {
  render() {
    return (
      <div className="title">
        {this.props.children}
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Title;
