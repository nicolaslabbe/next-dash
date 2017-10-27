import React from "react";

class BottomInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0
    };
  }

  componentDidMount = () => {
    var isMobile = false;
    if (
      (typeof window !== "undefined" &&
        typeof navigator !== "undefined" &&
        navigator.userAgent.match(/Android/i)) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      isMobile = true;
    }
    this.state = {
      isMobile: true
    };
  };

  handleChange(event) {
    this.setState({
      currentValue: event.target.value
    });
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
    this.props.onChange && this.props.onChange(event.target.value);
  }

  handleSubmit() {
    this.props.onSubmit(this.state.currentValue);
    this.setState({
      currentValue: ""
    });
    this.refs.input.value = "";
  }

  handleFocus() {
    document.querySelector("html").classList.add("keyboardVisible");
    document.querySelector("body").classList.add("keyboardVisible");
  }

  handleBlur() {
    document.querySelector("html").classList.remove("keyboardVisible");
    document.querySelector("body").classList.remove("keyboardVisible");
  }

  render() {
    return (
      <input
        className="bottom-input"
        style={{ bottom: `${this.state.position}px` }}
        ref="input"
        type="text"
        onKeyUp={event => this.handleChange(event)}
        onBlur={event => this.handleBlur(event)}
        onFocus={event => this.handleFocus(event)}
      />
    );
  }
}

export default BottomInput;
