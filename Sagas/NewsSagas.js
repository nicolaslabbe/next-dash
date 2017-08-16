import NewsActions from '../Redux/NewsRedux'
import {call, put} from 'redux-saga/effects'
import Utils from '../Utils'

export function * request (api, { city }) {
	var json = yield api.get(`${Utils.config.url}/api/news/find`) // 524901

	if (json.error) {
		yield put(NewsActions.newsFailure(json.error))
	}else {
		yield put(NewsActions.newsSuccess(json))
	}
}