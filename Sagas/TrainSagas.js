import TrainActions from '../Redux/TrainRedux'
import {call, put} from 'redux-saga/effects'
import Utils from '../Utils'

export function * request (api, { stops }) {
	var json = yield api.post(`${Utils.config.url}/api/train/find`, stops)

	if (json.error) {
		yield put(TrainActions.trainFailure(json.error))
	}else {
		yield put(TrainActions.trainSuccess(json))
	}
}