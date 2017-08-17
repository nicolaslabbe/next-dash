import { combineReducers } from 'redux';

import configureStore from "./CreateStore";
import rootSaga from "../Sagas";

// creates the store
export default (state) => {

	const rootReducer = combineReducers({
		weather: require('./WeatherRedux').reducer,
		train: require('./TrainRedux').reducer,
		news: require('./NewsRedux').reducer,
		data: require('./DataRedux').reducer
	})

	return configureStore(rootReducer, rootSaga, state)
}