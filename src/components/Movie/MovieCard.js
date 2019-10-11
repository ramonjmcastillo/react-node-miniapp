import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

class MovieCard extends React.Component {
  render() {
    const { title, year, plot, poster, _id } = this.props.details;
    if (!poster || poster === "N/A") {
      return null;
    }
    console.log("inside movie card properino", this.props.details);
    return (
      <Link to={`/movie/${_id}`}>
        <div className="movie-card-container">
          <div className="image-container">
            <div
              className="bg-image"
              style={{ backgroundImage: `url(${poster})` }}
            />
          </div>
          <div className="movie-info">
            <h2>Movie Details</h2>
            <div>
              <h1>{title}</h1>
              <small>Released Date: {year}</small>
            </div>
            {/* <h4>Rating: {imdbRating} / 10</h4> */}
            <p>{plot && plot.substr(0, 350)}...</p>
            <div className="tags-container">
              {this.props.details.genres ? (
                this.props.details.genres.map(genre => {
                  return <span> {genre}</span>;
                })
              ) : (
                <p> No genres available </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default MovieCard;
