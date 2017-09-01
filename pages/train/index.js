import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import TrainActions from '../../Redux/TrainRedux'

// Components
import Train from '../../components/Train'
import { Header, MenuBottom } from '../../components/ui'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(TrainActions.trainRequest(JSON.parse(process.env.TRAIN_STOPS)))
		return {}
	}

	render () {
    	return (
			<div>
				<Header
					title="train"
					close />
				<Train/>
				<MenuBottom
					current="train" />
			</div>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)