import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Link from 'next/link'

// Redux
import rootReducer from "../Redux";

// Reduceurs
import WeatherActions from '../Redux/WeatherRedux'
import TrainActions from '../Redux/TrainRedux'
import NewsActions from '../Redux/NewsRedux'
import DataActions from '../Redux/DataRedux'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(WeatherActions.weatherRequest())
		store.dispatch(TrainActions.trainRequest())
		store.dispatch(NewsActions.newsRequest())
		store.dispatch(DataActions.dataRequest('notes'))
		return {}
	}

	render () {
    	return (
			<div>
				<ul>
					<li><Link href="/train"><a>train</a></Link></li>
					<li><Link href="/news"><a>news</a></Link></li>
					<li><Link href="/weather"><a>weather</a></Link></li>
					<li><Link href="/notes"><a>notes</a></Link></li>
				</ul>
			</div>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)