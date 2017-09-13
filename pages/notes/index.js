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
import { Header, MenuBottom, Modal, Confirm } from '../../components/ui'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(DataActions.dataRequest('notes'))
		return {}
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	confirmVisible: false,
	  	modalVisible: false,
      	multiSelect: false
	  }
	}

	save = (name, item) => {
		item.detail = []
		this.props.save(name, item)
	}

	remove = (name, id) => {
		this.setState({
			confirmVisible: false,
			multiSelect: false
		})
		this.props.remove('notes', this.refs.editableList.state.selectedIds)
	}

	removeAll = () => {
		this.props.removeAll('notes')
		this.setState({ modalVisible: false })
	}

	comfirmRemoveAll = () => {
		this.setState({ modalVisible: true })
	}

	onClick = (item, i) => {
		Router.push(`/notes/detail?id=${i}`)
	}

	render () {
    	return (
			<div>
				<Header
					title="notes"
					close
					menu={[{
						name: 'edit',
						fn: () => this.setState({ confirmVisible: true, multiSelect: true })
					},
					{
						name: 'remove all',
						fn: () => this.comfirmRemoveAll()
					}]} />
				<EditableList
					ref="editableList"
					data={this.props.data.notes}
					multiSelect={this.state.multiSelect}
					onClick={(item, i) => this.onClick(item, i)}
					onSave={(name, item) => this.save(name, item)}
					onRemove={(name, id) => this.remove(name, id)}
					onRemoveAll={(name, id) => this.remove(name, id)}
					name="notes" />
					{this.state.confirmVisible
						?null
						: <MenuBottom />}
				<Modal
		          ref="modal"
		          visible={this.state.modalVisible}
		          onCancel={(() => this.setState({ modalVisible: false }))}
		          onValid={(() => this.removeAll())} />
				<Confirm
		          ref="confirm"
		          visible={this.state.confirmVisible}
		          onCancel={(() => this.setState({ confirmVisible: false, multiSelect: false }))}
		          onConfirm={(() => this.remove())} />
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