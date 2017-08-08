import React from 'react'
import {Provider} from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import createStore from '../Redux'

import WeatherActions from '../Redux/WeatherRedux'

import Weather from '../components/Weather'

class Page extends React.Component {
	static async getInitialProps ({ store, isServer }) {
		store.dispatch(WeatherActions.weatherRequest())
		return {}
		// return { ...store.getState() }
	}

    constructor (props) {
        super(props)
        this.state = props.state
    }

    componentWillMount() {
    	if (!this.props.isServer) {
    		this.props.weatherRequest()
    	}
    }

	render () {
    	return (
			<Weather/>
    	)
	}
}

const mapStateToProps = (state) => {
	return state
	// return {
		// weather: state.weather
	// }
}

const mapDispatchToProps = (dispatch) => {
  return {
    weatherRequest: () => dispatch(WeatherActions.weatherRequest())
  }
}

export default withRedux(createStore, mapStateToProps, mapDispatchToProps)(
	withReduxSaga(Page)
)