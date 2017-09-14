import React from 'react'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Router from 'next/router'
import Link from 'next/link'
// Redux
import rootReducer from "../../Redux";

// Reduceurs
import MovieActions from '../../Redux/MovieRedux'
import DataActions from '../../Redux/DataRedux'

import Utils from "../../Utils"
import { Card, TextsIcon } from '../../components/ui'

class Movies extends React.Component {

	save = (article) => {
		this.props.save('upcoming-movies', article)
	}

	delete = (article) => {
		this.props.remove('upcoming-movies', article.apiId)
	}

	openLink = (item) => {
		if (typeof window !== 'undefined') {
			window.open(item)
		}
	}

	goToDetail = (e, item, i) => {
		this.props.movieDetail(item.id)
		Router.push(`/movie/detail?id=${item.id}`)
	}

	render () {
		const { movies } = this.props

	    return (
			<div className="movie">
				{movies
					? movies.map((item, i) => {
						return <Card
							key={i}
							icon="assignment"
							title={item.original_title}
							date={Utils.date.timestampToHumain(item.publishedAt)}
							onClick={(e) => this.goToDetail(e, item, i)}
							actions={[{
								name: 'open',
								fn: () => this.openLink(item)
							},
							{
								name: this.props.delete ? 'delete' : 'save',
								fn: () => this.props.delete ? this.delete(item) : this.save(item)
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
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (name, item) => dispatch(DataActions.dataAdd(name, item)),
    remove: (name, id) => dispatch(DataActions.dataRemove(name, id)),
    movieDetail: (id) => dispatch(MovieActions.movieDetailRequest(id))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Movies)
)