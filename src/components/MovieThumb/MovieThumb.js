import React from "react";
import "./MovieThumb.css";

const noPoster = e => {
  e.target.src = require("../../assets/images/no_image.jpg");
};

const MovieThumb = props => {
  return (
    <div className="rmdb-moviethumb">
      <img
        alt="Movie Thumbnail"
        className="clickable"
        src={props.image}
        onError={noPoster}
      />
    </div>
  );
};
export default MovieThumb;
