import React from 'react'

class ButtonText extends React.Component {
  render () {
    const { className } = this.props
    return (
      <div
        className={`${className ? className : ''} button-text ${
      			this.props.color ? this.props.color : null}`
      	}
        onClick={(e) => this.props.onClick && this.props.onClick(e)}>
          {this.props.children}
        </div>
    )
  }
}

export default ButtonText