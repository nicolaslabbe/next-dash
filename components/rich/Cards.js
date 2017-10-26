import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

// Reduceurs
import dbActions from '../../Redux/DbRedux'
import DataActions from '../../Redux/DataRedux'

import Utils from "../../Utils"
import { Card, TextIcon, DataList, Video } from '../../components/ui'

class Cards extends React.Component {

	save = (item) => {
		this.props.callSave(this.props.type, item)
	}

	delete = (item) => {
		this.props.callRemove(this.props.type, item.apiId)
	}

	goToDetail = (item) => {
		if (item.id) {
			this.props.callDetail(this.props.type, item.id)
			Router.push(`/db/detail?type=${this.props.type}&id=${item.id}`)
		}else if (item.url) {
			if (typeof window !== 'undefined') {
				window.open(item.url)
			}
		}
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
				{item.map((detail, key) => {
					return <DataList
							key={key}
							head={detail.name}
							data={detail.value}
							left="name"
							right="value"  />
				})}
			</div>
	}

	getVideos = (videos) => {
		return <div>
				{videos && videos.map((video, i) => <Video key={i} id={video.key} type={video.site} />)}
			</div>
	}

	getOverview(items) {
		return <div>
			{items && Array.isArray(items) && items.map((item, i) => <TextIcon
				key={i}
				icon={item.icon ? item.icon : null}>
					{item.value}
				</TextIcon>
			)}
		</div>
	}

	render () {
		const { items, detail, type } = this.props
	    return (
			<div>
				{items
					? items.map((item, i) => {
						return <Card
							key={i}
							title={item.title}
							date={Utils.date.timestampToHumain(item.date)}
							onClick={(e) => !detail ? this.goToDetail(item) : null}
							actions={this.getActions(item)}
							image={item.image}>
							{item.overview
								? this.getOverview(item.overview)
								: null}
							{item.details
								? this.getDetails(item.details)
								: null}
							{item.videos
								? this.getVideos(item.videos)
								: null}
							</Card>
					})
					: null}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)