import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

// Redux
import rootReducer from "../Redux";

// Reduceurs
import WeatherActions from '../Redux/WeatherRedux'
import TrainActions from '../Redux/TrainRedux'
import NewsActions from '../Redux/NewsRedux'
import DataActions from '../Redux/DataRedux'

// Components
import Weather from '../components/Weather'
import Train from '../components/Train'
import News from '../components/News'
import EditableList from '../components/EditableList'

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
				<Weather/>
				<Train/>
				<News/>
				<EditableList name="notes" />
			</div>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)