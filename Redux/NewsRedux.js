import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  newsRequest: null,
  newsSuccess: ['articles'],
  newsFailure: ['error']
})

export const NewsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	articles: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const newsRequest = (state) => {
	return state
}

export const newsSuccess = (state, { articles }) => {
	return state.merge({ articles: articles })
}

export const newsFailure = (state, { error }) => {
	return state.merge({ error: error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEWS_REQUEST]: newsRequest,
  [Types.NEWS_SUCCESS]: newsSuccess,
  [Types.NEWS_FAILURE]: newsFailure
})