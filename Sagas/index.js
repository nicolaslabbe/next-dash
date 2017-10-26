import { takeLatest, all } from 'redux-saga/effects'
import Api from '../Services/Api'
import ApiFixture from '../Services/ApiFixture'
import Utils from '../Utils'

/* ------------- Types ------------- */

import { WeatherTypes } from '../Redux/WeatherRedux'
import { TrainTypes } from '../Redux/TrainRedux'
import { DataTypes } from '../Redux/DataRedux'
import { DbTypes } from '../Redux/DbRedux'

/* ------------- Sagas ------------- */

import * as weatherSagas from './WeatherSagas'
import * as trainSagas from './TrainSagas'
import * as dataSagas from './DataSagas'
import * as dbSagas from './DbSagas'

/* ------------- API ------------- */
const api = Api.create()
// const api = Utils.config.isDev ? ApiFixture.create() : Api.create()
const Request = {}

export default function * root () {
	yield all([
		takeLatest(WeatherTypes.WEATHER_REQUEST, weatherSagas.request, api),
		takeLatest(TrainTypes.TRAIN_REQUEST, trainSagas.request, api),
		takeLatest(DataTypes.DATA_REQUEST, dataSagas.request, api),
		takeLatest(DataTypes.DATA_ADD, dataSagas.add, api),
		takeLatest(DataTypes.DATA_ADD_DETAIL, dataSagas.addDetail, api),
		takeLatest(DataTypes.DATA_REMOVE, dataSagas.remove, api),
		takeLatest(DataTypes.DATA_REMOVE_ALL, dataSagas.removeAll, api),
		takeLatest(DbTypes.DB_REQUEST, dbSagas.request, api),
		takeLatest(DbTypes.DB_DETAIL_REQUEST, dbSagas.detail, api),
		takeLatest(DbTypes.DB_SEARCH_REQUEST, dbSagas.search, api)
	])
}