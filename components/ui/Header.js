import React from 'react'
import Router from 'next/router'

// Layout
import {
	Row,
	Column,
	Content
} from '../layout'

// ui
import {
	Title,
	ButtonIcon,
	ContextMenu
} from '../ui'

class Header extends React.Component {

	goBack = () => {
		Router.push('/')
	}

	render () {
	    return (
			<Row
				className="header"
				alignXs="center"
				valignXs="middle">
				<Column autoXs>
					<Content>
						{this.props.close
							&& <ButtonIcon
							className="close"
							icon="close"
							onClick={() => this.goBack()}
							dark/>}
						<Title>{this.props.title}</Title>
						<ContextMenu
							actions={this.props.menu}
							right />
					</Content>
				</Column>
			</Row>
	    )
	}
}

export default Header