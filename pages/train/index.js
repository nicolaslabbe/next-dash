import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Router from 'next/router'

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

	goToDetail = (item, i, j) => {
		Router.push(`/train/detail?stationId=${i}&stopId=${j}`)
	}

	render () {
    	return (
			<div>
				<Header
					title="train"
					close />
				{this.props.stations
					? this.props.stations.map((station, i) => {
						return station.map((item, j) => {
							return <div key={j}>
							<DataList
								head={`${this.cleanText(item.station)} / ${this.cleanText(item.terminus)}`}
								onClickHead={() => this.goToDetail(item, i, j)}
								ref="dataList"
								max="2"
								multiSelect={false}
								data={item.departures}
								left={(key, item) => Utils.date.remaining(item.time)}
								onClick={(item, i, j) => this.handleClick(item, i, j)} />
							</div>
						})
					})
					: null}
				<MenuBottom />
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