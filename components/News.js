import React from 'react'
import { connect } from 'react-redux'

import Icon from "./ui/Icon"
import Utils from "../Utils"

class News extends React.Component {
  render () {
    const { articles } = this.props
    return (
      <div>
      <h2>News</h2>
      {articles
        ? articles.map((article, i) => {
          return <ul key={i}>
              <li><Icon name="assignment" /></li>
              <li>{article.title}</li>
              <li>Date: {Utils.date.timestampToHumain(article.publishedAt)}</li>
              <li><img src={article.urlToImage} width="100" /></li>
          </ul>
        })
        : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.news.articles || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)