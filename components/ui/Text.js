import React from 'react'

class Text extends React.Component {
  render () {
    return (
    	<div className="text">
        {this.props.children}
      </div>
    )
  }
}

export default Text