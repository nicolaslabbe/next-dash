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
        ? Object.keys(stations).map((name, i) => {
          const { departures } = stations[name]
          return <div key={i}>
              <div>{name}</div>
              <ul>
              {departures.map((departure, j) => {
                return <li key={j}>time: {Utils.date.remaining(departure.time)}</li>
              })}
            </ul>
          </div>
        })
        : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stations: state.train.stations || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Train)