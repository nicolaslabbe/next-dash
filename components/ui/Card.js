import React from 'react'

// ui
import {
  Icon,
  Text,
  ButtonText
} from '../ui'

class Card extends React.Component {

  render () {
    const { className } = this.props
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-header">
            <img src={this.props.image} width="100" />
            <Text className="title">{this.props.title && this.props.title.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
          </div>
          <div className="card-body">
            <Text className="description">{this.props.description && this.props.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
          </div>
          <div className="card-footer">
            <ButtonText
              color="regular"
              onClick={() => this.props.onOpen && this.props.onOpen()}>
            Read
            </ButtonText>
            <ButtonText
              color="regular"
              onClick={() => this.props.onSave && this.props.onSave(this.props)}>
            Later
            </ButtonText>
          </div>
        </div>
      </div>
    )
  }
}

export default Card