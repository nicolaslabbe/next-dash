import React from 'react'
import { connect } from 'react-redux'

// Layout
import {
  Row,
  Column,
  Content
} from '../layout'

class DataList extends React.Component {

  render () {
    const { data } = this.props
    return (
      <div className="data-list">
      {data
        ? data.map((item, i) => {
          return <Row className="line" key={i}>
          <Column xs={6} className="left">
            <Content>
              {item.left}
            </Content>
          </Column>
          <Column xs={6} className="right">
            <Content>
              {item.right}
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