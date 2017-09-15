import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  movieDetailRequest: ['id'],
  movieDetailSuccess: ['detail'],
  movieDetailFailure: ['error'],
  movieSearchRequest: ['name', 'page'],
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
  fetchingSearch: false,
  fetchingSearchPage: 1,
  popular: [],
  fetchingPopular: false,
  discover: [],
  fetchingDiscover: false,
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

export const movieSearchRequest = (state, { name, page }) => {
  if (page === 1) {
    return {...state, search: [], fetchingSearch: true, fetchingSearchPage: page}
  }else {
    return {...state, fetchingSearch: true, fetchingSearchPage: page}
  }
}

export const movieSearchSuccess = (state, { search }) => {
  return {...state, fetchingSearch: false, search: [...state.search, ...search]}
}

export const movieSearchFailure = (state, { error }) => {
  return {...state, ...error, fetchingSearch: false}
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
  [Types.MOVIE_SEARCH_REQUEST]: movieSearchRequest,
  [Types.MOVIE_SEARCH_SUCCESS]: movieSearchSuccess,
  [Types.MOVIE_SEARCH_FAILURE]: movieSearchFailure,
  [Types.POPULAR_REQUEST]: popularRequest,
  [Types.POPULAR_SUCCESS]: popularSuccess,
  [Types.POPULAR_FAILURE]: popularFailure,
  [Types.DISCOVER_REQUEST]: discoverRequest,
  [Types.DISCOVER_SUCCESS]: discoverSuccess,
  [Types.DISCOVER_FAILURE]: discoverFailure
})