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
import { Header, MenuBottom, ScrollView } from '../../components/ui'
import { Movies } from '../../components/rich'

class Page extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	page: 1
	  }
	}

	static async getInitialProps ({ store, isServer }) {
		store.dispatch(MovieActions.discoverRequest(1))
		return {}
	}

	discover = () => {
      this.setState({
        page: this.state.page + 1
      })
      this.props.discoverMore(this.state.page + 1)
	}

	render () {
		const { movies } = this.props

    	return (
			<ScrollView
				onScrollEnd={() => this.discover()}
				className="movie">
				<Header
					title="movie"
					close />
					{movies
						? <Movies movies={this.props.movies} />
						: null}
				<MenuBottom
					items={[{
						name: 'favorites',
						icon: 'stars',
						path: '/movie/favorites'
					},
					{
						name: 'search',
						icon: 'search',
						path: '/movie/search'
					}]} />
			</ScrollView>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    movies: state.movie.discover
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    discoverMore: (page) => dispatch(MovieActions.discoverRequest(page))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)