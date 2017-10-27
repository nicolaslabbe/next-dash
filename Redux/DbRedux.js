import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dbDetailRequest: ["name", "id"],
  dbDetailSuccess: ["name", "detail"],
  dbDetailFailure: ["name", "error"],
  dbSearchRequest: ["name", "query", "page"],
  dbSearchSuccess: ["name", "search"],
  dbSearchFailure: ["name", "error"],
  dbRequest: ["name", "page"],
  dbSuccess: ["name", "result"],
  dbFailure: ["error"]
});

export const DbTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  search: {},
  result: {},
  detail: {}
});

/* ------------- Reducers ------------- */

export const dbDetailRequest = (state, { name, id }) => {
  var newDetail = {};
  newDetail[name] = {
    items: [],
    fetching: true,
    error: false
  };
  return { ...state, detail: { ...state.detail, ...newDetail } };
};

export const dbDetailSuccess = (state, { name, detail }) => {
  var newDetail = {};
  newDetail[name] = {
    items: detail,
    fetching: false,
    error: false
  };
  return { ...state, detail: { ...state.detail, ...newDetail } };
};

export const dbDetailFailure = (state, { name, error }) => {
  var newDetail = {};
  newDetail[name] = {
    items: [],
    fetching: false,
    error: error
  };
  return { ...state, storage: { ...state.storage, ...newDetail } };
};

export const dbSearchRequest = (state, { name, query, page }) => {
  var newSearch = {};
  newSearch[name] = {
    items: page > 1 && state.search[name] ? state.search[name] : [],
    fetching: true,
    error: false
  };
  return { ...state, search: { ...state.search, ...newSearch } };
};

export const dbSearchSuccess = (state, { name, search }) => {
  var newSearch = {};
  newSearch[name] = {
    items: [...state.search[name], ...search],
    fetching: false,
    error: false
  };
  return { ...state, search: { ...state.search, ...newSearch } };
};

export const dbSearchFailure = (state, { name, error }) => {
  var storage = state.storage && state.storage[name] ? state.storage[name] : {};
  storage.search = {
    items: [],
    fetching: false,
    error: error
  };
  return { ...state, storage: { ...state.storage, ...newSearch } };
};

export const dbRequest = (state, { name, page }) => {
  var newResult = {};
  newResult[name] = {
    items: page > 1 && state.result[name] ? state.result[name] : [],
    fetching: true,
    error: false
  };
  return { ...state, result: { ...state.result, ...newResult } };
};

export const dbSuccess = (state, { name, result }) => {
  var newResult = {};
  newResult[name] = {
    items: [...state.result[name], ...result],
    fetching: false,
    error: false
  };
  return { ...state, result: { ...state.result, ...newResult } };
};

export const dbFailure = (state, { name, error }) => {
  var newResult = {};
  newResult[name] = {
    items: [],
    fetching: false,
    error: error
  };
  return { ...state, result: { ...state.result, ...newResult } };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DB_DETAIL_REQUEST]: dbDetailRequest,
  [Types.DB_DETAIL_SUCCESS]: dbDetailSuccess,
  [Types.DB_DETAIL_FAILURE]: dbDetailFailure,
  [Types.DB_SEARCH_REQUEST]: dbSearchRequest,
  [Types.DB_SEARCH_SUCCESS]: dbSearchSuccess,
  [Types.DB_SEARCH_FAILURE]: dbSearchFailure,
  [Types.DB_REQUEST]: dbRequest,
  [Types.DB_SUCCESS]: dbSuccess,
  [Types.DB_FAILURE]: dbFailure
});
