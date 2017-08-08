import WeatherActions from '../Redux/WeatherRedux'
import {call, put} from 'redux-saga/effects'

export function * request (api, { city }) {
	var json = yield api.get('2988507')

	if (json.error) {
		yield put(WeatherActions.weatherFailure(json.error))
	}else {
		yield put(WeatherActions.weatherSuccess(json))
	}
}