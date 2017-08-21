import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Link from 'next/link'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import DataActions from '../../Redux/DataRedux'

// Components
import EditableList from '../../components/EditableList'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(DataActions.dataRequest('notes'))
		return {}
	}

	render () {
    	return (
			<div>
				<Link href="/"><a>back</a></Link>
				<EditableList name="notes" />
			</div>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)