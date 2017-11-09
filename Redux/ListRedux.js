import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  favoriteGetRequest: ["name", "key", "value"],
  favoriteAddRequest: ["name", "item", "duplicate"],
  favoriteRemoveRequest: ["name", "id"],
  favoriteSuccess: ["item"],
  favoriteError: ["error"],
  listRequest: ["name", "page"],
  listAdd: ["name", "item", "duplicate"],
  listAddSuccess: ["name", "item"],
  listRemove: ["name", "id"],
  listRemoveAll: ["name"],
  listSuccess: ["name", "items"],
  listFailure: ["error"]
});

export const ListTypes = Types;
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

export const listRequest = (state, { name, page }) => {
  var newList = {};
  newList[name] = page > 1 && state[name] ? state[name] : [];
  return { ...state, ...newList };
};

export const listSuccess = (state, { name, items }) => {
  var newList = {};
  newList[name] = [...state[name], ...items];
  return { ...state, ...newList };
};

export const listFailure = (state, { name, error }) => {
  var newList = {};
  newList[name] = {
    items: (state[name] && state[name]) || [],
    fetching: false,
    error: error
  };
  return { ...state, ...newList };
};

export const listAdd = (state, { name, item, duplicate }) => {
  var newList = {};
  newList[name] = (state[name] && state[name]) || [];
  return { ...state, ...newList };
};

export const listAddSuccess = (state, { name, item }) => {
  var newList = {};
  newList[name] = [...state[name], item];
  return { ...state, ...newList };
};

export const listRemove = (state, { name, id }) => {
  var newItems = [];
  if (state[name] && state[name]) {
    Array.prototype.forEach.call(state[name], item => {
      if (!id.includes(item.apiId)) {
        newItems.push(item);
      }
    });
  }

  var newList = {};
  newList[name] = newItems;

  return { ...state, ...newList };
};

export const listRemoveAll = (state, { name }) => {
  var newList = {};
  newList[name] = [];
  return { ...state, ...newList };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FAVORITE_GET_REQUEST]: favoriteGetRequest,
  [Types.FAVORITE_ADD_REQUEST]: favoriteAddRequest,
  [Types.FAVORITE_REMOVE_REQUEST]: favoriteRemoveRequest,
  [Types.FAVORITE_SUCCESS]: favoriteSuccess,
  [Types.FAVORITE_ERROR]: favoriteError,
  [Types.LIST_REQUEST]: listRequest,
  [Types.LIST_ADD]: listAdd,
  [Types.LIST_REMOVE]: listRemove,
  [Types.LIST_REMOVE_ALL]: listRemoveAll,
  [Types.LIST_SUCCESS]: listSuccess,
  [Types.LIST_ADD_SUCCESS]: listAddSuccess,
  [Types.LIST_FAILURE]: listFailure
});
