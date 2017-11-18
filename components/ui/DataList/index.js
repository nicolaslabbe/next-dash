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

  onClick = (event, item, i) => {
    const { onClick } = this.props;
    onClick && onClick(item, i);
  };

  getDataElement = (
    left = "left",
    right = "right",
    leftIcon = "leftIcon",
    rightIcon = "rightIcon",
    data
  ) => {
    var dataElement = null;

    if (data && Array.isArray(data)) {
      if (data[0] && typeof data[0] === "object") {
        dataElement = data.map((item, i) => {
          return (
            <Line
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
        dataElement = <Line item={data.join(", ")} />;
      }
    } else if (data && typeof data === "object") {
      dataElement = (
        <Line
          item={data}
          left={left}
          right={right}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      );
    } else if (data) {
      dataElement = <Line item={data} />;
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
          <div className="head" onClick={() => onClickHead && onClickHead()}>
            <Row>
              <Column>
                <Content>{head}</Content>
              </Column>
            </Row>
          </div>
        ) : null}
        {this.getDataElement(left, right, leftIcon, rightIcon, data)}
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default DataList;
