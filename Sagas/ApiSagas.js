import ApiActions from "../Redux/ApiRedux";
import { call, put } from "redux-saga/effects";
import Utils from "../Utils";

export function* search(api, { name, query, page }) {
  var json = yield api.get(`/api/${name}/${query}/${page}`);

  if (json.error) {
    yield put(ApiActions.apiSearchFailure(name, json.error));
  } else {
    yield put(ApiActions.apiSearchSuccess(name, json));
  }
}

export function* request(api, { name, page }) {
  var json = yield api.get(`/api/${name}/${page}`);

  if (json.error) {
    yield put(ApiActions.apiFailure(name, json.error));
  } else {
    yield put(ApiActions.apiSuccess(name, json));
  }
}

export function* detail(api, { name, id }) {
  var json = yield api.get(`/api/${name}/find/${id}`);

  if (json.error) {
    yield put(ApiActions.apiDetailFailure(name, json.error));
  } else {
    yield put(ApiActions.apiDetailSuccess(name, json));
  }
}
