import React from 'react'

// ui
import {
  Icon
} from '../ui'

class ButtonIcon extends React.Component {
  render () {
    const { className } = this.props
    return (
      <div
        className={`${className ? className : ''} button-icon ${
      			this.props.dark ? 'dark' : ''}`
      	}
        onClick={() => this.props.onClick && this.props.onClick()}>
      	 <Icon name={this.props.icon} />
        </div>
    )
  }
}

export default ButtonIcon