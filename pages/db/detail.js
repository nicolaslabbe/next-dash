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
import dbActions from "../../Redux/DbRedux";

// Components
import { Header, MenuBottom, Card } from "../../components/ui";
import { List } from "../../components/rich";

import Utils from "../../Utils";

class Page extends React.Component {
  static async getInitialProps({ store, isServer, query }) {
    store.dispatch(dbActions.dbDetailRequest(query.type, query.id));
    return {
      type: query.type,
      id: query.id,
      display: query.display
    };
  }

  render() {
    const { result, display, type, item } = this.props;

    var favorite =
      result[type] && Array.isArray(result[type])
        ? result[type][0] && result[type][0].detail
        : result[type].detail;

    return (
      <div className={type}>
        <Header item={favorite} title={type} close type={type} />
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
    result: state.db.detail || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetail: (type, id) => dispatch(dbActions.dbDetailRequest(type, id))
  };
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
