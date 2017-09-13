import React from 'react'
import moment from 'moment'
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
import { Header, MenuBottom, Card, TextsIcon, DataList, Video } from '../../components/ui'
import Utils from "../../Utils"

class Page extends React.Component {
	static async getInitialProps ({ store, isServer, query }) {
		store.dispatch(MovieActions.movieDetailRequest(query.id))
		return {}
	}

	saveLink = (article) => {
		this.props.save('upcoming-movies', article)
	}

	openLink = (item) => {
		if (typeof window !== 'undefined') {
			window.open(item)
		}
	}

	render () {
		const { movie } = this.props
		if (movie) {
			console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
			console.log('movie', movie)
		}

    	return (
			<div className="movie">
				<Header
					title="movie"
					close />
					{movie
						? <Card
							icon="assignment"
							title={movie.original_title}
							description={movie.overview}
							date={Utils.date.timestampToHumain(movie.publishedAt)}
							actions={[{
								name: 'open',
								fn: () => this.openLink(movie)
							},
							{
								name: 'save',
								fn: () => this.saveLink(movie)
							}]}
							image={movie.poster.md}>
						        <DataList
						          head={`Genres`}
						          data={movie.genres}
						          left="name"  />
						        <DataList
						          head={`Production`}
						          data={movie.production_companies}
						          left="name"  />
						        <DataList
						          head={`Status`}
						          data={[{
						          	name: 'status',
						          	info: movie.status
						          },
						          {
						          	name: 'date',
						          	info: movie.release_date
						          },
						          {
						          	name: 'runtime',
						          	info: `${moment.duration(movie.runtime, 'minutes').hours()}:${moment.duration(movie.runtime, 'minutes').minutes()}`
						          },
						          {
						          	name: 'vote',
						          	info: movie.vote_average + ""
						          },
						          {
						          	name: 'popularity',
						          	info: Math.round(movie.popularity * 100) / 100
						          },
						          {
						          	name: 'budget',
						          	info: movie.budget + ""
						          }]}
						          left="name"
						          right="info"  />
						        {movie.videos && movie.videos.map((video, i) => {
					        		return <Video key={i} id={video.key} type={video.site} />
					        	})}
							</Card>
						: null }
				<MenuBottom />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie.detail
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