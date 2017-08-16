import WeatherActions from '../Redux/WeatherRedux'
import {call, put} from 'redux-saga/effects'
import Utils from '../Utils'

export function * request (api, { city }) {
	var json = yield api.get(`${Utils.config.url}/api/weather/find/2988507`) // 524901

	if (json.error) {
		yield put(WeatherActions.weatherFailure(json.error))
	}else {
		yield put(WeatherActions.weatherSuccess(json))
	}
}