import React from "react";
import { connect } from "react-redux";

// Layout
import { Row, Column, Content } from "../layout";

import { Icon } from "../ui";

class DataList extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = (event, item, i) => {
    const { onClick } = this.props;
    onClick && onClick(item, i);
  };

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

  renderRow = (
    item,
    i,
    left = "left",
    right = "right",
    leftIcon = "leftIcon",
    rightIcon = "rightIcon"
  ) => {
    const { multiSelect, max } = this.props;
    if (max && i >= max) {
      return null;
    }

    return (
      <Row
        className={`line`}
        key={i}
        onClick={event => this.onClick(event, item, i)}
      >
        <Column xs={right ? 6 : 12} className="left">
          {this.display(left, item)}
          {this.displayIcon(leftIcon, item)}
        </Column>
        {right ? (
          <Column xs={6} className="right">
            <Content>
              {this.display(right, item)}
              {this.displayIcon(rightIcon, item)}
            </Content>
          </Column>
        ) : null}
      </Row>
    );
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
          return this.renderRow(item, i, left, right, leftIcon, rightIcon);
        });
      } else {
        dataElement = this.renderRow(data.join(", "), 1, null, null);
      }
    } else if (data && typeof data === "object") {
      dataElement = this.renderRow(data, 1, left, right, leftIcon, rightIcon);
    } else if (data) {
      dataElement = this.renderRow(data, 1, null, null);
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
          <Row className="head" onClick={() => onClickHead && onClickHead()}>
            <Column>
              <Content>{head}</Content>
            </Column>
          </Row>
        ) : null}
        {this.getDataElement(left, right, leftIcon, rightIcon, data)}
      </div>
    );
  }
}

export default DataList;
