import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import MovieActions from '../../Redux/MovieRedux'

// Components
import { Header, MenuBottom, BottomInput, ScrollView } from '../../components/ui'
import { Movies } from '../../components/rich'

class Page extends React.Component {
	constructor(props) {
		super(props);
  
		this.state = {
			page: 1,
			fetching: false,
			value: ""
		}
	}

	static async getInitialProps ({ store, isServer }) {
		return {}
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
			this.props.search(this.state.value, this.state.page + 1)
		}
	}

	handleChange = (item) => {
		this.setState({
			value: item,
			page: 1,
			fetching: true
		})
		this.props.search(item, 1)
	}

	render () {
		const { movies } = this.props
		const { fetching } = this.state
		console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
		console.log('fetching', fetching, movies.length)

    	return (
			<ScrollView
				loading={fetching}
				onScrollEnd={() => this.handlePagination()}
				className="movie">
				<Header
					title="movie"
					close />
					{movies
						? <Movies movies={this.props.movies} />
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
    movies: state.movie.search,
    fetching: state.movie.fetchingSearch || false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (name, page) => dispatch(MovieActions.movieSearchRequest(name, page))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)