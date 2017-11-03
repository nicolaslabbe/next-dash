import React from "react";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";

import Utils from "../../Utils";
import { Row, Column, Content } from "../layout";
import { AppIcon } from "../ui";

class Bric extends React.Component {
  render() {
    const { url, name, icon } = this.props;

    return (
      <Column>
        <Content>
          <Link prefetch href={url}>
            <a>
              <AppIcon className={name} name={icon} />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Bric);
