import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Link from 'next/link'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import MovieActions from '../../Redux/MovieRedux'
import DataActions from '../../Redux/DataRedux'

// Components
import { Header, MenuBottom, Card } from '../../components/ui'
import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(MovieActions.movieSearchRequest())
		return {}
	}

	saveLink = (article) => {
		this.props.save('favorites', article)
	}

	openLink = (item) => {
		if (typeof window !== 'undefined') {
			window.open(item)
		}
	}

	render () {
		const { searchResult } = this.props

    	return (
			<div className="movie">
				<Header
					title="movie"
					close />
					{searchResult
						? searchResult.map((item, i) => {
							return <Card
								key={i}
								icon="assignment"
								title={item.original_title}
								description={item.overview}
								date={Utils.date.timestampToHumain(item.publishedAt)}
								actions={[{
									name: 'open',
									fn: () => this.openLink(item)
								},
								{
									name: 'save',
									fn: () => this.saveLink(item)
								}]}
								image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}>
									vote_average: {item.vote_average}<br />
									release_date: {item.release_date}<br />
									popularity: {item.popularity}<br />
								</Card>
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
    searchResult: state.movie.searchResult || []
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