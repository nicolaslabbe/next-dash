import React from 'react'
import { connect } from 'react-redux'
import { ResponsiveLine } from "nivo"

import WeatherIcon from "../ui/WeatherIcon"

class ChartLine extends React.Component {

  render () {
    const axisBottom = {"orient":"bottom","tickSize":0,"tickPadding":10,"tickRotation":0,"legend":"force","legendOffset":36,"legendPosition":"center"}
    const axisLeft = {"orient":"left","tickSize":0,"tickPadding":10,"tickRotation":0,"legend":"degree","legendOffset":-40,"legendPosition":"center"}
    const margin = {"top":20,"right":15,"bottom":25,"left":25}
    return (
      <div>
          <ResponsiveLine
            width={this.props.width}
            height={this.props.height}
            margin={margin}
            axisBottom={axisBottom}
            enableGridX={false}
            enableGridY={false}
            axisLeft={axisLeft}
            stacked={false}
            curve="basis"
            colorBy={function (e){return e.color}}
            enableMarkers={true}
            markersSize={0}
            markersColor="inherit:darker(.3)"
            markersBorderWidth={2}
            markersBorderColor="#fff"
            enableMarkersLabel={false}
            markersLabel="y"
            markersLabelYOffset={-12}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
            enableStackTooltip={true}
            data={this.props.data}
            getIndex={function (e){
                return e
            }}
            />
      </div>
    )
  }
}

export default ChartLine