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

  constructor(props) {
    super(props);
  
    this.state = {
      selected: [],
      multiSelect: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.multiSelect && !nextProps.multiSelect) {
      this.setState({
        selected: [],
        multiSelect: nextProps.multiSelect
      })
    }else if (!this.state.multiSelect && nextProps.multiSelect) {
      this.setState({
        multiSelect: nextProps.multiSelect
      })
    }
  }

  onSelect = (event, item, i) => {
    var index = this.state.selected.indexOf(i)
    var selected = []
    if (index > -1) {
      this.state.selected.splice(index, 1)
      selected = this.state.selected
    }else {
      selected = [...this.state.selected, i]
    }
    this.setState({
      selected
    })
    this.props.onSelectedChange && this.props.onSelectedChange(selected)
  }

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
    const { data, left, right, icon, multiSelect } = this.props
    return (
      <div className="data-list">
      {data
        ? data.map((item, i) => {
          var selected = this.state.selected.indexOf(i) >= 0
          return <Row
            className={`line ${selected ? 'selected' : null}`}
            key={i}
            onClick={(event) => multiSelect ? this.onSelect(event, item, i) : null}>
          <Column
            xs={item[right] ? 6 : 12}
            className="left">
            <Content>
              {multiSelect
                ? selected
                  ? <Icon name="check_box" />
                  : <Icon name="check_box_outline_blank" />
                : null}

              {item[left]
                ? item[left] + ' ' + i
                : null}
            </Content>
          </Column>
          {item[right]
            ? <Column
              xs={6}
              className="right">
              <Content>
                {item[right]
                  ? item[right]
                  : null}
              </Content>
            </Column>
            : null}
        </Row>
        })
        : null}
      </div>
    )
  }
}

export default DataList