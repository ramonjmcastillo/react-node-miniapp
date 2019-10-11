import React, { useState } from "react";
import FontAwesome from "react-fontawesome";
import MovieThumb from "../MovieThumb/MovieThumb";
import "./MovieInfo.css";
import NoImage from "../../assets/images/no_image.jpg";
import Modal from "../Modal/Modal";

const MovieInfo = props => {
  const [isShowing, setisShowing] = useState(false);

  const [screenPosition, setScreenPosition] = useState(window.pageYOffset);

  const openModal = () => {
    setisShowing(true);
  };

  const closeModal = () => {
    setisShowing(false);
  };
  console.log("inside movieinfo", props);
  return (
    <div>
      <div
        className="rmdb-movieinfo"
        style={{
          background: props.backdrop_path
            ? `url('${props.backdrop_path}')`
            : "#800"
        }}
      >
        <div className="rmdb-movieinfo-content">
          <div className="rmdb-movieinfo-thumb">
            <MovieThumb
              clickable={false}
              image={props.poster_path ? `${props.poster_path}` : NoImage}
            />
          </div>
          <div className="rmdb-movie-info-text">
            <h1> {props.movieData.title}</h1>
            <p> {props.movieData.plot} </p>
            <h3 className="rmdb-imdb-rating">
              IMDB RATING <span> {props.movieData.imdb.rating} </span>
            </h3>
            <div className="rmdb-rating">
              <meter
                min="0"
                max="100"
                optimum="100"
                low="40"
                high="70"
                value={props.movieData.imdb.rating * 10}
              />
            </div>
            <div className="rmdb-director">
              {props.movieData.director.length > 1 ? (
                <p className="rmdb-director-item"> Directors:</p>
              ) : (
                <p className="rmdb-director-item"> Director: </p>
              )}
              <p className="rmdb-director-item"> {props.movieData.director} </p>
            </div>
          </div>

          <div>
            {isShowing ? (
              <div onClick={closeModal} className="back-drop"></div>
            ) : null}

            <button className="open-modal-btn" onClick={openModal}>
              Open Modal
            </button>

            <Modal
              youtubeUrl={props.youtubeUrl}
              className="modal"
              show={isShowing}
              close={closeModal}
            ></Modal>
          </div>
          <FontAwesome className="fa-film" name="film" size="5x" />
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
