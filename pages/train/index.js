import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Router from "next/router";

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import TrainActions from "../../Redux/TrainRedux";

// Components
import { Header, MenuBottom } from "../../components/ui";

// ui
import { Lists } from "../../components/rich";

class Page extends React.Component {
  static async getInitialProps({ store, isServer }) {
    store.dispatch(
      TrainActions.trainRequest(JSON.parse(process.env.TRAIN_STOPS))
    );
    return {};
  }

  render() {
    const { stations } = this.props;

    return (
      <div>
        <Header title="train" close />
        {stations ? <Lists list={stations} /> : null}
        <MenuBottom />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.train.stations || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
