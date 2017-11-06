import DbActions from "../Redux/DbRedux";
import { call, put } from "redux-saga/effects";
import Utils from "../Utils";

export function* search(api, { name, query, page }) {
  var json = yield api.get(`/api/${name}/${query}/${page}`);

  if (json.error) {
    yield put(DbActions.dbSearchFailure(name, json.error));
  } else {
    yield put(DbActions.dbSearchSuccess(name, json));
  }
}

export function* request(api, { name, page }) {
  var json = yield api.get(`/api/${name}/${page}`);

  if (json.error) {
    yield put(DbActions.dbFailure(name, json.error));
  } else {
    yield put(DbActions.dbSuccess(name, json));
  }
}

export function* detail(api, { name, id }) {
  var json = yield api.get(`/api/${name}/find/${id}`);

  if (json.error) {
    yield put(DbActions.dbDetailFailure(name, json.error));
  } else {
    yield put(DbActions.dbDetailSuccess(name, json));
  }
}
