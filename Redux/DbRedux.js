import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dbDetailRequest: ['name', 'id'],
  dbDetailSuccess: ['name', 'detail'],
  dbDetailFailure: ['name', 'error'],
  dbSearchRequest: ['name', 'query', 'page'],
  dbSearchSuccess: ['name', 'search'],
  dbSearchFailure: ['name', 'error'],
  dbRequest: ['name', 'page'],
  dbSuccess: ['name', 'result'],
  dbFailure: ['error']
})

export const DbTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  storage: {}
})

/* ------------- Reducers ------------- */

export const dbDetailRequest = (state, { name, id }) => {
  return state
}

export const dbDetailSuccess = (state, { name, detail }) => {
  var storage = (state.storage && state.storage[name]) ? state.storage[name] : {}
  var newStorage = {}
  newStorage[name] = {
    detail: [detail],
    fetching: false,
    error: false
  }
  return {...state, storage: { ...state.storage, ...newStorage }}
}

export const dbDetailFailure = (state, { name, error }) => {
  var storage = (state.storage && state.storage[name]) ? state.storage[name] : {}
  storage.detail = {
    ...storage.detail,
    fetching: false,
    error: error
  }
  return {...state, storage: { ...state.storage, ...storage }}
}

export const dbSearchRequest = (state, { name, query, page }) => {
  var storage = (state.storage && state.storage[name]) ? state.storage[name] : {}
  var newStorage = {}
  var oldSearch = page > 1 && storage.search ? storage.search : []
  newStorage[name] = {
    search: oldSearch,
    fetching: true,
    error: false
  }
  return {...state, storage: { ...state.storage, ...newStorage }}
}

export const dbSearchSuccess = (state, { name, search }) => {
  var storage = (state.storage && state.storage[name]) ? state.storage[name] : {}
  var newStorage = {}
  newStorage[name] = {
    search: [...storage.search, ...search],
    fetching: false,
    error: false
  }
  return {...state, storage: { ...state.storage, ...newStorage }}
}

export const dbSearchFailure = (state, { name, error }) => {
  var storage = (state.storage && state.storage[name]) ? state.storage[name] : {}
  storage.search = {
    error: error
  }
  return {...state, storage: { ...state.storage, ...storage }}
}

export const dbRequest = (state, { name, page }) => {
  var storage = (state.storage && state.storage[name]) ? state.storage[name] : {}
  var newStorage = {}
  newStorage[name] = {
    result: storage.result || [],
    fetching: true,
    error: false
  }
  return {...state, storage: { ...state.storage, ...newStorage }}
}

export const dbSuccess = (state, { name, result }) => {
  var storage = (state.storage && state.storage[name]) ? state.storage[name] : {result: []}
  var newStorage = {}
  newStorage[name] = {
    result: [...storage.result, ...result],
    fetching: false,
    error: false
  }

  return {...state, storage: { ...state.storage, ...newStorage }}
}

export const dbFailure = (state, { name, error }) => {
  var storage = (state.storage && state.storage[name]) ? state.storage[name] : {}
  storage.error = error
  return {...state, storage: { ...state.storage, ...storage }}
}

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
})