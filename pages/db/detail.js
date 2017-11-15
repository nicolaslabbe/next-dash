import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Link from "next/link";
import { connect } from "react-redux";

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import ApiActions from "../../Redux/ApiRedux";
import SqlActions from "../../Redux/SqlRedux";

// Components
import { Header, MenuBottom, Card } from "../../components/ui";
import { List } from "../../components/rich";

import Utils from "../../Utils";

class Page extends React.Component {
  static async getInitialProps({ store, isServer, query }) {
    store.dispatch(SqlActions.favoriteGetRequest(query.type, "id", query.id));
    store.dispatch(ApiActions.apiDetailRequest(query.type, query.id));
    return {
      type: query.type,
      id: query.id,
      display: query.display
    };
  }

  render() {
    const { result, display, type, item } = this.props;

    return (
      <div className={type}>
        <Header id={this.props.id} title={type} close type={type} />
        {result[type] ? (
          <List
            detail={true}
            display={display}
            type={type}
            items={result[type]}
          />
        ) : null}
        <MenuBottom />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: state.api.detail || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetail: (type, id) => dispatch(ApiActions.apiDetailRequest(type, id))
  };
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
