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
import { Header, MenuBottom, Card } from '../../components/ui'
import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(DataActions.dataRequest('favorites'))
		return {}
	}

	removeLink = (article) => {
		this.props.remove('favorites', article.id)
	}

	openLink = (article) => {
		if (typeof window !== 'undefined') {
			window.open(article)
		}
	}

	render () {
		const { favorites } = this.props

    	return (
			<div className="favorites">
				<Header
					title="favorite"
					close />
					{favorites
						? favorites.map((article, i) => {
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
									name: 'delete',
									fn: () => this.removeLink(article)
								}]}
								image={article.urlToImage} />
						})
						: null}
				<MenuBottom
					current="favorites" />
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
    remove: (name, id) => dispatch(DataActions.dataRemove(name, id))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)