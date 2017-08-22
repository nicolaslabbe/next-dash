import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  trainRequest: ['stops'],
  trainSuccess: ['stations'],
  trainFailure: ['error']
})

export const TrainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	stations: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const trainRequest = (state) => {
	return state
}

export const trainSuccess = (state, { stations }) => {
  return {...state, stations}
}

export const trainFailure = (state, { error }) => {
  return {...state, error}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRAIN_REQUEST]: trainRequest,
  [Types.TRAIN_SUCCESS]: trainSuccess,
  [Types.TRAIN_FAILURE]: trainFailure
})