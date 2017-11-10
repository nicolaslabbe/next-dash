import { takeLatest, all } from "redux-saga/effects";
import Api from "../Services/Api";
import ApiFixture from "../Services/ApiFixture";
import Utils from "../Utils";

/* ------------- Types ------------- */

import { SqlTypes } from "../Redux/SqlRedux";
import { ApiTypes } from "../Redux/ApiRedux";
import { DashboardTypes } from "../Redux/DashboardRedux";

/* ------------- Sagas ------------- */

import * as sqlSagas from "./SqlSagas";
import * as apiSagas from "./ApiSagas";
import * as dashboardSagas from "./DashboardSagas";

/* ------------- API ------------- */
const api = Api.create();
// const api = Utils.config.isDev ? ApiFixture.create() : Api.create()
const Request = {};

export default function* root() {
  yield all([
    takeLatest(DashboardTypes.DASHBOARD_REQUEST, dashboardSagas.request, api),
    takeLatest(SqlTypes.FAVORITE_GET_REQUEST, sqlSagas.favorite, api),
    takeLatest(SqlTypes.FAVORITE_ADD_REQUEST, sqlSagas.favoriteAdd, api),
    takeLatest(SqlTypes.FAVORITE_REMOVE_REQUEST, sqlSagas.favoriteRemove, api),
    takeLatest(SqlTypes.SQL_REQUEST, sqlSagas.request, api),
    takeLatest(SqlTypes.SQL_ADD, sqlSagas.add, api),
    takeLatest(SqlTypes.SQL_REMOVE, sqlSagas.remove, api),
    takeLatest(SqlTypes.SQL_REMOVE_ALL, sqlSagas.removeAll, api),
    takeLatest(ApiTypes.API_REQUEST, apiSagas.request, api),
    takeLatest(ApiTypes.API_DETAIL_REQUEST, apiSagas.detail, api),
    takeLatest(ApiTypes.API_SEARCH_REQUEST, apiSagas.search, api)
  ]);
}
