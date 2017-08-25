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

  render () {
    const { data, left, right, icon, onClick } = this.props
    return (
      <div className="data-list">
      {data
        ? data.map((item, i) => {
          return <Row className="line" key={i}>
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
                ? <span onClick={() => onClick && onClick(item, i)}>
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