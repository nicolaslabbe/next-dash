import React from "react";

// ui
import { Text } from "../";

class Card extends React.Component {
  onClickAction = e => {
    const { onClick } = this.props;
    onClick && onClick(e);
  };

  render() {
    const { className, onClick, data } = this.props;
    return (
      <div className="card" onClick={e => this.onClickAction(data)}>
        {data && (
          <div className="card-content">
            <div className="card-header">
              <img src={data.image} width="100" />
              <Text className="title">
                {data.title && data.title.replace(/<\/?[^>]+(>|$)/g, "")}
              </Text>
            </div>
            <div className="card-body">{this.props.children}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Card;
