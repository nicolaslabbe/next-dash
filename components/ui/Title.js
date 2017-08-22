import React from 'react'

class Title extends React.Component {
  render () {
    return (
    	<div className="title">
        {this.props.children}
      </div>
    )
  }
}

export default Title