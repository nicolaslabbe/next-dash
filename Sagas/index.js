import { takeLatest, all } from "redux-saga/effects";
import Api from "../Services/Api";
import ApiFixture from "../Services/ApiFixture";
import Utils from "../Utils";

/* ------------- Types ------------- */

import { WeatherTypes } from "../Redux/WeatherRedux";
import { TrainTypes } from "../Redux/TrainRedux";
import { ListTypes } from "../Redux/ListRedux";
import { DbTypes } from "../Redux/DbRedux";

/* ------------- Sagas ------------- */

import * as weatherSagas from "./WeatherSagas";
import * as trainSagas from "./TrainSagas";
import * as listSagas from "./ListSagas";
import * as dbSagas from "./DbSagas";

/* ------------- API ------------- */
const api = Api.create();
// const api = Utils.config.isDev ? ApiFixture.create() : Api.create()
const Request = {};

export default function* root() {
  yield all([
    takeLatest(WeatherTypes.WEATHER_REQUEST, weatherSagas.request, api),
    takeLatest(TrainTypes.TRAIN_REQUEST, trainSagas.request, api),
    takeLatest(ListTypes.LIST_REQUEST, listSagas.request, api),
    takeLatest(ListTypes.LIST_ADD, listSagas.add, api),
    takeLatest(ListTypes.LIST_REMOVE, listSagas.remove, api),
    takeLatest(ListTypes.LIST_REMOVE_ALL, listSagas.removeAll, api),
    takeLatest(DbTypes.DB_REQUEST, dbSagas.request, api),
    takeLatest(DbTypes.DB_DETAIL_REQUEST, dbSagas.detail, api),
    takeLatest(DbTypes.DB_SEARCH_REQUEST, dbSagas.search, api)
  ]);
}
