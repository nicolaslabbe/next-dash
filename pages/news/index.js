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
import DataActions from '../../Redux/DataRedux'

// Components
// import News from '../../components/News'
import { Header, MenuBottom, Card } from '../../components/ui'
import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(NewsActions.newsRequest())
		return {}
	}

	saveLink = (article) => {
		this.props.save('favorites', article)
	}

	openLink = (article) => {
		if (typeof window !== 'undefined') {
			window.open(article)
		}
	}

	render () {
		const { articles } = this.props

    	return (
			<div className="news">
				<Header
					title="news"
					close />
					{articles
						? articles.map((article, i) => {
							return <Card
								key={i}
								icon="assignment"
								title={article.title}
								description={article.description}
								date={Utils.date.timestampToHumain(article.publishedAt)}
								actions={[{
									name: 'open',
									fn: () => this.openLink(article)
								},
								{
									name: 'save',
									fn: () => this.saveLink(article)
								}]}
								image={article.urlToImage} />
						})
						: null}
				<MenuBottom
					current="news" />
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
    save: (name, item) => dispatch(DataActions.dataAdd(name, item))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)