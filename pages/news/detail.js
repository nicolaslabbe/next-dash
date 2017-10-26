import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Link from 'next/link'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import NewsActions from '../../Redux/NewsRedux'

// Components
// import News from '../../components/News'
import { Header, MenuBottom } from '../../components/ui'
import { News } from '../../components/rich'
import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(NewsActions.newsRequest())
		return {}
	}

	render () {
		const { articles } = this.props

    	return (
			<div className="news">
				<Header
					title="news"
					close />
					{articles
						? <News
							detail={false}
							items={articles} />
						: null}
				<MenuBottom
					items={[{
						name: 'favorites',
						icon: 'stars',
						path: '/news/favorites'
					}]} />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    articles: state.news.articles || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)