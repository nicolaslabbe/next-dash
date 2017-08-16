import NotesActions from '../Redux/NotesRedux'
import {call, put} from 'redux-saga/effects'
import Utils from '../Utils'

export function * request (api, { city }) {
	var json = yield api.get(`${Utils.config.url}/api/db/notes`)

	if (json.error) {
		yield put(NotesActions.notesFailure(json.error))
	}else {
		yield put(NotesActions.notesSuccess(json))
	}
}

export function * add (api, { item }) {
	var json = yield api.patch(`${Utils.config.url}/api/db/notes`, [item])

	if (json.error) {
		yield put(NotesActions.notesFailure(json.error))
	}else {
		yield put(NotesActions.notesSuccess(json))
	}
}