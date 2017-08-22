import React from 'react'
import { connect } from 'react-redux'

import Utils from "../Utils"

class Train extends React.Component {
  render () {
    const { stations } = this.props
    return (
      <div>
      <h2>Train</h2>
      {stations
        ? stations.map((station, i) => {
          return station.map((item, i) => {
            return <div key={i}>
              <div>{item.name}</div>
              <ul>
              {item.departures.map((departure, j) => {
                return <li key={j}>time: {Utils.date.remaining(departure.time)}</li>
              })}
            </ul>
          </div>
          })
        })
        : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    stations: state.train.stations || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Train)