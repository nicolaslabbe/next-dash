import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
	/* ------------- Assemble The Reducers ------------- */
	const rootReducer = combineReducers({
		weather: require('./WeatherRedux').reducer
	})

	// return rootReducer
	return configureStore(rootReducer, rootSaga)
}