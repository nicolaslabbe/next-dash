import React from 'react'
import { connect } from 'react-redux'

import WeatherIcon from "./ui/WeatherIcon"
import MainWeather from "./weather/MainWeather"

class Weather extends React.Component {

  render () {
    return (
      <div className="weather">
      <h2 className="title">Now</h2>
      {this.props.weather
        ? <MainWeather weather={this.props.weather}/>
        : null}
        <h2 className="title">Later</h2>
        {this.props.weather && this.props.weather.futur
          ? this.props.weather.futur.map((weather, i) => {
            return <ul key={i}>
              <li className="text">
                <WeatherIcon name={weather.icon} />
              </li>
              <li className="text">{weather.time}</li>
              <li className="text">{weather.degree} / {weather.wind}</li>
            </ul>
          })
          : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)