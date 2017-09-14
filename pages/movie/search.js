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
import { Header, MenuBottom, BottomInput } from '../../components/ui'
import { Movies } from '../../components/rich'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		return {}
	}

	handleSubmit = (item) => {
		
	}

	handleChange = (item) => {
		this.props.search(item)
	}

	render () {
		const { movies } = this.props

    	return (
			<div className="movie">
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
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    movies: state.movie.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (name) => dispatch(MovieActions.movieSearchRequest(name))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)