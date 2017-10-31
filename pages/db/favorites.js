import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import ListActions from "../../Redux/ListRedux";

// Components
import { Header, MenuBottom } from "../../components/ui";
import { Cards } from "../../components/rich";

class Page extends React.Component {
  static async getInitialProps({ store, isServer, query }) {
    store.dispatch(ListActions.listRequest(query.type, 1));
    return {
      type: query.type
    };
  }

  render() {
    const { list } = this.props;
    const type = this.props.url.query.type;

    return (
      <div className="favorites">
        <Header title="Favorites" close />
        {list[this.props.type] && list[this.props.type].items ? (
          <Cards
            type={type}
            detail={false}
            delete={true}
            items={list[this.props.type].items}
          />
        ) : null}
        <MenuBottom current="favorites" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
