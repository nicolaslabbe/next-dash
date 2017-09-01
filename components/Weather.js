import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import WeatherIcon from "./ui/WeatherIcon"
import { ChartLine, Legend } from "./charts"

// Layout
import {
  Row,
  Column,
  Content
} from './layout'

// ui
import {
  DataList
} from './ui'

class Weather extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      width: 0,
      height: 0
    }
  }

  updateDimensions = () => {
    var width = 0
    var height = 0
    if (typeof window !== 'undefined') {
      width = (window.innerWidth > 600) ? 600 : window.innerWidth
      height = Math.round(width * 0.666667)
      height = (height < 400) ? 400 : height
    }

    this.setState({
      width: width,
      height: height
    })
  }

  componentDidMount = () => {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions);
  }

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
      this.getData(arr, 'degree', "hsl(330, 59%, 56%)"),
      this.getData(arr, 'wind', "hsl(233, 31%, 89%)"),
      this.getData(arr, 'humidity', "hsl(211, 31%, 37%)")
    ]
    return charts
  }

  render () {
    const { width, height } = this.state
    var data = this.props.weather && this.props.weather.futur ? this.convertToChartPieData(this.props.weather.futur) : []
    return (
      <div className="weather">
          <Row
            alignXs="center"
            valignXs="middle">
            <Column autoXs>
              <Content>
                {this.props.weather
                  ? <div className="main">
                      <WeatherIcon
                        size={100}
                        color="#A53C83"
                        name={this.props.weather.icon} />
                    </div>
                  : null}
              </Content>
            </Column>
          </Row>
          <DataList data={[
              {title: "Time", value: moment(this.props.weather.time).format('hh:mm')},
              {title: "Degree", value: `${this.props.weather.degree}°`},
              {title: "Wind", value: this.props.weather.wind},
              {title: "Humidity", value: this.props.weather.humidity},
            ]}
            left="title"
            right="value"/>
          <Row
            alignXs="center"
            valignXs="middle">
            <Column autoXs>
              <Content>
                {this.props.weather && this.props.weather.futur
                  ? <ChartLine
                      width={width}
                      height={height}
                      data={data} />
                  : null}
              </Content>
            </Column>
          </Row>
          <Row
            alignXs="center"
            valignXs="middle">
            <Column autoXs>
              <Content>
                {this.props.weather && this.props.weather.futur
                  ? <Legend
                      width={width}
                      data={data} />
                  : null}
              </Content>
            </Column>
        </Row>
      </div>
    )
  }

  // <h2 className="title">Later</h2>
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