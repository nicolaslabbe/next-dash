import React from 'react'
import { connect } from 'react-redux'

import { Icon, Card } from "./ui"
import Utils from "../Utils"

// Reduceurs
import DataActions from '../Redux/DataRedux'

class News extends React.Component {

  openLink = (url) => {
    if(typeof window !== 'undefined') {
      window.open(url)
    }
  }

  saveLink = (article) => {
    this.props.save('articles', article)
  }

  render () {
    const { articles } = this.props
    return (
      <div className="news">
        {articles
          ? articles.map((article, i) => {
            return <Card
                      key={i}
                      icon="assignment"
                      title={article.title}
                      description={article.description}
                      date={Utils.date.timestampToHumain(article.publishedAt)}
                      onSave={() => this.saveLink(article)}
                      onOpen={(url) => this.openLink(article.url)}
                      image={article.urlToImage} />
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
    save: (name, item) => dispatch(DataActions.dataAdd(name, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)