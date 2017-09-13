import { takeLatest, all } from 'redux-saga/effects'
import Api from '../Services/Api'
import ApiFixture from '../Services/ApiFixture'
import Utils from '../Utils'

/* ------------- Types ------------- */

import { WeatherTypes } from '../Redux/WeatherRedux'
import { TrainTypes } from '../Redux/TrainRedux'
import { NewsTypes } from '../Redux/NewsRedux'
import { DataTypes } from '../Redux/DataRedux'
import { MovieTypes } from '../Redux/MovieRedux'

/* ------------- Sagas ------------- */

import * as weatherSagas from './WeatherSagas'
import * as trainSagas from './TrainSagas'
import * as newsSagas from './NewsSagas'
import * as dataSagas from './DataSagas'
import * as movieSagas from './MovieSagas'

/* ------------- API ------------- */
const api = Api.create()
// const api = Utils.config.isDev ? ApiFixture.create() : Api.create()
const Request = {}

export default function * root () {
	yield all([
		takeLatest(WeatherTypes.WEATHER_REQUEST, weatherSagas.request, api),
		takeLatest(TrainTypes.TRAIN_REQUEST, trainSagas.request, api),
		takeLatest(NewsTypes.NEWS_REQUEST, newsSagas.request, api),
		takeLatest(DataTypes.DATA_REQUEST, dataSagas.request, api),
		takeLatest(DataTypes.DATA_ADD, dataSagas.add, api),
		takeLatest(DataTypes.DATA_ADD_DETAIL, dataSagas.addDetail, api),
		takeLatest(DataTypes.DATA_REMOVE, dataSagas.remove, api),
		takeLatest(DataTypes.DATA_REMOVE_ALL, dataSagas.removeAll, api),
		takeLatest(MovieTypes.POPULAR_REQUEST, movieSagas.popular, api),
		takeLatest(MovieTypes.DISCOVER_REQUEST, movieSagas.discover, api),
		takeLatest(MovieTypes.MOVIE_DETAIL_REQUEST, movieSagas.detail, api),
		takeLatest(MovieTypes.MOVIE_SEARCH_REQUEST, movieSagas.searchRequest, api)
	])
}