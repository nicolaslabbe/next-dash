import React from 'react'

class Icon extends React.Component {
  render () {
    return (
      <i className="material-icon">{this.props.name}</i>
    )
  }
}

export default Icon