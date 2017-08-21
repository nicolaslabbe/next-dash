import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  weatherRequest: null,
  weatherSuccess: ['weather'],
  weatherFailure: ['error']
})

export const WeatherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	degree: null,
	humidity: null,
	label: null,
	description: null,
	icon: null,
	wind: null,
	error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const weatherRequest = (state) => {
	return state
}

export const weatherSuccess = (state, { weather }) => {
	return {...state, weather}
}

export const weatherFailure = (state, { error }) => {
	return {...state, error}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WEATHER_REQUEST]: weatherRequest,
  [Types.WEATHER_SUCCESS]: weatherSuccess,
  [Types.WEATHER_FAILURE]: weatherFailure
})