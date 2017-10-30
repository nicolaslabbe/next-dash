import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Link from "next/link";

import Utils from "../Utils";

// Redux
import rootReducer from "../Redux";

// Reduceurs
import WeatherActions from "../Redux/WeatherRedux";
import TrainActions from "../Redux/TrainRedux";
import DataActions from "../Redux/DataRedux";

// Components
import { Header, AppIcon } from "../components/ui";
import { Row, Column, Content } from "../components/layout";

class Page extends React.Component {
  static async getInitialProps({ store, isServer }) {
    return {};
  }

  registerServiceWorker = () => {
    return navigator.serviceWorker
      .register("service-worker.js")
      .then(registration => {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: Utils.string.urlBase64ToUint8Array(
            process.env.WEB_PUSH_PUBLIC_KEY
          )
        };

        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(pushSubscription => {
        // if (Notification.permission !== 'granted') {
        this.props.save("web-push", pushSubscription, {
          key: "endpoint",
          value: pushSubscription.endpoint
        });
        // }
        return pushSubscription;
      });
  };

  askPermission = () => {
    return new Promise((resolve, reject) => {
      const permissionResult = Notification.requestPermission(result => {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(permissionResult => {
      if (permissionResult !== "granted") {
        throw new Error("We weren't granted permission.");
      }
    });
  };

  componentWillMount = () => {
    if (typeof window !== "undefined") {
      this.registerServiceWorker();
      if (Notification.permission !== "granted") {
        this.askPermission();
      }
    }
  };

  render() {
    return (
      <div>
        <Header title="index" />
        <Row>
          <Column>
            <Content>
              <Link prefetch href="/train">
                <a>
                  <AppIcon className="train" name="train" />
                </a>
              </Link>
            </Content>
          </Column>
          <Column>
            <Content>
              <Link prefetch href="/weather">
                <a>
                  <AppIcon className="weather" name="wb_sunny" />
                </a>
              </Link>
            </Content>
          </Column>
          <Column>
            <Content>
              <Link prefetch href="/db?type=news">
                <a>
                  <AppIcon className="news" name="info" />
                </a>
              </Link>
            </Content>
          </Column>
          <Column>
            <Content>
              <Link prefetch href="/notes">
                <a>
                  <AppIcon className="notes" name="list" />
                </a>
              </Link>
            </Content>
          </Column>
          <Column>
            <Content>
              <Link prefetch href="/db?type=movie">
                <a>
                  <AppIcon className="movie" name="local_movies" />
                </a>
              </Link>
            </Content>
          </Column>
          <Column>
            <Content>
              <Link prefetch href="/db?type=serie">
                <a>
                  <AppIcon className="movie" name="live_tv" />
                </a>
              </Link>
            </Content>
          </Column>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    save: (name, item, duplicate) =>
      dispatch(DataActions.dataAdd(name, item, duplicate))
  };
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
