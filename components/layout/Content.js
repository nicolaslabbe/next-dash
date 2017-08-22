import React from 'react'

class Content extends React.Component {
  render () {
  	const { className } = this.props
    return (
		<div className={`${className ? className : ''} box-row`}>
			{this.props.children}
		</div>
    )
  }
}

export default Content