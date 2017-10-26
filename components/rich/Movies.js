import React from 'react'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Router from 'next/router'
import Link from 'next/link'
import moment from 'moment'
// Redux
import rootReducer from "../../Redux";

// Reduceurs
import MovieActions from '../../Redux/MovieRedux'
import DataActions from '../../Redux/DataRedux'

import Utils from "../../Utils"
import { Card, TextsIcon, DataList, Video } from '../../components/ui'

class Movies extends React.Component {

	save = (item) => {
		this.props.save('upcoming-movies', item)
	}

	delete = (item) => {
		this.props.remove('upcoming-movies', item.apiId)
	}

	goToDetail = (item) => {
		this.props.detail(item.id)
		Router.push(`/movie/detail?id=${item.id}`)
	}

	getActions = (item) => {
		const { detail } = this.props
		return [{
			name: 'open',
			fn: () => this.goToDetail(item)
		},
		{
			name: this.props.delete ? 'delete' : 'save',
			fn: () => this.props.delete ? this.delete(item) : this.save(item)
		}]
	}

	getDetails = (item) => {
		return <div>
				<DataList
		          head={`Genres`}
		          data={item.genres}
		          left="name"  />
		        <DataList
		          head={`Production`}
		          data={item.production_companies}
		          left="name"  />
		        <DataList
		          head={`Status`}
		          data={[{
		          	name: 'status',
		          	info: item.status
		          },
		          {
		          	name: 'date',
		          	info: item.release_date
		          },
		          {
		          	name: 'runtime',
		          	info: `${moment.duration(item.runtime, 'minutes').hours()}:${moment.duration(item.runtime, 'minutes').minutes()}`
		          },
		          {
		          	name: 'vote',
		          	info: item.vote_average + ""
		          },
		          {
		          	name: 'popularity',
		          	info: Math.round(item.popularity * 100) / 100
		          },
		          {
		          	name: 'budget',
		          	info: item.budget + ""
		          }]}
		          left="name"
		          right="info"  />
		        {item.videos && item.videos.map((video, i) => {
	        		return <Video key={i} id={video.key} type={video.site} />
	        	})}
			</div>
	}

	getOverview(item) {
		return <TextsIcon
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
	}

	render () {
		const { items, detail } = this.props

	    return (
			<div>
				{items
					? items.map((item, i) => {
						return <Card
							key={i}
							title={item.original_title}
							date={Utils.date.timestampToHumain(item.publishedAt)}
							onClick={(e) => !detail ? this.goToDetail(item) : null}
							actions={this.getActions(item)}
							image={item.poster.sm}>
							{detail
								? this.getDetails(item)
								: this.getOverview(item)}
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
    detail: (id) => dispatch(MovieActions.movieDetailRequest(id))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Movies)
)