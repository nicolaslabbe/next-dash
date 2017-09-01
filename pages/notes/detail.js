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
import DataActions from '../../Redux/DataRedux'

// Components
import EditableList from '../../components/EditableList'
import { Header } from '../../components/ui'

class Page extends React.Component {
	static async getInitialProps ({ store, query, isServer }) {
		store.dispatch(DataActions.dataRequest('notes'))
		return {
			id: query.id
		}
	}

	onSave = (name, item) => {
		item.detail = []
		this.props.save(name, item.id, item)
	}

	onRemove = (name, id) => {
		this.props.remove(name, id)
	}

	onRemoveAll = (name, id) => {
		this.props.removeAll(name, id)
	}

	onClick = (item) => {
		Router.push(`/notes/detail?id=${item.id}`)
	}

	render () {
		var detail = []
		if (this.props.data
			&& this.props.data.notes
			&& this.props.data.notes[this.props.id]) {
			detail = this.props.data.notes[this.props.id].detail
		}
    	return (
			<div>
				<Header
					title="note"
					close />
				<EditableList
					data={detail}
					onClick={(item) => this.onClick(item)}
					onSave={(name, item) => this.onSave('notes', item)}
					onRemove={(name, id) => this.onRemove('notes', id)}
					onRemoveAll={(name, id) => this.onRemoveAll('notes', id)} />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    data: state.data || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (id, item) => dispatch(DataActions.dataAddDetail(id, item)),
    remove: (name, id) => dispatch(DataActions.dataRemove(name, id)),
    removeAll: (name, id) => dispatch(DataActions.dataRemoveAll(name))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)