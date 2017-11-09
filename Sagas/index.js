import { takeLatest, all } from "redux-saga/effects";
import Api from "../Services/Api";
import ApiFixture from "../Services/ApiFixture";
import Utils from "../Utils";

/* ------------- Types ------------- */

import { WeatherTypes } from "../Redux/WeatherRedux";
import { ListTypes } from "../Redux/ListRedux";
import { DbTypes } from "../Redux/DbRedux";
import { DashboardTypes } from "../Redux/DashboardRedux";

/* ------------- Sagas ------------- */

import * as weatherSagas from "./WeatherSagas";
import * as listSagas from "./ListSagas";
import * as dbSagas from "./DbSagas";
import * as dashboardSagas from "./DashboardSagas";

/* ------------- API ------------- */
const api = Api.create();
// const api = Utils.config.isDev ? ApiFixture.create() : Api.create()
const Request = {};

export default function* root() {
  yield all([
    takeLatest(DashboardTypes.DASHBOARD_REQUEST, dashboardSagas.request, api),
    takeLatest(WeatherTypes.WEATHER_REQUEST, weatherSagas.request, api),
    takeLatest(ListTypes.FAVORITE_GET_REQUEST, listSagas.favorite, api),
    takeLatest(ListTypes.FAVORITE_ADD_REQUEST, listSagas.favoriteAdd, api),
    takeLatest(
      ListTypes.FAVORITE_REMOVE_REQUEST,
      listSagas.favoriteRemove,
      api
    ),
    takeLatest(ListTypes.LIST_REQUEST, listSagas.request, api),
    takeLatest(ListTypes.LIST_ADD, listSagas.add, api),
    takeLatest(ListTypes.LIST_REMOVE, listSagas.remove, api),
    takeLatest(ListTypes.LIST_REMOVE_ALL, listSagas.removeAll, api),
    takeLatest(DbTypes.DB_REQUEST, dbSagas.request, api),
    takeLatest(DbTypes.DB_DETAIL_REQUEST, dbSagas.detail, api),
    takeLatest(DbTypes.DB_SEARCH_REQUEST, dbSagas.search, api)
  ]);
}
