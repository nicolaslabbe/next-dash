import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import MovieActions from '../../Redux/MovieRedux'

// Components
import { Header, MenuBottom } from '../../components/ui'
import { Movies } from '../../components/rich'

class Page extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	page: 1,
	  	handleScroll: this.handleScroll.bind(this)
	  }
	}

	static async getInitialProps ({ store, isServer }) {
		store.dispatch(MovieActions.discoverRequest(1))
		return {}
	}

    componentWillMount = () => {
    	if (typeof document !== 'undefined') {
    		document.addEventListener('scroll', this.state.handleScroll, false);
    	}
    }

    componentWillUnmount = () => {
    	if (typeof document !== 'undefined') {
    		document.removeEventListener('scroll', this.state.handleScroll, false);
    	}
    }

	handleScroll(event) {
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;
		if (windowBottom >= docHeight) {
			this.setState({
				page: this.state.page + 1
			})
			this.props.discoverMore(this.state.page + 1)
		}
	}

	render () {
		const { movies } = this.props

    	return (
			<div className="movie">
				<Header
					title="movie"
					close />
					{movies
						? <Movies movies={this.props.movies} />
						: null}
				<MenuBottom
					items={[{
						name: 'favorites',
						icon: 'stars',
						path: '/movie/favorites'
					},
					{
						name: 'search',
						icon: 'search',
						path: '/movie/search'
					}]} />
			</div>
    	)
	}
}

const mapStateToProps = (state) => {
  return {
    movies: state.movie.discover
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    discoverMore: (page) => dispatch(MovieActions.discoverRequest(page))
  }
}

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
)