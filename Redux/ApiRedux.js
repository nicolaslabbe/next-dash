import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  apiDetailRequest: ["name", "id"],
  apiDetailSuccess: ["name", "detail"],
  apiDetailFailure: ["name", "error"],
  apiSearchRequest: ["name", "query", "page"],
  apiSearchSuccess: ["name", "search"],
  apiSearchFailure: ["name", "error"],
  apiRequest: ["name", "page"],
  apiSuccess: ["name", "result"],
  apiFailure: ["error"]
});

export const ApiTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  search: {},
  result: {},
  detail: {}
});

/* ------------- Reducers ------------- */

export const apiDetailRequest = (state, { name, id }) => {
  var newDetail = {};
  newDetail[name] = [];
  return { ...state, detail: { ...state.detail, ...newDetail } };
};

export const apiDetailSuccess = (state, { name, detail }) => {
  var newDetail = {};
  newDetail[name] = detail;
  return { ...state, detail: { ...state.detail, ...newDetail } };
};

export const apiDetailFailure = (state, { name, error }) => {
  var newDetail = {};
  newDetail[name] = [];
  return { ...state, storage: { ...state.storage, ...newDetail } };
};

export const apiSearchRequest = (state, { name, query, page }) => {
  var newSearch = {};
  newSearch[name] = page > 1 && state.search[name] ? state.search[name] : [];
  return { ...state, search: { ...state.search, ...newSearch } };
};

export const apiSearchSuccess = (state, { name, search }) => {
  var newSearch = {};
  newSearch[name] = {
    items: search ? [...state.search[name], ...search] : state.search[name]
  };
  return { ...state, search: { ...state.search, ...newSearch } };
};

export const apiSearchFailure = (state, { name, error }) => {
  var newSearch = {};
  newSearch[name] = [];
  return { ...state, search: { ...state.search, ...newSearch } };
};

export const apiRequest = (state, { name, page }) => {
  var newResult = {};
  newResult[name] = page > 1 && state.result[name] ? state.result[name] : [];
  return { ...state, result: { ...state.result, ...newResult } };
};

export const apiSuccess = (state, { name, result }) => {
  var newResult = {};
  newResult[name] = [...state.result[name], ...result];
  return { ...state, result: { ...state.result, ...newResult } };
};

export const apiFailure = (state, { name, error }) => {
  var newResult = {};
  newResult[name] = [];
  return { ...state, result: { ...state.result, ...newResult } };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.API_DETAIL_REQUEST]: apiDetailRequest,
  [Types.API_DETAIL_SUCCESS]: apiDetailSuccess,
  [Types.API_DETAIL_FAILURE]: apiDetailFailure,
  [Types.API_SEARCH_REQUEST]: apiSearchRequest,
  [Types.API_SEARCH_SUCCESS]: apiSearchSuccess,
  [Types.API_SEARCH_FAILURE]: apiSearchFailure,
  [Types.API_REQUEST]: apiRequest,
  [Types.API_SUCCESS]: apiSuccess,
  [Types.API_FAILURE]: apiFailure
});
