import React from 'react'
import { connect } from 'react-redux'

import Utils from "../Utils"
import DataActions from '../Redux/DataRedux'

class EditableList extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  handleChange(event) {
    this.setState({
      currentValue: event.target.value
    })
  }

  handleSave() {
    this.props.save(this.props.name, {
      title: this.state.currentValue
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
      <div>
      <h2>{name}</h2>
      <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => this.handleRemoveAll()}>Delete All</span>
      {items
        ? items.map((item, i) => {
          return <ul key={i}>
              <li>
                {item.title}
                <span style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => this.handleRemove(item.id)}>x</span>
              </li>
          </ul>
        })
        : null}
        <input type="text" onChange={(event) => this.handleChange(event)} />
        <input type="submit" onClick={() => this.handleSave()} />
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