import TrainActions from "../Redux/TrainRedux";
import { call, put } from "redux-saga/effects";
import Utils from "../Utils";

export function* request(api, { name }) {
  var json = yield api.get(`${Utils.config.url}/api/train${name ? '/' + name : ''}`);

  if (json.error) {
    yield put(TrainActions.trainFailure(name, json.error));
  } else {
    yield put(TrainActions.trainSuccess(name, json));
  }
}
