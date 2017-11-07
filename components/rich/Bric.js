import React from "react";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";

import Utils from "../../Utils";
import { Row, Column, Content } from "../layout";
import { AppIcon } from "../ui";

class Bric extends React.Component {
  render() {
    const { url, name, icon, size, className, items } = this.props;

    return (
      <Column
        className={`bric ${className}`}
        xs={size.xs ? size.xs : null}
        sm={size.sm ? size.sm : null}
        md={size.md ? size.md : null}
        lg={size.lg ? size.lg : null}
      >
        <Content>
          <Link prefetch href={url}>
            <a>
              <div className="title">{name}</div>
              {items && items.map((item, i) => {})}
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
