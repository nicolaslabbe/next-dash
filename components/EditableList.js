import React from 'react'
import { connect } from 'react-redux'

import Utils from "../Utils"
import DataActions from '../Redux/DataRedux'

// ui
import {
  DataList,
  BottomInput
} from './ui'

class EditableList extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      selectedIds: []
    };
  }

  handleClick(item, i) {
    this.props.onClick(item, i)
  }

  handleSubmit(value) {
    this.props.onSave(this.props.name, {
      title: value
    })
  }

  handleSelectedChange(selected) {
    this.setState({
      selectedIds: selected.map((i) => {
        return this.props.data[i].id
      })
    })
  }

  render () {
    const { name, data } = this.props
    return (
      <div className="editable-list">
        <DataList
          ref="dataList"
          multiSelect={this.props.multiSelect}
          onSelectedChange={(selected) => this.handleSelectedChange(selected)}
          data={data}
          left="title"
          onClick={(item, i) => this.handleClick(item, i)} />
        <BottomInput
          onSubmit={(value) => this.handleSubmit(value)} />
      </div>
    )
  }
}

export default EditableList