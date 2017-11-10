import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  favoriteGetRequest: ["name", "key", "value"],
  favoriteAddRequest: ["name", "item", "duplicate"],
  favoriteRemoveRequest: ["name", "id"],
  favoriteSuccess: ["item"],
  favoriteError: ["error"],
  sqlRequest: ["name", "page"],
  sqlAdd: ["name", "item", "duplicate"],
  sqlAddSuccess: ["name", "item"],
  sqlRemove: ["name", "id"],
  sqlRemoveAll: ["name"],
  sqlSuccess: ["name", "items"],
  sqlFailure: ["error"]
});

export const SqlTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  favorite: null
});

/* ------------- Reducers ------------- */

export const favoriteGetRequest = (state, { name, key, value }) => {
  return {
    ...state,
    favorite: null
  };
};

export const favoriteAddRequest = (state, { name, item, duplicate }) => {
  return {
    ...state,
    favorite: Array.isArray(item) ? item[0] : item
  };
};

export const favoriteRemoveRequest = (state, { name, id }) => {
  return {
    ...state,
    favorite: null
  };
};

export const favoriteSuccess = (state, { item }) => {
  return {
    ...state,
    favorite: Array.isArray(item) ? item[0] : item
  };
};

export const favoriteError = (state, { error }) => {
  return {
    ...state,
    favorite: null
  };
};

export const sqlRequest = (state, { name, page }) => {
  var newData = {};
  newData[name] = page > 1 && state[name] ? state[name] : [];
  return { ...state, ...newData };
};

export const sqlSuccess = (state, { name, items }) => {
  var newData = {};
  newData[name] = [...state[name], ...items];
  return { ...state, ...newData };
};

export const sqlFailure = (state, { name, error }) => {
  var newData = {};
  newData[name] = {
    items: (state[name] && state[name]) || [],
    fetching: false,
    error: error
  };
  return { ...state, ...newData };
};

export const sqlAdd = (state, { name, item, duplicate }) => {
  var newData = {};
  newData[name] = (state[name] && state[name]) || [];
  return { ...state, ...newData };
};

export const sqlAddSuccess = (state, { name, item }) => {
  var newData = {};
  newData[name] = [...state[name], item];
  return { ...state, ...newData };
};

export const sqlRemove = (state, { name, id }) => {
  var newItems = [];
  if (state[name] && state[name]) {
    Array.prototype.forEach.call(state[name], item => {
      if (!id.includes(item.apiId)) {
        newItems.push(item);
      }
    });
  }

  var newData = {};
  newData[name] = newItems;

  return { ...state, ...newData };
};

export const sqlRemoveAll = (state, { name }) => {
  var newData = {};
  newData[name] = [];
  return { ...state, ...newData };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FAVORITE_GET_REQUEST]: favoriteGetRequest,
  [Types.FAVORITE_ADD_REQUEST]: favoriteAddRequest,
  [Types.FAVORITE_REMOVE_REQUEST]: favoriteRemoveRequest,
  [Types.FAVORITE_SUCCESS]: favoriteSuccess,
  [Types.FAVORITE_ERROR]: favoriteError,
  [Types.SQL_REQUEST]: sqlRequest,
  [Types.SQL_ADD]: sqlAdd,
  [Types.SQL_REMOVE]: sqlRemove,
  [Types.SQL_REMOVE_ALL]: sqlRemoveAll,
  [Types.SQL_SUCCESS]: sqlSuccess,
  [Types.SQL_ADD_SUCCESS]: sqlAddSuccess,
  [Types.SQL_FAILURE]: sqlFailure
});
