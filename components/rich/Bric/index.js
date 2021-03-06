import React from "react";
import Link from "next/link";

import { Row, Column, Content } from "../../layout";

import style from "./style.css";

class Bric extends React.Component {
  render() {
    const { url, name, icon, size, className, items } = this.props;

    return (
      <div className="bric">
        <Column
          className={`${className}`}
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
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Bric;
