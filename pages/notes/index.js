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
import { Header, MenuBottom } from '../../components/ui'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(DataActions.dataRequest('notes'))
		return {}
	}

	onSave = (name, item) => {
		item.detail = []
		this.props.save(name, item)
	}

	onRemove = (name, id) => {
		this.props.remove(name, id)
	}

	onRemoveAll = (name, id) => {
		this.props.removeAll(name, id)
	}

	onClick = (item, i) => {
		Router.push(`/notes/detail?id=${i}`)
	}

	render () {
    	return (
			<div>
				<Header
					title="notes"
					close />
				<EditableList
					data={this.props.data.notes}
					onClick={(item, i) => this.onClick(item, i)}
					onSave={(name, item) => this.onSave(name, item)}
					onRemove={(name, id) => this.onRemove(name, id)}
					onRemoveAll={(name, id) => this.onRemove(name, id)}
					name="notes" />
				<MenuBottom
					current="notes" />
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
    save: (name, item) => dispatch(DataActions.dataAdd(name, item)),
    remove: (name, id) => dispatch(DataActions.dataRemove(name, id)),
    removeIds: (name, ids) => dispatch(DataActions.dataRemoveIds(name, ids)),
    removeAll: (name, id) => dispatch(DataActions.dataRemoveAll(name))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)