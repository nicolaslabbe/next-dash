import React from "react";
import Router from "next/router";
import { connect } from "react-redux";

// Layout
import { Row, Column, Content } from "../layout";

// ui
import { Title, ButtonIcon } from "../ui";

import SqlActions from "../../Redux/SqlRedux";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null
    };
  }

  componentWillReceiveProps = nextProps => {
    if (!this.state.item && nextProps.item) {
      if (
        typeof nextProps.item !== "undefined" &&
        nextProps.item &&
        typeof nextProps.item.id !== "undefined" &&
        nextProps.item.id
      ) {
        this.props.getFavorite(this.props.type, "id", nextProps.item.id);
      }
      this.setState({
        item: nextProps.item
      });
    }
  };

  goBack = () => {
    Router.push("/");
  };

  favorite = () => {
    const { item, current, type, favorite } = this.props;

    if (this.isFavorite()) {
      this.props.removeFromFavorite(type, [favorite.apiId]);
    } else {
      this.props.addToFavorite(
        type,
        item,
        item.id ? { key: "id", value: item.id } : null
      );
    }

    this.setState({
      liking: true
    });
  };

  isFavorite = () => {
    const { item, favorite } = this.props;

    if (favorite && item && item.id === favorite.id) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { item, current, type } = this.props;

    return (
      <Row className="header" alignXs="center" valignXs="middle">
        <Column autoXs>
          <Content>
            {this.props.close && (
              <ButtonIcon
                className="close"
                icon="close"
                onClick={() => this.goBack()}
                dark
              />
            )}
            <Title>{this.props.title}</Title>
            {this.props.item && (
              <ButtonIcon
                className="favorite"
                icon={this.isFavorite() ? "star" : "star_border"}
                onClick={() => this.favorite()}
                dark
              />
            )}
          </Content>
        </Column>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorite: state.sql.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavorite: (name, key, value) =>
      dispatch(SqlActions.favoriteGetRequest(name, key, value)),
    addToFavorite: (name, item, duplicate) =>
      dispatch(SqlActions.favoriteAddRequest(name, item, duplicate)),
    removeFromFavorite: (name, id) =>
      dispatch(SqlActions.favoriteRemoveRequest(name, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
