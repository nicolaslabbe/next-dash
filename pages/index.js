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

// Components
import { Header } from '../components/ui'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		return {}
	}

	render () {
    	return (
			<div>
				<Header
					title="index"/>
				<ul>
					<li><Link prefetch href="/train"><a>train</a></Link></li>
					<li><Link prefetch href="/news"><a>news</a></Link></li>
					<li><Link prefetch href="/weather"><a>weather</a></Link></li>
					<li><Link prefetch href="/notes"><a>notes</a></Link></li>
				</ul>
			</div>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)