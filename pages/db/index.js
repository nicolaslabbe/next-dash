import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import DbActions from "../../Redux/DbRedux";

// Components
import { Header, MenuBottom, ScrollView } from "../../components/ui";
import { Cards } from "../../components/rich";

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }

  static async getInitialProps({ store, isServer, query }) {
    store.dispatch(DbActions.dbRequest(query.type, 1));
    return {
      type: query.type
    };
  }

  more = type => {
    this.setState({
      page: this.state.page + 1
    });
    this.props.more(type, this.state.page + 1);
  };

  render() {
    const { result } = this.props;
    const type = this.props.url.query.type;

    return (
      <ScrollView onScrollEnd={() => this.more(type)} className="movie">
        <Header title={type} close />
        {result[this.props.type] ? (
          <Cards
            detail={false}
            type={type}
            items={result[this.props.type].items}
          />
        ) : null}
        <MenuBottom
          items={[
            {
              name: "favorites",
              icon: "stars",
              path: `/db/favorites?type=${type}`
            },
            {
              name: "search",
              icon: "search",
              path: `/db/search?type=${type}`
            }
          ]}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: state.db.result || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    more: (type, page) => dispatch(DbActions.dbRequest(type, page))
  };
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
