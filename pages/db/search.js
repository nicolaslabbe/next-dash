import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import DbActions from '../../Redux/DbRedux'

// Components
import { Header, MenuBottom, BottomInput, ScrollView } from '../../components/ui'
import { Cards } from '../../components/rich'

class Page extends React.Component {
	constructor(props) {
		super(props);
  
		this.state = {
			page: 1,
			fetching: false,
			value: ""
		}
	}

	static async getInitialProps ({ store, isServer, query }) {
		return {
			type: query.type
		}
	}

	handleSubmit = (item) => {
		
	}

	componentWillReceiveProps = (nextProps) => {
		if (!nextProps.fetching && this.state.fetching) {
			this.setState({
				fetching: false
			})
		}
	}

	handlePagination = (item) => {
		if (!this.props.fetching) {
			this.setState({
				page: this.state.page + 1,
				fetching: true
			})
			this.props.find(this.props.type, this.state.value, this.state.page + 1)
		}
	}

	handleChange = (item) => {
		this.setState({
			value: item,
			page: 1,
			fetching: true
		})
		this.props.find(this.props.type, item, 1)
	}

	render () {
		const { search } = this.props
		const type = this.props.url.query.type
		const fetching = (search[this.props.type] && search[this.props.type].fetching) || false

    	return (
			<ScrollView
				loading={fetching}
				onScrollEnd={() => this.handlePagination()}
				className="movie">
				<Header
					title="movie"
					close />
					{search[this.props.type]
						? <Cards
							detail={false}
							type={type}
							items={search[this.props.type].items} />
						: null}
		        <BottomInput
		          onChange={(value) => this.handleChange(value)}
		          onSubmit={(value) => this.handleSubmit(value)} />
				<MenuBottom
					current="news" />
			</ScrollView>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    search: state.db.search || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    find: (type, name, page) => dispatch(DbActions.dbSearchRequest(type, name, page))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)