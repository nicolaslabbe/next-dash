import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import WeatherIcon from "./ui/WeatherIcon"
import { ChartLine, Legend } from "./charts"

class Weather extends React.Component {

  getData = (arr, type, color) => {
    var tomorrow = moment().add(1, 'day')
    var result = {
      id: type,
      color: color,
      data:[]
    }
    if (arr) {
      arr.map((item) => {
        if (moment(item.time).isBefore(tomorrow)) {
          result.data.push({
            x: moment(item.time).format("ha"),
            y: item[type]
          })
        }
      })
    }
    return result
  }

  convertToChartPieData = (arr) => {
    var charts = [
      this.getData(arr, 'degree', " hsl(330, 59%, 56%)"),
      this.getData(arr, 'wind', "hsl(233, 31%, 89%)"),
      this.getData(arr, 'humidity', "hsl(211, 31%, 37%)")
    ]
    return charts
  }

  render () {
    var data = this.props.weather && this.props.weather.futur ? this.convertToChartPieData(this.props.weather.futur) : []
    return (
      <div className="weather">
      <h2 className="title">Now</h2>
      {this.props.weather && this.props.weather.futur
        ? <div>
            <ChartLine
              width={1000}
              height={600}
              data={data} />
            <Legend
              data={data} />
          </div>
        : null}
      </div>
    )
  }

  // <h2 className="title">Later</h2>
  // {this.props.weather && this.props.weather.futur
  //   ? this.props.weather.futur.map((weather, i) => {
  //     return <ul key={i}>
  //       <li className="text">
  //         <WeatherIcon name={weather.icon} />
  //       </li>
  //       <li className="text">{weather.time}</li>
  //       <li className="text">{weather.degree} / {weather.wind}</li>
  //     </ul>
  //   })
  //   : null}
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