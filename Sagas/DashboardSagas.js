import DashboardActions from "../Redux/DashboardRedux";
import { call, put } from "redux-saga/effects";
import Utils from "../Utils";

export function* request(api) {
  var json = yield api.get(`/api/dashboard`);

  if (json.error) {
    yield put(DashboardActions.dashboardFailure(json.error));
  } else {
    yield put(DashboardActions.dashboardSuccess(json));
  }
}
