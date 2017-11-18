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
          <Column xs={right ? 6 : 12}>
            <Content>
              <div className="left">
                {this.display(left, item)}
                <div className="icon">
                  {rightIcon &&
                    item[leftIcon] && (
                      <div className="icon">
                        <Icon name={item[leftIcon]} />
                      </div>
                    )}
                </div>
              </div>
            </Content>
          </Column>
          {right ? (
            <Column xs={6}>
              <Content>
                <div className="right">
                  {this.display(right, item)}
                  {rightIcon &&
                    item[rightIcon] && (
                      <div className="icon">
                        <Icon name={item[rightIcon]} />
                      </div>
                    )}
                </div>
              </Content>
            </Column>
          ) : null}
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Line;
