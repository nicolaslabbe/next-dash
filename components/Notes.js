import React from 'react'
import { connect } from 'react-redux'

import Utils from "../Utils"
import NotesActions from '../Redux/NotesRedux'

class Notes extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  handleChange(event) {
    this.setState({
      currentNote: event.target.value
    })
  }

  handleSave() {
    const index = (this.props.items.length > 0) ? this.props.items[this.props.items.length - 1].index + 1 : 0
    this.props.save({
      text: this.state.currentNote,
      index: index
    })
  }

  render () {
    const { items } = this.props
    return (
      <div>
      <h2>Notes</h2>
      {items
        ? items.map((item, i) => {
          return <ul key={i}>
              <li>{item.text}</li>
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
    items: state.notes.items || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (item) => dispatch(NotesActions.notesAdd(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)