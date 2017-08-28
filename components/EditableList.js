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
  
    this.state = {};
  }

  handleClick(item, i) {
    this.props.onClick(item, i)
  }

  handleSubmit(value) {
    this.props.onSave(this.props.name, {
      title: value
    })
  }

  handleRemove(item) {
    this.props.onRemove(this.props.name, item.id)
  }

  handleRemoveAll() {
    this.props.onRemoveAll(this.props.name)
  }

  render () {
    const { name, data } = this.props
    return (
      <div className="editable-list">
        <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => this.handleRemoveAll()}>Delete All</span>

        <DataList
          data={data}
          left="title"
          icon="close"
          onClick={(item, i) => this.handleClick(item, i)}
          onClickIcon={(item) => this.handleRemove(item)} />
        <BottomInput
          onSubmit={(value) => this.handleSubmit(value)} />
      </div>
    )
  }
}

export default EditableList