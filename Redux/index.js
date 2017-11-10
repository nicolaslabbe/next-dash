import { combineReducers } from "redux";

import configureStore from "./CreateStore";
import rootSaga from "../Sagas";

// creates the store
export default state => {
  const rootReducer = combineReducers({
    sql: require("./SqlRedux").reducer,
    api: require("./ApiRedux").reducer,
    dashboard: require("./DashboardRedux").reducer
  });

  return configureStore(rootReducer, rootSaga, state);
};
