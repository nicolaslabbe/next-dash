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
import { Header, MenuBottom, Card, TextsIcon } from '../../components/ui'
import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(DataActions.dataRequest('upcoming-movies'))
		return {}
	}

	removeLink = (favorite) => {
		this.props.remove('upcoming-movies', favorite.id)
	}

	openLink = (favorite) => {
		if (typeof window !== 'undefined') {
			window.open(favorite)
		}
	}

	render () {
		const { favorites } = this.props
    	return (
			<div className="favorites">
				<Header
					title="upcoming movie"
					close />
					{favorites
						? favorites.map((favorite, i) => {
							return <Card
								key={i}
								icon="assignment"
								title={favorite.original_title}
								description={favorite.overview}
								date={Utils.date.timestampToHumain(favorite.publishedAt)}
								actions={[{
									name: 'open',
									fn: () => this.openLink(favorite)
								},
								{
									name: 'delete',
									fn: () => this.removeLink(favorite)
								}]}
								image={favorite.poster.sm}>
									<TextsIcon
										items={[{
											icon: 'mode_comment',
											text: favorite.vote_average
										},
										{
											icon: 'access_time',
											text: favorite.release_date
										},
										{
											icon: 'favorite_border',
											text: Math.round(favorite.popularity * 100) / 100
										}]} />
								</Card>
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
    favorites: state.data['upcoming-movies'] || []
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