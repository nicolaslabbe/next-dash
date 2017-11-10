import SqlActions from "../Redux/SqlRedux";
import { call, put } from "redux-saga/effects";
import Utils from "../Utils";

export function* request(api, { name }) {
  var json = yield api.get(`/api/db/${name}`);

  if (json.error) {
    yield put(SqlActions.sqlFailure(name, json.error));
  } else {
    yield put(SqlActions.sqlSuccess(name, json));
  }
}

export function* add(api, { name, item, duplicate }) {
  var json = yield api.post(`/api/db/${name}`, {
    item: item,
    duplicate: duplicate
  });

  if (json.error) {
    yield put(SqlActions.sqlFailure(name, json.error));
  } else {
    yield put(SqlActions.sqlAddSuccess(name, json));
  }
}

export function* find(api, { name, key, value }) {
  var json = yield api.get(`/api/db/${name}/${key}/${value}`);

  if (json.error) {
    yield put(SqlActions.sqlFindFailure(json.error));
  } else {
    yield put(SqlActions.sqlFindSuccess(json));
  }
}

export function* remove(api, { name, id }) {
  if (id !== false) {
    var json = yield api.delete(`/api/db/${name}/apiId/${encodeURI(id)}`);

    if (json.error) {
      yield put(SqlActions.sqlFailure(json.error));
    } else {
      yield put(SqlActions.sqlSuccess(name, []));
    }
  } else {
    yield put(SqlActions.sqlFailure("no apiId"));
  }
}

export function* removeAll(api, { name }) {
  var json = yield api.delete(`/api/db/${name}`);

  if (json.error) {
    yield put(SqlActions.sqlFailure(json.error));
  } else {
    yield put(SqlActions.sqlSuccess(name, []));
  }
}

export function* favorite(api, { name, key, value }) {
  var json = yield api.get(`/api/db/${name}/${key}/${value}`);

  if (json.error) {
    yield put(SqlActions.favoriteError(json.error));
  } else {
    yield put(SqlActions.favoriteSuccess(json));
  }
}

export function* favoriteAdd(api, { name, item, duplicate }) {
  var json = yield api.post(`/api/db/${name}`, {
    item: item,
    duplicate: duplicate
  });

  if (json.error) {
    yield put(SqlActions.favoriteError(json.error));
  } else {
    yield put(SqlActions.favoriteSuccess(json));
  }
}

export function* favoriteRemove(api, { name, id }) {
  if (id !== false) {
    var json = yield api.delete(`/api/db/${name}/apiId/${encodeURI(id)}`);

    if (json.error) {
      yield put(SqlActions.favoriteError(json.error));
    } else {
      yield put(SqlActions.favoriteSuccess(null));
    }
  } else {
    yield put(SqlActions.favoriteError("no apiId"));
  }
}
