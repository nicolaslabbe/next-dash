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
import { Header, MenuBottom } from '../../components/ui'
import { News } from '../../components/rich'
import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(DataActions.dataRequest('favorites'))
		return {}
	}

	render () {
		const { favorites } = this.props

    	return (
			<div className="favorites">
				<Header
					title="favorite"
					close />
					{favorites
						? <News
							detail={false}
							delete={true}
							items={favorites} />
						: null}
				<MenuBottom />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    favorites: state.data.favorites || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)