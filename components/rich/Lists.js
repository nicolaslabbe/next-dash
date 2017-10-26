import React from 'react'

import { DataList } from '../../components/ui'

class Lists extends React.Component {
	render () {
		const { list } = this.props
	    return (
			<div>
				{list
					? list.map((items, i) => {
					return items.map((item, i) => {
						return <DataList
								key={i}
								head={item.title}
								ref="dataList"
								max="2"
								multiSelect={false}
								data={item.items}
								left="left"
								right="right" />
						})
					})
					: null}
			</div>
		)
	}
}

export default Lists