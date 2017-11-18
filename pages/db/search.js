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
import {
  Header,
  MenuBottom,
  BottomInput,
  ScrollView
} from "../../components/ui";

import { List } from "../../components/rich";

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      fetching: false,
      value: ""
    };
  }

  static async getInitialProps({ store, isServer, query }) {
    return {
      type: query.type,
      display: query.display
    };
  }

  handleSubmit = item => {};

  componentWillReceiveProps = nextProps => {
    if (!nextProps.fetching && this.state.fetching) {
      this.setState({
        fetching: false
      });
    }
  };

  handlePagination = item => {
    if (!this.props.fetching) {
      this.setState({
        page: this.state.page + 1,
        fetching: true
      });
      this.props.find(this.props.type, this.state.value, this.state.page + 1);
    }
  };

  handleChange = item => {
    this.setState({
      value: item,
      page: 1,
      fetching: true
    });
    this.props.find(this.props.type, item, 1);
  };

  render() {
    const { result, display, type } = this.props;

    return (
      <ScrollView
        loading={false}
        onScrollEnd={() => this.handlePagination()}
        className={type}
      >
        <Header title={this.props.type} close />
        <BottomInput
          onChange={value => this.handleChange(value)}
          onSubmit={value => this.handleSubmit(value)}
        />
        {result[type] ? (
          <List
            detail={false}
            display={display}
            type={type}
            items={result[type]}
          />
        ) : null}
        <MenuBottom />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: state.api.search || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    find: (type, name, page) =>
      dispatch(ApiActions.apiSearchRequest(type, name, page))
  };
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
