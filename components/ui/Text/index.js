import React from "react";
import style from "./style.css";

class Text extends React.Component {
  render() {
    return (
      <div className="text">
        {this.props.children}
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Text;
