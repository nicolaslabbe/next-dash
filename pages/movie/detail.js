import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Link from 'next/link'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import MovieActions from '../../Redux/MovieRedux'

// Components
import { Header, MenuBottom, Card } from '../../components/ui'
import { Movies } from '../../components/rich'

import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer, query }) {
		store.dispatch(MovieActions.movieDetailRequest(query.id))
		return {}
	}

	render () {
		const { movie } = this.props

    	return (
			<div className="movie">
				<Header
					title="movie"
					close />
					{movie
						? <Movies
							detail={true}
							items={[movie]} />
						: null }
				<MenuBottom />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie.detail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)