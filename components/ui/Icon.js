import React from 'react'

class Icon extends React.Component {
  render () {
  	const { className } = this.props
  	var style = {}
  	this.props.color ? style.color = this.props.color : null
  	this.props.size ? style.fontSize = this.props.size : null
    return (
      <i className={`${className ? className : ''} icon material-icons ${
  			this.props.dark ? 'dark' : ''}`
	      	}
	  		style={style}>
      	{this.props.name}</i>
    )
  }
}

export default Icon