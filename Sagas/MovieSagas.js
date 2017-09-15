import MovieActions from '../Redux/MovieRedux'
import {call, put} from 'redux-saga/effects'
import Utils from '../Utils'

export function * searchRequest (api, { name, page }) {
	console.log(`${Utils.config.url}/api/movie/${name}/${page}`)
	var json = yield api.get(`${Utils.config.url}/api/movie/${name}/${page}`)

	if (json.error) {
		yield put(MovieActions.movieSearchFailure(json.error))
	}else {
		yield put(MovieActions.movieSearchSuccess(json))
	}
}

export function * popular (api, { name }) {
	var json = yield api.get(`${Utils.config.url}/api/movie/popular`)

	if (json.error) {
		yield put(MovieActions.popularFailure(json.error))
	}else {
		yield put(MovieActions.popularSuccess(json))
	}
}

export function * discover (api, { page }) {
	var json = yield api.get(`${Utils.config.url}/api/movie/discover/${page}`)

	if (json.error) {
		yield put(MovieActions.discoverFailure(json.error))
	}else {
		yield put(MovieActions.discoverSuccess(json))
	}
}

export function * detail (api, { id }) {
	var json = yield api.get(`${Utils.config.url}/api/movie/find/${id}`)

	if (json.error) {
		yield put(MovieActions.movieDetailFailure(json.error))
	}else {
		yield put(MovieActions.movieDetailSuccess(json))
	}
}