import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  weatherRequest: ["name"],
  weatherSuccess: ["name", "result"],
  weatherFailure: ["name", "error"]
});

export const WeatherTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  current: {}
});

/* ------------- Reducers ------------- */

export const weatherRequest = (state, { name }) => {
  var newState = {};
  newState[name] = {
    items: [],
    fetching: true,
    error: false
  };
  return { ...state, ...newState };
};

export const weatherSuccess = (state, { name, result }) => {
  var newState = {};
  newState[name] = {
    items: result,
    fetching: false,
    error: false
  };
  return { ...state, ...newState };
};

export const weatherFailure = (state, { name, error }) => {
  var newState = {};
  newState[name] = {
    items: [],
    fetching: false,
    error: error
  };
  return { ...state, ...newState };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WEATHER_REQUEST]: weatherRequest,
  [Types.WEATHER_SUCCESS]: weatherSuccess,
  [Types.WEATHER_FAILURE]: weatherFailure
});
