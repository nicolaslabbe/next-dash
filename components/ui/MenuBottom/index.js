import React from "react";
import Router from "next/router";
import Link from "next/link";

// ui
import { Title, AppIcon } from "../";
import style from "./style.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;

    return (
      <div className="menu-bottom">
        {item ? (
          <Link prefetch href={`${item.path}`}>
            <a className="link">
              <AppIcon className="main" name={`${item.icon}`} />
            </a>
          </Link>
        ) : (
          <AppIcon
            className="main"
            name="arrow_back"
            onClick={event => Router.back()}
          />
        )}
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Header;
