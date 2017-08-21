import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Link from 'next/link'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import WeatherActions from '../../Redux/WeatherRedux'

// Components
import Weather from '../../components/Weather'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(WeatherActions.weatherRequest())
		return {}
	}

	render () {
    	return (
			<div>
				<Link href="/"><a>back</a></Link>
				<Weather/>
			</div>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)