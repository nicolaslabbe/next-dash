import React from "react";

class ScrollView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handleScroll: this.handleScroll.bind(this)
    };
  }

  componentWillMount = () => {
    if (typeof document !== "undefined") {
      document.addEventListener("scroll", this.state.handleScroll, false);
    }
  };

  componentWillUnmount = () => {
    if (typeof document !== "undefined") {
      document.removeEventListener("scroll", this.state.handleScroll, false);
    }
  };

  handleScroll(event) {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.props.onScrollEnd && this.props.onScrollEnd();
    }
  }

  render() {
    return (
      <div ref="scrollview" className={`scrollview ${this.props.className}`}>
        {this.props.children}
        <div>{this.props.loading ? <span>loading...</span> : null}</div>
      </div>
    );
  }
}

export default ScrollView;
