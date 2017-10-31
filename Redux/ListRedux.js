import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
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

export const INITIAL_STATE = Immutable({});

/* ------------- Reducers ------------- */

export const listRequest = (state, { name, page }) => {
  var newList = {};
  newList[name] = {
    items:
      page > 1 && state[name] && state[name].items ? state[name].items : [],
    fetching: true,
    error: false
  };
  return { ...state, ...newList };
};

export const listSuccess = (state, { name, items }) => {
  var newList = {};
  newList[name] = {
    items: [...state[name].items, ...items],
    fetching: false,
    error: false
  };
  return { ...state, ...newList };
};

export const listFailure = (state, { name, error }) => {
  var newList = {};
  newList[name] = {
    items: state[name] && state[name].items || [],
    fetching: false,
    error: error
  };
  return { ...state, ...newList };
};

export const listAdd = (state, { name, item, duplicate }) => {
  var newList = {};
  newList[name] = {
    items: state[name] && state[name].items || [],
    fetching: true,
    error: false
  };
  return { ...state, ...newList };
};

export const listAddSuccess = (state, { name, item }) => {
  var newList = {};
  newList[name] = {
    items: [...state[name].items, item],
    fetching: false,
    error: false
  };
  return { ...state, ...newList };
};

export const listRemove = (state, { name, id }) => {
  var newItems = [];
  if (state[name] && state[name].items) {
    Array.prototype.forEach.call(state[name].items, item => {
      if (!id.includes(item.apiId)) {
        newItems.push(item);
      }
    });
  }

  var newList = {};
  newList[name] = {
    items: newItems,
    fetching: true,
    error: false
  };

  return { ...state, ...newList };
};

export const listRemoveAll = (state, { name }) => {
  var newList = {};
  newList[name] = {
    items: [],
    fetching: true,
    error: false
  };
  return { ...state, ...newList };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_REQUEST]: listRequest,
  [Types.LIST_ADD]: listAdd,
  [Types.LIST_REMOVE]: listRemove,
  [Types.LIST_REMOVE_ALL]: listRemoveAll,
  [Types.LIST_SUCCESS]: listSuccess,
  [Types.LIST_ADD_SUCCESS]: listAddSuccess,
  [Types.LIST_FAILURE]: listFailure
});
