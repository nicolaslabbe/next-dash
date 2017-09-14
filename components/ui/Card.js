import React from 'react'

// ui
import {
  Icon,
  Text,
  ButtonText
} from '../ui'

class Card extends React.Component {

  onClickAction = (e) => {
    const { onClick } = this.props
    if (!this.refs.footer.contains(e.target)) {
      onClick && onClick(e)
    }
  }

  render () {
    const { className, onClick } = this.props
    return (
      <div className="card" onClick={(e) => this.onClickAction(e)}>
        <div className="card-content">
          <div className="card-header">
            <img src={this.props.image} width="100" />
            <Text className="title">{this.props.title && this.props.title.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
          </div>
          <div className="card-body">
            <Text className="description">{this.props.description && this.props.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            {this.props.children}
          </div>
          <div
            className="card-footer"
            ref="footer">
          {this.props.actions
            ? this.props.actions.map((action, i) => {
              return <ButtonText
                key={i}
                color="regular"
                onClick={(e) => action.fn && action.fn(e)}>
              {action.name}
              </ButtonText>
            })
            : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Card