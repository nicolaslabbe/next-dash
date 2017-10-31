import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import Link from "next/link";
import Router from "next/router";

// Redux
import rootReducer from "../../Redux";

// Reduceurs
import ListActions from "../../Redux/ListRedux";

// Components
import EditableList from "../../components/EditableList";
import { Header, MenuBottom, Modal, Confirm } from "../../components/ui";

class Page extends React.Component {
  static async getInitialProps({ store, isServer, query }) {
    store.dispatch(ListActions.listRequest(query.type, 1));
    return {
      type: query.type
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      confirmVisible: false,
      modalVisible: false,
      multiSelect: false
    };
  }

  save = (name, item) => {
    item.detail = [];
    this.props.save(name, item);
  };

  remove = (name, id) => {
    this.setState({
      confirmVisible: false,
      multiSelect: false
    });
    this.props.remove(
      this.props.type,
      this.refs.editableList.state.selectedIds
    );
  };

  removeAll = () => {
    this.props.removeAll(this.props.type);
    this.setState({ modalVisible: false });
  };

  comfirmRemoveAll = () => {
    this.setState({ modalVisible: true });
  };

  onClick = (item, i) => {
    Router.push(`/list?type=list-${item.apiId}`);
  };

  render() {
    var { type } = this.props
    return (
      <div>
        <Header
          title="notes"
          close
          menu={[
            {
              name: "edit",
              fn: () =>
                this.setState({ confirmVisible: true, multiSelect: true })
            },
            {
              name: "remove all",
              fn: () => this.comfirmRemoveAll()
            }
          ]}
        />
        {this.props.list &&
        type &&
        this.props.list[type] ? (
          <EditableList
            ref="editableList"
            data={this.props.list[this.props.type].items}
            multiSelect={this.state.multiSelect}
            onClick={(item, i) => this.onClick(item, i)}
            onSave={(name, item) => this.save(type, item)}
            onRemove={(name, id) => this.remove(type, id)}
            onRemoveAll={(name, id) => this.remove(type, id)}
            name="notes"
          />
        ) : null}
        {this.state.confirmVisible ? null : <MenuBottom />}
        <Modal
          ref="modal"
          visible={this.state.modalVisible}
          onCancel={() => this.setState({ modalVisible: false })}
          onValid={() => this.removeAll()}
        />
        <Confirm
          ref="confirm"
          visible={this.state.confirmVisible}
          onCancel={() =>
            this.setState({ confirmVisible: false, multiSelect: false })}
          onConfirm={() => this.remove()}
        />
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
  return {
    save: (name, item) => dispatch(ListActions.listAdd(name, item)),
    remove: (name, id) => dispatch(ListActions.listRemove(name, id)),
    removeIds: (name, ids) => dispatch(ListActions.listRemoveIds(name, ids)),
    removeAll: (name, id) => dispatch(ListActions.listRemoveAll(name))
  };
};

export default withRedux(rootReducer, mapStateToProps, mapDispatchToProps)(
  withReduxSaga(Page)
);
