import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  trainRequest: ["name"],
  trainSuccess: ["name", "result"],
  trainFailure: ["name", "error"]
});

export const TrainTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  stations: {},
  disruptions: {}
});

/* ------------- Reducers ------------- */

// request the data from an api
export const trainRequest = (state, { name }) => {
  var newState = {}
  newState[name] = {
    items: [],
    fetching: true,
    error: false
  }
  return { ...state, ...newState };
};

export const trainSuccess = (state, { name, result }) => {
  var newState = {}
  newState[name] = {
    items: result,
    fetching: false,
    error: false
  }
  return { ...state, ...newState };
};

export const trainFailure = (state, { name, error }) => {
  var newState = {}
  newState[name] = {
    items: [],
    fetching: false,
    error: error
  }
  return { ...state, ...newState };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRAIN_REQUEST]: trainRequest,
  [Types.TRAIN_SUCCESS]: trainSuccess,
  [Types.TRAIN_FAILURE]: trainFailure
});
