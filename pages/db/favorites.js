import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import DataActions from '../../Redux/DataRedux'

// Components
import { Header, MenuBottom } from '../../components/ui'
import { Cards } from '../../components/rich'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer, query }) {
		store.dispatch(DataActions.dataRequest(query.type))
		return {
			type: query.type
		}
	}

	render () {
		const { data } = this.props
		const type = this.props.url.query.type

    	return (
			<div className="favorites">
				<Header
					title="Favorites"
					close />
					{data[this.props.type]
						? <Cards
							type={type}
							detail={false}
							delete={true}
							items={data[this.props.type]} />
						: null}
				<MenuBottom
					current="favorites" />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
	data: state.data || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)