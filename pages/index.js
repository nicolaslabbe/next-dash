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
import { Header, AppIcon } from '../components/ui'
import { Row, Column, Content } from '../components/layout'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		return {}
	}

	render () {
    	return (
    		<div>
				<Header
					title="index"/>
				<Row>
					<Column>
    					<Content>
    						<Link prefetch href="/train">
    							<a>
									<AppIcon
										className={`${process.env.COLOR_TRAIN}`}
										name="train" />
								</a>
							</Link>
    					</Content>
					</Column>
					<Column>
    					<Content>
    						<Link prefetch href="/weather">
    							<a>
									<AppIcon
										className={`${process.env.COLOR_WEATHER}`}
										name="wb_sunny" />
								</a>
							</Link>
						</Content>
					</Column>
					<Column>
    					<Content>
    						<Link prefetch href="/news">
    							<a>
									<AppIcon
										className={`${process.env.COLOR_NOTE}`}
										name="assignment" />
								</a>
							</Link>
						</Content>
					</Column>
					<Column>
    					<Content>
    						<Link prefetch href="/notes">
    							<a>
									<AppIcon
										className={`${process.env.COLOR_NEWS}`}
										name="note_add" />
								</a>
							</Link>
						</Content>
					</Column>
				</Row>
			</div>
    	)
	}
}

export default withRedux(rootReducer, state => state)(
  withReduxSaga(Page)
)