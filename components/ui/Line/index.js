import React from "react";

import { Row, Column, Content } from "../../layout";
import { Icon } from "../";
import style from "./style.css";

class Line extends React.Component {
  display = (key, item) => {
    if (typeof key === "function") {
      return key(key, item);
    } else if (typeof item === "object") {
      return item[key];
    } else {
      return item;
    }
  };

  displayIcon = (key, item) => {
    if (typeof key === "function" && key) {
      var itemFn = key(key, item);
      if (itemFn) {
        return <Icon name={key(key, item)} />;
      }
    } else if (typeof item === "object" && key && item[key]) {
      return <Icon name={item[key]} />;
    } else {
      return null;
    }
  };

  render() {
    const {
      onClick,
      item,
      left = "left",
      right = "right",
      leftIcon = "leftIcon",
      rightIcon = "rightIcon"
    } = this.props;

    return (
      <div className="line">
        <Row onClick={event => onClick && onClick(event, item)}>
          <div className="left">
            <Column xs={right ? 6 : 12}>
              {this.display(left, item)}
              {this.displayIcon(leftIcon, item)}
            </Column>
          </div>
          {right ? (
            <div className="right">
              <Column xs={6}>
                <Content>
                  {this.display(right, item)}
                  {this.displayIcon(rightIcon, item)}
                </Content>
              </Column>
            </div>
          ) : null}
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Line;
