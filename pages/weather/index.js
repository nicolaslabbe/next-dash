import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Link from "next/link";

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import WeatherActions from "../../Redux/WeatherRedux";

// Components
import { Lists } from "../../components/rich";
import { Header, MenuBottom } from "../../components/ui";

class Page extends React.Component {
  static async getInitialProps({ store, isServer }) {
    store.dispatch(WeatherActions.weatherRequest("current"));
    return {};
  }

  render() {
    const { weather } = this.props;
    return (
      <div>
        <Header title="weather" close />
        {weather ? <Lists list={weather.items} /> : null}
        <MenuBottom />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    weather: (state.weather && state.weather.current) || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
