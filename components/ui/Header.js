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
	Button
} from '../ui'

class Header extends React.Component {

	goBack = () => {
		Router.back()
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
						&& <Button
						className="close"
						icon="close"
						onClick={() => this.goBack()}
						dark/>}
					<Title>{this.props.title}</Title>
				</Content>
			</Column>
		</Row>
    )
  }
}

export default Header