import React from 'react'
import { connect } from 'react-redux'

class Weather extends React.Component {
  componentWillMount () {
    // this.props.weatherRequest()
  }  

  render () {
    return (
      <div>
      Weather:
      {this.props.weather
        ? <ul>
          <li>degree: {this.props.weather.degree}</li>
          <li>humidity: {this.props.weather.humidity}</li>
          <li>label: {this.props.weather.label}</li>
          <li>description: {this.props.weather.description}</li>
          <li>icon: {this.props.weather.icon}</li>
          <li>wind: {this.props.weather.wind}</li>
        </ul>
        : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
  console.log('state', state)
  return {
    weather: state.weather
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)