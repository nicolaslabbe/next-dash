import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import Utils from "../../Utils"

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import TrainActions from '../../Redux/TrainRedux'

// Components
import { Header, MenuBottom } from '../../components/ui'

// ui
import {
  DataList
} from '../../components/ui'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(TrainActions.trainRequest(JSON.parse(process.env.TRAIN_STOPS)))
		return {}
	}

	cleanText = (text) => {
		return text.replace(/\(.*?\)/g, '')
	}

	render () {
		console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
		console.log('this.props', this.props)
		// this.props.stations[this.props.url.query.stationId][this.props.url.query.stopId]
		const direction = this.props.stations
			? this.props.url.query.stationId
				? this.props.url.query.stopId
					? this.props.stations[this.props.url.query.stationId][this.props.url.query.stopId]
					: null
				: null
			: null
		console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
		console.log('direction', direction)
    	return (
			<div>
				{direction
					? <Header
						title={`${this.cleanText(direction.station)} / ${this.cleanText(direction.terminus)}`}
						close />
					:null}
				{direction
					? <DataList
						ref="dataList"
						multiSelect={false}
						data={direction.departures}
						left={(key, item) => Utils.date.remaining(item.time)}
						onClick={(item, i) => this.handleClick(item, i)} />
					: null}
				<MenuBottom
					current="train" />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    stations: state.train.stations || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)