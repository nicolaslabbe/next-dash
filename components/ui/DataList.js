import React from "react";
import { connect } from "react-redux";

// Layout
import { Row, Column, Content } from "../layout";

import { Icon } from "../ui";

class DataList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      multiSelect: false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.state.multiSelect && !nextProps.multiSelect) {
      this.setState({
        selected: [],
        multiSelect: nextProps.multiSelect
      });
    } else if (!this.state.multiSelect && nextProps.multiSelect) {
      this.setState({
        multiSelect: nextProps.multiSelect
      });
    }
  };

  onSelect = (event, item, i) => {
    var index = this.state.selected.indexOf(i);
    var selected = [];
    if (index > -1) {
      this.state.selected.splice(index, 1);
      selected = this.state.selected;
    } else {
      selected = [...this.state.selected, i];
    }
    this.setState({
      selected
    });
    this.props.onSelectedChange && this.props.onSelectedChange(selected);
  };

  onClick = (event, item, i) => {
    const { onClick } = this.props;
    onClick && onClick(item, i);
  };

  onClickIcon = (event, item, i) => {
    event.stopPropagation();
    const { onClickIcon } = this.props;
    onClickIcon && onClickIcon(item, i);
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

  renderRow = (item, i, left, right, leftIcon, rightIcon) => {
    const { multiSelect, max } = this.props;
    if (max && i >= max) {
      return null;
    }
    var selected = this.state.selected.indexOf(i) >= 0;

    return (
      <Row
        className={`line ${selected ? "selected" : null}`}
        key={i}
        onClick={event => (multiSelect ? this.onSelect(event, item, i) : this.onClick(event, item, i))}
      >
        <Column xs={right ? 6 : 12} className="left">
          <Content>
            {multiSelect ? (
              selected ? (
                <Icon name="check_box" />
              ) : (
                <Icon name="check_box_outline_blank" />
              )
            ) : null}
            {this.display(left, item)}
            {this.displayIcon(leftIcon, item)}
          </Content>
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

  getDataElement = (left, right, leftIcon, rightIcon, data) => {
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
      dataElement = data.map((item, i) => {
        return this.renderRow(item, i, left, right, leftIcon, rightIcon);
      });
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
