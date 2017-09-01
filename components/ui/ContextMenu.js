import React from 'react'
import Router from 'next/router'

class ContextMenu extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	open: null,
	  	windowClick: this.handleClick.bind(this)
	  }
	}

	handleClick = (e) => {
		if (!this.refs.main.contains(e.target) && this.state.open) {
			this.toggleMenu()
		}
    }

    componentWillMount = () => {
    	if (typeof document !== 'undefined') {
    		document.addEventListener('click', this.state.windowClick, false);
    	}
    }

    componentWillUnmount = () => {
    	if (typeof document !== 'undefined') {
    		debugger
    		document.removeEventListener('click', this.state.windowClick, false);
    	}
    }

	toggleMenu = (event) => {
		this.setState({
			open: !this.state.open
		})
	}

	render () {
		const open = (this.state.open === null) ? '' : (this.state.open) ? 'context-menu-open' : 'context-menu-close'

	    return (
			<div
				ref="main"
				className={`context-menu ${open} ${this.props.right ? 'right' : null}`}
				onClick={() => this.toggleMenu()}>
				<div className={`context-menu-actions ${this.props.right ? 'right' : null}`}>
					{this.props.actions && this.props.actions.map((action, i) => {
						return <div
							className="context-menu-action"
							onClick={() => action.fn()}
							key={i}>
							{action.name}
						</div>
					})}
				</div>
			</div>
	    )
	}
}

export default ContextMenu