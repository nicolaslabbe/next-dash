import React from "react";
import Router from "next/router";
import Link from "next/link";

// ui
import { Title, AppIcon } from "../ui";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: null,
      windowClick: this.handleClick.bind(this)
    };
  }

  handleClick = e => {
    if (
      this.refs.main &&
      !this.refs.main.contains(e.target) &&
      this.state.open
    ) {
      this.toggleMenu();
    }
  };

  componentWillMount = () => {
    if (typeof document !== "undefined") {
      document.addEventListener("click", this.state.windowClick, false);
    }
  };

  componentWillUnmount = () => {
    if (typeof document !== "undefined") {
      document.removeEventListener("click", this.state.windowClick, false);
    }
  };

  toggleMenu = event => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const open =
      this.state.open === null ? "" : this.state.open ? "open" : "close";
    const { items } = this.props;

    return (
      <div className={`menu-bottom ${open}`}>
        <div className="items">
          {items && items.length > 1
            && items.map((item, i) => {
              return (
                <Link key={i} prefetch href={`${item.path}`}>
                  <a className="item">
                    <AppIcon
                      className={`${item.name} item`}
                      name={`${item.icon}`}
                    />
                  </a>
                </Link>
              );
            })}
        </div>
        {items && items.length > 1 ?
          <div ref="main">
            <AppIcon
              className="red main visible-close"
              name="apps"
              onClick={event => this.toggleMenu(event)}
            />
            <AppIcon
              className="red main visible-open"
              name="add"
              onClick={event => this.toggleMenu(event)}
            />
          </div>
        : items && items.length === 1
            ?
              <Link prefetch href={`${items[0].path}`}>
                <a className="item">
                  <AppIcon
                    className={`${items[0].name} main`}
                    name={`${items[0].icon}`}
                  />
                </a>
              </Link>
            :
              <div>
                <AppIcon
                  className="red main visible-close"
                  name="arrow_back"
                  onClick={event => Router.back()}
                />
              </div>}
      </div>
    );
  }
}

export default Header;
