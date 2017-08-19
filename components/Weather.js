import React from 'react'
import { connect } from 'react-redux'

// Stylesheet
import styles from './Styles/WeatherStyles.scss'

class Weather extends React.Component {
  render () {
    return (
      <div className="weather">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <h2 className="title">Weather</h2>
      {this.props.weather
        ? <ul>
          <li className="text">degree: {this.props.weather.degree}</li>
          <li className="text">humidity: {this.props.weather.humidity}</li>
          <li className="text">label: {this.props.weather.label}</li>
          <li className="text">description: {this.props.weather.description}</li>
          <li className="text">icon: {this.props.weather.icon}</li>
          <li className="text">wind: {this.props.weather.wind}</li>
        </ul>
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