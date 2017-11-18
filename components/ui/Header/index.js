import React from "react";
import Router from "next/router";
import { connect } from "react-redux";

// Layout
import { Row, Column, Content } from "../../layout";

// ui
import { Title, ButtonIcon } from "../";
import style from "./style.css";

import SqlActions from "../../../Redux/SqlRedux";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null
    };
  }

  goBack = () => {
    Router.push("/");
  };

  favorite = () => {
    const { id, current, type, favorite } = this.props;

    if (this.isFavorite()) {
      this.props.removeFromFavorite(type, [favorite.apiId]);
    } else {
      this.props.addToFavorite(type, id, id ? { key: "id", value: id } : null);
    }

    this.setState({
      liking: true
    });
  };

  isFavorite = () => {
    const { id, favorite } = this.props;

    if (favorite && id && id == favorite.id) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { id, current, type } = this.props;

    return (
      <div className="header">
        <Row alignXs="center" valignXs="middle">
          <Column autoXs>
            <Content>
              {this.props.close && (
                <div className="close">
                  <ButtonIcon
                    color="white"
                    icon="close"
                    onClick={() => this.goBack()}
                    dark
                  />
                </div>
              )}
              <Title>{this.props.title}</Title>
              {id && (
                <div className="favorite">
                  <ButtonIcon
                    color="black"
                    icon={this.isFavorite() ? "star" : "star_border"}
                    onClick={() => this.favorite()}
                    dark
                  />
                </div>
              )}
            </Content>
          </Column>
        </Row>
        <style jsx>{style}</style>
      </div>
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
    addToFavorite: (name, id, duplicate) =>
      dispatch(SqlActions.favoriteAddRequest(name, id, duplicate)),
    removeFromFavorite: (name, id) =>
      dispatch(SqlActions.favoriteRemoveRequest(name, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
