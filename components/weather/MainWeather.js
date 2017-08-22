import React from 'react'
import { connect } from 'react-redux'

import WeatherIcon from "../ui/WeatherIcon"

class MainWeather extends React.Component {

  render () {
    return (
      <div>
          <div className="text">
            <WeatherIcon name={this.props.weather.icon} />
          </div>
          <div className="text">degree: {this.props.weather.degree}</div>
          <div className="text">time: {this.props.weather.time}</div>
          <div className="text">humidity: {this.props.weather.humidity}</div>
          <div className="text">label: {this.props.weather.label}</div>
          <div className="text">description: {this.props.weather.description}</div>
          <div className="text">wind: {this.props.weather.wind}</div>
      </div>
    )
  }
}

export default MainWeather