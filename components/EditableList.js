import React from "react";
import { connect } from "react-redux";

import Utils from "../Utils";

// ui
import { DataList, BottomInput } from "./ui";

class EditableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIds: [],
      data: []
    };
  }

  handleClick(item, i) {
    this.props.onClick(item, i);
  }

  handleSubmit(value) {
    this.props.onSave(this.props.name, {
      title: value
    });
  }

  handleSelectedChange(selected) {
    this.setState({
      selectedIds: selected.map(i => {
        return this.props.data[i].apiId;
      })
    });
  }

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.data &&
      this.state.data &&
      nextProps.data.length !== this.state.data.length
    ) {
      this.setState({
        data: nextProps.data
      });
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 10);
    }
  };

  render() {
    const { name, data } = this.props;
    return (
      <div className="editable-list">
        <DataList
          ref="dataList"
          multiSelect={this.props.multiSelect}
          onSelectedChange={selected => this.handleSelectedChange(selected)}
          data={data}
          left="title"
          onClick={(item, i) => this.handleClick(item, i)}
        />
        <BottomInput onSubmit={value => this.handleSubmit(value)} />
      </div>
    );
  }
}

export default EditableList;
