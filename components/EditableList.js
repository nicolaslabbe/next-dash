import React from 'react'
import { connect } from 'react-redux'

import Utils from "../Utils"
import DataActions from '../Redux/DataRedux'

// ui
import {
  DataList,
  BottomInput,
  Modal
} from './ui'

class EditableList extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      modalVisible: false,
      multiSelect: false
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

  handleRemove(item) {
    this.props.onRemove(this.props.name, item.id)
  }

  handleConfirmDelete() {
    this.setState({modalVisible: true})
  }

  handleDeleteAll() {
    this.setState({ multiSelect: false })
    var ids = this.refs.dataList.state.selected.map((i) => {
      return this.props.data[i].id
    })
    if (ids.length > 0) {
      this.props.onRemove(this.props.name, ids)
    }
    this.setState({ modalVisible: false })
  }

  render () {
    const { name, data } = this.props
    return (
      <div className="editable-list">
        {!this.state.multiSelect
          ? <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => this.setState({ multiSelect: true })}>Edit</span>
          : null}
        {this.state.multiSelect
          ? <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={(ids) => this.handleConfirmDelete()}>Delete</span>
          : null}
        <DataList
          ref="dataList"
          multiSelect={this.state.multiSelect}
          data={data}
          left="title"
          onClick={(item, i) => this.handleClick(item, i)} />
        <BottomInput
          onSubmit={(value) => this.handleSubmit(value)} />
        <Modal
          ref="modal"
          visible={this.state.modalVisible}
          onCancel={(() => this.setState({ modalVisible: false }))}
          onValid={(() => this.handleDeleteAll())} />
      </div>
    )
  }
}

export default EditableList