import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dataRequest: ['name'],
  dataAdd: ['name', 'item'],
  dataRemove: ['name', 'id'],
  dataRemoveAll: ['name'],
  dataSuccess: ['name', 'items'],
  dataFailure: ['error']
})

export const DataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	
})

/* ------------- Reducers ------------- */

// request the data from an api
export const dataRequest = (state, { name }) => {
  return state
}

export const dataAdd = (state, { name, item }) => {
  var newData = {}
  newData[name] = state[name] || []
  newData[name].push({item})
  return {...state, ...newData}
}

export const dataRemove = (state, { name, id }) => {
  var removeData = state[name] || []
  var newItems = {}
  newItems[name] = []
  Array.prototype.forEach.call(removeData, (data) => {
    if (data.id !== id) {
      newItems[name].push(data)
    }
  })
  return {...state, ...newItems}
}

export const dataRemoveAll = (state, { name }) => {
  var newItems = {}
  newItems[name] = []
  return {...state, ...newItems}
}

export const dataSuccess = (state, { name, items }) => {
  var successData = {}
  successData[name] = [...state[name] || [], ...items]
  return {...state, ...successData}
}

export const dataFailure = (state, { error }) => {
  return {...state, error}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DATA_REQUEST]: dataRequest,
  [Types.DATA_ADD]: dataAdd,
  [Types.DATA_REMOVE]: dataRemove,
  [Types.DATA_REMOVE_ALL]: dataRemoveAll,
  [Types.DATA_SUCCESS]: dataSuccess,
  [Types.DATA_FAILURE]: dataFailure
})