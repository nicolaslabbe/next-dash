import ListActions from "../Redux/ListRedux";
import { call, put } from "redux-saga/effects";
import Utils from "../Utils";

export function* request(api, { name }) {
  var json = yield api.get(`/api/db/${name}`);

  if (json.error) {
    yield put(ListActions.listFailure(name, json.error));
  } else {
    yield put(ListActions.listSuccess(name, json));
  }
}

export function* add(api, { name, item, duplicate }) {
  var json = yield api.post(`/api/db/${name}`, {
    item: item,
    duplicate: duplicate
  });

  if (json.error) {
    yield put(ListActions.listFailure(name, json.error));
  } else {
    yield put(ListActions.listAddSuccess(name, json));
  }
}

export function* remove(api, { name, id }) {
  if (id) {
    var json = yield api.delete(`/api/db/${name}/apiId/${encodeURI(id)}`);

    if (json.error) {
      yield put(ListActions.listFailure(json.error));
    } else {
      yield put(ListActions.listSuccess(name, []));
    }
  } else {
    yield put(ListActions.listFailure("no apiId"));
  }
}

export function* removeAll(api, { name }) {
  var json = yield api.delete(`/api/db/${name}`);

  if (json.error) {
    yield put(ListActions.listFailure(json.error));
  } else {
    yield put(ListActions.listSuccess(name, []));
  }
}
