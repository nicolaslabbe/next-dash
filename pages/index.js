import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import WeatherActions from '../Redux/WeatherRedux'
import Weather from '../components/Weather'

import rootReducer from "../Redux";

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
		// console.log('ctx', ctx)
		store.dispatch(WeatherActions.weatherRequest())
		return {}
	}

	render () {
    	return (
			<Weather/>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)