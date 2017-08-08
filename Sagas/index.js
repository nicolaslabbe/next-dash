import { takeLatest, all } from 'redux-saga/effects'
import WeatherApi from '../Services/WeatherApi'

/* ------------- Types ------------- */

import { WeatherTypes } from '../Redux/WeatherRedux'

/* ------------- Sagas ------------- */

import * as weatherSagas from './WeatherSagas'

/* ------------- API ------------- */

const weatherApi = /* DebugConfig.useFixtures ? WeatherApi :*/ WeatherApi.create()
const Request = {}

export default function * root () {
	yield all([
		takeLatest(WeatherTypes.WEATHER_REQUEST, weatherSagas.request, weatherApi)
	])
}