import React from 'react'
import Router from 'next/router'
import Link from 'next/link'

// ui
import {
	Title,
	AppIcon
} from '../ui'

class Header extends React.Component {

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
		const open = (this.state.open === null) ? '' : (this.state.open) ? 'open' : 'close'
	    return (
	    	<div className={`menu-bottom ${open}`}>
	    		<div className="items">
	    			{this.props.current !== 'train' ?
						<Link prefetch href="/train">
							<a className="item">
				    			<AppIcon
									className={`${process.env.COLOR_TRAIN} item`}
									name="train" />
							</a>
						</Link>
					: null}
	    			{this.props.current !== 'weather' ?
						<Link prefetch href="/weather">
							<a className="item">
				    			<AppIcon
									className={`${process.env.COLOR_WEATHER} item`}
									name="wb_sunny" />
							</a>
						</Link>
					: null}
	    			{this.props.current !== 'news' ?
						<Link prefetch href="/news">
							<a className="item">
				    			<AppIcon
									className={`${process.env.COLOR_NOTE} item`}
									name="assignment" />
							</a>
						</Link>
					: null}
	    			{this.props.current !== 'notes' ?
						<Link prefetch href="/notes">
							<a className="item">
				    			<AppIcon
									className={`${process.env.COLOR_NEWS} item`}
									name="note_add" />
							</a>
						</Link>
					: null}
	    		</div>
	    		<div ref="main">
					<AppIcon
						className="red main visible-close"
						name="apps"
						onClick={(event) => this.toggleMenu(event)} />
					<AppIcon
						className="red main visible-open"
						name="add"
						onClick={(event) => this.toggleMenu(event)} />
				</div>
			</div>
	    )
	}
}

export default Header