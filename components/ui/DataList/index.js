import React from "react";
import { connect } from "react-redux";

// Layout
import { Row, Column, Content } from "../../layout";

import { Line } from "../";

import style from "./style.css";

class DataList extends React.Component {
  constructor(props) {
    super(props);
  }

  getDataElement = (
    left = "left",
    right = "right",
    leftIcon = "leftIcon",
    rightIcon = "rightIcon",
    data
  ) => {
    const { onClick } = this.props;
    var dataElement = null;

    if (data && Array.isArray(data)) {
      if (data[0] && typeof data[0] === "object") {
        dataElement = data.map((item, i) => {
          return (
            <Line
              onClick={() => onClick && onClick(item)}
              key={i}
              item={item}
              left={left}
              right={right}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
            />
          );
        });
      } else {
        dataElement = (
          <Line
            onClick={() => onClick && onClick(item)}
            item={data.join(", ")}
          />
        );
      }
    } else if (data && typeof data === "object") {
      dataElement = (
        <Line
          onClick={() => onClick && onClick(item)}
          item={data}
          left={left}
          right={right}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      );
    } else if (data) {
      dataElement = (
        <Line onClick={() => onClick && onClick(item)} item={data} />
      );
    }

    return dataElement;
  };

  render() {
    const {
      left,
      right,
      leftIcon,
      rightIcon,
      data,
      head,
      onClickHead
    } = this.props;

    return (
      <div className="data-list">
        {head ? (
          <Row>
            <Column xs="12">
              <Content>
                <div
                  className="head"
                  onClick={() => onClickHead && onClickHead()}
                >
                  {head}
                </div>
              </Content>
            </Column>
          </Row>
        ) : null}
        {this.getDataElement(left, right, leftIcon, rightIcon, data)}
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default DataList;
