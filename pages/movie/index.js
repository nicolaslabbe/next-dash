import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Link from 'next/link'
import Router from 'next/router'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import MovieActions from '../../Redux/MovieRedux'
import DataActions from '../../Redux/DataRedux'

// Components
import { Header, MenuBottom, Card, TextsIcon } from '../../components/ui'
import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(MovieActions.discoverRequest())
		return {}
	}

	handleScroll() {
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;
		if (windowBottom >= docHeight) {
			this.setState({
				message:'bottom reached'
			});
		} else {
			this.setState({
				message:'not at bottom'
			});
		}
	}

	saveLink = (article) => {
		this.props.save('upcoming-movies', article)
	}

	openLink = (item) => {
		if (typeof window !== 'undefined') {
			window.open(item)
		}
	}

	goToDetail = (item) => {
		this.props.movieDetail(item.id)
		Router.push(`/movie/detail?id=${item.id}`)
	}

	render () {
		const { movies } = this.props

    	return (
			<div className="movie">
				<Header
					title="movie"
					close />
					{movies
						? movies.map((item, i) => {
							return <Card
								key={i}
								icon="assignment"
								title={item.original_title}
								date={Utils.date.timestampToHumain(item.publishedAt)}
								onClick={() => this.goToDetail(item, i)}
								actions={[{
									name: 'open',
									fn: () => this.openLink(item)
								},
								{
									name: 'save',
									fn: () => this.saveLink(item)
								}]}
								image={item.poster.sm}>
									<TextsIcon
										items={[{
											icon: 'mode_comment',
											text: item.vote_average
										},
										{
											icon: 'access_time',
											text: item.release_date
										},
										{
											icon: 'favorite_border',
											text: Math.round(item.popularity * 100) / 100
										}]} />
								</Card>
						})
						: null}
				<MenuBottom
					items={[{
						name: 'favorites',
						icon: 'stars',
						path: '/movie/favorites'
					}]} />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    movies: state.movie.discover || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (name, item) => dispatch(DataActions.dataAdd(name, item)),
    movieDetail: (id) => dispatch(MovieActions.movieDetailRequest(id))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)