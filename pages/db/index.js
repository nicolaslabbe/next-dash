import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import ApiActions from "../../Redux/ApiRedux";

// Components
import { Header, MenuBottom, ScrollView } from "../../components/ui";
import { List } from "../../components/rich";

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }

  static async getInitialProps({ store, isServer, query }) {
    store.dispatch(ApiActions.apiRequest(query.type, 1));
    return {
      type: query.type,
      display: query.display
    };
  }

  more = type => {
    this.setState({
      page: this.state.page + 1
    });
    this.props.more(type, this.state.page + 1);
  };

  render() {
    const { result, type, display } = this.props;
    return (
      <ScrollView onScrollEnd={() => this.more(type)} className={type}>
        <Header title={type} close />
        {result[type] ? (
          <List
            detail={false}
            display={display}
            type={type}
            items={result[type]}
          />
        ) : null}
        <MenuBottom
          item={{
            name: "search",
            icon: "search",
            path: `/db/search?type=${type}${display
              ? "&display=" + display
              : ""}`
          }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: state.api.result || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    more: (type, page) => dispatch(ApiActions.apiRequest(type, page))
  };
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
