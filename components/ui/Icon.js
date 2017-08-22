import React from 'react'

class Icon extends React.Component {
  render () {
  	const { className } = this.props
    return (
      <i className={`${className ? className : ''} icon material-icons ${
      			this.props.dark ? 'dark' : ''}`
      	}>
      	{this.props.name}</i>
    )
  }
}

export default Icon