import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Link from 'next/link'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import NewsActions from '../../Redux/NewsRedux'

// Components
import News from '../../components/News'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(NewsActions.newsRequest())
		return {}
	}

	render () {
    	return (
			<div>
				<Link href="/"><a>back</a></Link>
				<News/>
			</div>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)