import WeatherActions from "../Redux/WeatherRedux";
import { call, put } from "redux-saga/effects";
import Utils from "../Utils";

export function* request(api, { name }) {
  var json = yield api.get(`/api/weather/${name}`);

  if (json.error) {
    yield put(WeatherActions.weatherFailure(name, json.error));
  } else {
    yield put(WeatherActions.weatherSuccess(name, json));
  }
}
