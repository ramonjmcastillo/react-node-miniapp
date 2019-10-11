import React from "react";
import { Link } from "react-router-dom";
import "./MovieThumbNail.css";

const noPoster = e => {
  e.target.src = require("../../assets/images/no_image.jpg");
};

const MovieThumbNail = props => {
  // console.log(props.detils._id);
  return (
    <Link to={`/movie/${props.details._id}`}>
      <div className="movie-thumbnail">
        <div className="movie-thumbnail clickable">
          <img
            alt="Movie Thumbnail"
            src={props.altImage ? props.altImage : props.details.poster}
            onError={noPoster}
          />
        </div>
      </div>
    </Link>
  );
};

export default MovieThumbNail;
