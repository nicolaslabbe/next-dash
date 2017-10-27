import React from "react";

class Legend extends React.Component {
  render() {
    return (
      <div className="legend" style={{ width: this.props.width }}>
        {this.props.data
          ? this.props.data.map((item, i) => {
              return (
                <div key={i}>
                  <div className="color" style={{ background: item.color }} />
                  {item.id}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default Legend;
