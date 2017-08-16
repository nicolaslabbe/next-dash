import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notesRequest: null,
  notesAdd: ['item'],
  notesSuccess: ['items'],
  notesFailure: ['error']
})

export const NotesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	items: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const notesRequest = (state) => {
  return state
}

export const notesAdd = (state, { item }) => {
  return {...state, items: [...state.items, [item]]}
}

export const notesSuccess = (state, { items }) => {
  return {...state, items: items}
}

export const notesFailure = (state, { error }) => {
	return state.merge({ error: error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTES_REQUEST]: notesRequest,
  [Types.NOTES_ADD]: notesAdd,
  [Types.NOTES_SUCCESS]: notesSuccess,
  [Types.NOTES_FAILURE]: notesFailure
})