import React from 'react'
import { connect } from 'react-redux'

// Layout
import {
  Row,
  Column,
  Content
} from '../layout'

import { Icon } from "../ui"

class DataList extends React.Component {

  onClick = (event, item, i) => {
    const { onClick } = this.props
    onClick && onClick(item, i)
  }

  onClickIcon = (event, item, i) => {
    event.stopPropagation()
    const { onClickIcon } = this.props
    onClickIcon && onClickIcon(item, i)
  }

  render () {
    const { data, left, right, icon } = this.props
    return (
      <div className="data-list">
      {data
        ? data.map((item, i) => {
          return <Row className="line" key={i} onClick={(event) => this.onClick(event, item, i)}>
          <Column xs={6} className="left">
            <Content>
              {item[left]
                ? item[left]
                : null}
            </Content>
          </Column>
          <Column xs={6} className="right">
            <Content>
              {item[right]
                ? item[right]
                : null}
              {icon
                ? <span onClick={(event) => this.onClickIcon(event, item, i)}>
                    <Icon name={this.props.icon} />
                  </span>
                : null}
            </Content>
          </Column>
        </Row>
        })
        : null}
      </div>
    )
  }
}

export default DataList