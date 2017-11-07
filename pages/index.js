import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Raven from "raven-js";

Raven.config(
  `https://${process.env.SENTRY_KEY}@sentry.io/${process.env.SENTRY_PROJECT_ID}`
).install();

import Utils from "../Utils";

// Redux
import rootReducer from "../Redux";

// Reduceurs
import DashboardActions from "../Redux/DashboardRedux";
import ListActions from "../Redux/ListRedux";

// Components
import { Header, AppIcon } from "../components/ui";
import { Row } from "../components/layout";
import { Bric } from "../components/rich";

class Page extends React.Component {
  static async getInitialProps({ store, isServer }) {
    store.dispatch(DashboardActions.dashboardRequest());
    return {};
  }

  registerServiceWorker = () => {
    if (navigator && "serviceWorker" in navigator) {
      navigator.serviceWorker
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
    }
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
      if (
        typeof window.Notification !== "undefined" &&
        window.Notification !== null &&
        window.Notification.permission !== "granted"
      ) {
        this.askPermission();
      }
    }
  };

  render() {
    return (
      <div>
        <Row>
          {this.props.dashboard.items && this.props.dashboard.items.map((item, i) =>
            <Bric {...item} key={i} />)}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    save: (name, item, duplicate) =>
      dispatch(ListActions.listAdd(name, item, duplicate))
  };
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
