import React from "react";
import { connect } from "react-redux";
import { Line } from "nivo";

import WeatherIcon from "../ui/WeatherIcon";

const { renderToStaticMarkup } = require("react-dom/server");

class ChartLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClient: false
    };
  }

  componentDidMount = () => {
    this.setState({
      isClient: true
    });
  };

  render() {
    const axisBottom = {
      orient: "bottom",
      tickSize: 0,
      tickPadding: 10,
      tickRotation: 0,
      legend: "",
      legendOffset: 36,
      legendPosition: "center"
    };
    const axisLeft = {
      orient: "left",
      tickSize: 0,
      tickPadding: 10,
      tickRotation: 0,
      legend: "",
      legendOffset: -40,
      legendPosition: "center"
    };
    const margin = { top: 20, right: 15, bottom: 25, left: 25 };

    if (this.state.isClient) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: `<?xml version="1.0" ?>
                    ${renderToStaticMarkup(
                      <Line
                        width={this.props.width - margin.right}
                        height={this.props.height - margin.top - margin.bottom}
                        margin={margin}
                        axisBottom={axisBottom}
                        enableGridX={false}
                        enableGridY={false}
                        axisLeft={axisLeft}
                        stacked={false}
                        curve="basis"
                        colorBy={function(e) {
                          return e.color;
                        }}
                        enableMarkers={true}
                        markersSize={0}
                        markersColor="inherit:darker(.3)"
                        markersBorderWidth={2}
                        markersBorderColor="#fff"
                        enableMarkersLabel={false}
                        markersLabel="y"
                        markersLabelYOffset={-12}
                        animate={false}
                        motionStiffness={90}
                        motionDamping={15}
                        isInteractive={false}
                        enableStackTooltip={true}
                        data={this.props.data}
                        getIndex={function(e) {
                          return e;
                        }}
                      />
                    )}`
          }}
        />
      );
    } else {
      return null;
    }
  }
}

export default ChartLine;
