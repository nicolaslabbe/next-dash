import React from "react";
import style from "./style.css";

class Video extends React.Component {
  render() {
    var { id, type } = this.props;
    return (
      <div className="video">
        {type.toLowerCase() == "youtube" ? (
          <iframe
            className="youtube"
            width="100%"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allowFullScreen
          />
        ) : null}

        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Video;
