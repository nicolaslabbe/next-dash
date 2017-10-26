import React from 'react'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Router from 'next/router'
import Link from 'next/link'
import moment from 'moment'
// Redux
import rootReducer from "../../Redux";

// Reduceurs
import NewsActions from '../../Redux/NewsRedux'
import DataActions from '../../Redux/DataRedux'

import Utils from "../../Utils"
import { Card, TextsIcon, DataList, Text } from '../../components/ui'

class Movies extends React.Component {

	save = (item) => {
		this.props.save('favorites', item)
	}

	delete = (item) => {
		this.props.remove('favorites', item.apiId)
	}

	goToDetail = (item) => {
		// if (typeof window !== 'undefined') {
		// 	window.open(article)
		// }
		this.props.detail(item)
		Router.push(`/news/detail?id=${item.id || escape(item.title)}`)
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
		return <DataList
		          data={[{
		          	name: 'author',
		          	info: item.author
		          }]}
		          left="name"
		          right="info"  />
	}

	getOverview(item) {
		return <Text
			className="description">
			{item.description.replace(/<\/?[^>]+(>|$)/g, "")}
		</Text>
	}

	render () {
		const { items, detail } = this.props

	    return (
			<div>
				{items
					? items.map((item, i) => {
						return <Card
								key={i}
								onClick={(e) => !detail ? this.goToDetail(item) : null}
								title={item.title}
								date={Utils.date.timestampToHumain(item.publishedAt)}
								actions={this.getActions(item)}
								image={item.urlToImage}>
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
    detail: (item) => dispatch(NewsActions.newsDetailRequest(item))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Movies)
)