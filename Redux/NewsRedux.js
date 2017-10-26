import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  newsRequest: null,
  newsSuccess: ['articles'],
  newsFailure: ['error'],
  newsDetailRequest: ['detail'],
  newsDetailSuccess: ['detail'],
  newsDetailFailure: ['error']
})

export const NewsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	articles: []
})

/* ------------- Reducers ------------- */
export const newsDetailRequest = (state, { detail }) => {
  return {...state, detail: detail}
}

export const newsDetailSuccess = (state, { detail }) => {
  return state
}

export const newsDetailFailure = (state, { error }) => {
  return {...state, detail: error}
}

// request the data from an api
export const newsRequest = (state) => {
	return state
}

export const newsSuccess = (state, { articles }) => {
  return {...state, articles}
}

export const newsFailure = (state, { error }) => {
  return {...state, ...error}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEWS_REQUEST]: newsRequest,
  [Types.NEWS_SUCCESS]: newsSuccess,
  [Types.NEWS_FAILURE]: newsFailure,
  [Types.NEWS_DETAIL_REQUEST]: newsDetailRequest,
  [Types.NEWS_DETAIL_SUCCESS]: newsDetailSuccess,
  [Types.NEWS_DETAIL_FAILURE]: newsDetailFailure
})