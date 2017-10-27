import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Link from "next/link";

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import dbActions from "../../Redux/DbRedux";

// Components
import { Header, MenuBottom, Card } from "../../components/ui";
import { Cards } from "../../components/rich";

import Utils from "../../Utils";

class Page extends React.Component {
  static async getInitialProps({ store, isServer, query }) {
    store.dispatch(dbActions.dbDetailRequest(query.type, query.id));
    return {
      type: query.type,
      id: query.id
    };
  }

  render() {
    const { detail } = this.props;

    return (
      <div className="movie">
        <Header title="movie" close />
        {detail[this.props.type] && detail[this.props.type].items ? (
          <Cards detail={true} items={[detail[this.props.type].items]} />
        ) : null}
        <MenuBottom />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    detail: state.db.detail || {}
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
