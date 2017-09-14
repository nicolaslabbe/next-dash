import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import DataActions from '../../Redux/DataRedux'

// Components
import { Header, MenuBottom } from '../../components/ui'
import { Movies } from '../../components/rich'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(DataActions.dataRequest('upcoming-movies'))
		return {}
	}

	render () {
		const { movies } = this.props
		console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
		console.log('movies', movies)
    	return (
			<div className="favorites">
				<Header
					title="upcoming movie"
					close />
					{movies
						? <Movies
							delete={true}
							movies={movies} />
						: null}
				<MenuBottom
					current="favorites" />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    movies: state.data['upcoming-movies'] || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)