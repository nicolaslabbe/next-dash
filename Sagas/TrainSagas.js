import TrainActions from '../Redux/TrainRedux'
import {call, put} from 'redux-saga/effects'
import Utils from '../Utils'

export function * request (api, { city }) {
	var json = yield api.get(`${Utils.config.url}/api/train/find/87686006`) // 524901

	if (json.error) {
		yield put(TrainActions.trainFailure(json.error))
	}else {
		yield put(TrainActions.trainSuccess(json))
	}
}