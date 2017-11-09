import { combineReducers } from "redux";

import configureStore from "./CreateStore";
import rootSaga from "../Sagas";

// creates the store
export default state => {
  const rootReducer = combineReducers({
    weather: require("./WeatherRedux").reducer,
    list: require("./ListRedux").reducer,
    db: require("./DbRedux").reducer,
    dashboard: require("./DashboardRedux").reducer
  });

  return configureStore(rootReducer, rootSaga, state);
};
