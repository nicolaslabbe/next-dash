import React from "react";

// ui
import { TextIcon } from "../";

class TextsIcon extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <div
        className={`texts-icon ${this.props.className
          ? this.props.className
          : ""}`}
      >
        {items
          ? this.props.items.map((item, i) => (
              <TextIcon key={i} icon={item.icon}>
                {item.text}
              </TextIcon>
            ))
          : null}
      </div>
    );
  }
}

export default TextsIcon;
