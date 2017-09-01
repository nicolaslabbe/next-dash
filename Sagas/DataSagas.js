import DataActions from '../Redux/DataRedux'
import {call, put} from 'redux-saga/effects'
import Utils from '../Utils'

export function * request (api, { name }) {
	var json = yield api.get(`${Utils.config.url}/api/db/${name}`)

	if (json.error) {
		yield put(DataActions.dataFailure(json.error))
	}else {
		yield put(DataActions.dataSuccess(name, json))
	}
}

export function * add (api, { name, item }) {
	var json = yield api.post(`${Utils.config.url}/api/db/${name}`, item)

	if (json.error) {
		yield put(DataActions.dataFailure(json.error))
	}else {
		yield put(DataActions.dataAddSuccess(name, json))
	}
}

export function * addDetail (api, { name, id, item }) {
	var json = yield api.post(`${Utils.config.url}/api/db/${name}/${id}`, item)

	if (json.error) {
		yield put(DataActions.dataFailure(json.error))
	}else {
		yield put(DataActions.dataAddSuccess(name, json))
	}
}

export function * remove (api, { name, id }) {
	var json = yield api.delete(`${Utils.config.url}/api/db/${name}/id/${encodeURI(id)}`)

	if (json.error) {
		yield put(DataActions.dataFailure(json.error))
	}else {
		yield put(DataActions.dataSuccess(name, json))
	}
}

export function * removeAll (api, { name }) {
	var json = yield api.delete(`${Utils.config.url}/api/db/${name}`)

	if (json.error) {
		yield put(DataActions.dataFailure(json.error))
	}else {
		yield put(DataActions.dataRemoveSuccess(name, []))
	}
}