import React from "react";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";

import Utils from "../../Utils";
import { Row, Column, Content } from "../layout";

class Bric extends React.Component {

  render() {
    const { link, name } = this.props;

    return (
      <Column>
        <Content>
          <Link prefetch href={link}>
            <a>
              {name}
            </a>
          </Link>
        </Content>
      </Column>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bric);
