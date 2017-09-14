import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  movieDetailRequest: ['id'],
  movieDetailSuccess: ['detail'],
  movieDetailFailure: ['error'],
  movieSearchRequest: ['name'],
  movieSearchSuccess: ['search'],
  movieSearchFailure: ['error'],
  popularRequest: null,
  popularSuccess: ['popular'],
  popularFailure: ['error'],
  discoverRequest: ['page'],
  discoverSuccess: ['discover'],
  discoverFailure: ['error']
})

export const MovieTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  search: [],
  popular: [],
  discover: [],
	detail: null
})

/* ------------- Reducers ------------- */

export const movieDetailRequest = (state, { id }) => {
  return {...state, detail: null}
}

export const movieDetailSuccess = (state, { detail }) => {
  return {...state, detail: detail}
}

export const movieDetailFailure = (state, { error }) => {
  return {...state, detail: error}
}

export const movieSearchRequest = (state, { name }) => {
  return state
}

export const movieSearchSuccess = (state, { search }) => {
  return {...state, search}
}

export const movieSearchFailure = (state, { error }) => {
  return {...state, ...error}
}

export const popularRequest = (state, { name }) => {
  return state
}

export const popularSuccess = (state, { popular }) => {
  return {...state, popular}
}

export const popularFailure = (state, { error }) => {
  return {...state, ...error}
}

export const discoverRequest = (state, { page }) => {
  return state
}

export const discoverSuccess = (state, { discover }) => {
  return {...state, discover: [...state.discover, ...discover]}
}

export const discoverFailure = (state, { error }) => {
  return {...state, ...error}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVIE_DETAIL_REQUEST]: movieDetailRequest,
  [Types.MOVIE_DETAIL_SUCCESS]: movieDetailSuccess,
  [Types.MOVIE_DETAIL_FAILURE]: movieDetailFailure,
  [Types.MOVIE_SEARCH_SUCCESS]: movieSearchSuccess,
  [Types.MOVIE_SEARCH_FAILURE]: movieSearchFailure,
  [Types.POPULAR_REQUEST]: popularRequest,
  [Types.POPULAR_SUCCESS]: popularSuccess,
  [Types.POPULAR_FAILURE]: popularFailure,
  [Types.DISCOVER_REQUEST]: discoverRequest,
  [Types.DISCOVER_SUCCESS]: discoverSuccess,
  [Types.DISCOVER_FAILURE]: discoverFailure
})