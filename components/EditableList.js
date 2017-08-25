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

  handleSubmit(value) {
    this.props.save(this.props.name, {
      title: value
    })
  }

  handleRemove(id) {
    this.props.remove(this.props.name, id)
  }

  handleRemoveAll() {
    this.props.removeAll(this.props.name)
  }

  render () {
    const { name, data } = this.props
    const items = data[name] || []
    return (
      <div className="editable-list">
        <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => this.handleRemoveAll()}>Delete All</span>

        <DataList data={items}
          left="title"
          icon="close"
          onClick={(item) => this.handleRemove(item.id)} />
        <BottomInput
          onSubmit={(value) => this.handleSubmit(value)} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (name, item) => dispatch(DataActions.dataAdd(name, item)),
    remove: (name, id) => dispatch(DataActions.dataRemove(name, id)),
    removeAll: (name, id) => dispatch(DataActions.dataRemoveAll(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableList)