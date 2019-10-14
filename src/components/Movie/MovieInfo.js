import React, { useState } from "react";
import FontAwesome from "react-fontawesome";
import MovieThumb from "../MovieThumb/MovieThumb";
import "./MovieInfo.css";
import NoImage from "../../assets/images/no_image.jpg";
import Modal from "../Modal/Modal";
import axios from "axios";
import { useAuth0 } from "../../auth0/react-auth0-wrapper";
import { withRouter } from "react-router-dom";

const MovieInfo = props => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { getTokenSilently } = useAuth0();

  const [movieIndex] = useState(props.movieIndex);

  const [isShowing, setisShowing] = useState(false);

  // const [screenPosition, setScreenPosition] = useState(window.pageYOffset);

  const openModal = () => {
    setisShowing(true);
  };

  const closeModal = () => {
    setisShowing(false);
  };

  const deleteMovie = async () => {
    const token = await getTokenSilently();
    console.log(token);
    await axios({
      method: "delete",
      url: `http://localhost:9000/delete/${movieIndex}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("inside delete movie got here");
    props.history.push("/");
  };
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
            <div className="rmdb-movie-top">
              <h1> {props.movieData.title}</h1>
              {isAuthenticated && (
                <button onClick={deleteMovie}> Delete </button>
              )}
            </div>
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
          {isShowing ? (
            <div onClick={closeModal} className="back-drop"></div>
          ) : null}

          <button className="open-modal-btn" onClick={openModal}>
            Watch Trailer
          </button>

          <Modal
            youtubeUrl={props.youtubeUrl}
            className="modal"
            show={isShowing}
            close={closeModal}
          ></Modal>
          <FontAwesome className="fa-film" name="film" size="5x" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(MovieInfo);
