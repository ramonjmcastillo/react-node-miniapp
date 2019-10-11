import { API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";
import React from "react";
import MovieInfoBar from "./MovieInfoBar";
import MovieInfo from "./MovieInfo";
import "./MoviePage.css";
import axios from "axios";
import Actor from "../Actor/Actor";
import FourColGrid from "../FourColGrid/FourColGrid";
import Spinner from "../Spinner/Spinner";
import Navigation from "../Navigation/Navigation";

class MoviePage extends React.Component {
  state = {
    movie: null,
    directors: [],
    backdrop_path: "none",
    poster_path: "none",
    convertedData: [],
    actors: [],
    isLoading: false,
    youtubeUrl: null
  };

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    const movieIndex = this.props.match.params.movieIndex;
    const url = `http://localhost:9000/movie/${movieIndex}`;
    const movieResponse = await axios.get(url);

    const findUrl = `https://api.themoviedb.org/3/find/${movieResponse.data.imdb.id}?api_key=${API_KEY}&language=en-US&external_source=imdb_id`;
    const imdbRes = await axios.get(findUrl);

    const backdropPath = imdbRes.data.movie_results[0].backdrop_path;
    const imageUrl = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdropPath}`;

    const poster_path = movieResponse.data.poster;
    const tmdbUrl = `http://api.themoviedb.org/3/find/${movieResponse.data.imdb.id}?api_key=${API_KEY}&external_source=imdb_id`;
    const tmdbData = await axios.get(tmdbUrl);

    const tmdbId = tmdbData.data.movie_results[0].id;

    console.log("tmdb id", tmdbId);

    const tmdbTrailerUrl = `http://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${API_KEY}`;

    const tmdbTrailerRes = await axios.get(tmdbTrailerUrl);
    console.log(tmdbTrailerRes);

    const youtubeUrl = `https://www.youtube.com/embed/${tmdbTrailerRes.data.results[0].key}`;

    console.log(tmdbTrailerRes);

    const tmdbResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=8a18b744f184ebbe030c32378df023d0&language=en-US`
    );

    const actorsResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=8a18b744f184ebbe030c32378df023d0&language=en-US`
    );
    const actors = actorsResponse.data.cast;

    this.setState({
      backdrop_path: imageUrl,
      poster_path: poster_path,
      movie: movieResponse.data,
      convertedData: tmdbResponse,
      actors: actors,
      isLoading: false,
      youtubeUrl
    });
  }

  fetchItems = endPoint => {
    axios
      .get(endPoint)
      .then(res => res.data)
      .then(res => {
        this.setState({
          movie: res
        });
      });
  };

  render() {
    return (
      <div className="rmdb-movie">
        {this.state.backdrop_path &&
        this.state.poster_path &&
        this.state.movie &&
        this.state.youtubeUrl ? (
          <div>
            <Navigation movie={this.state.movie} />
            <MovieInfo
              backdrop_path={this.state.backdrop_path}
              poster_path={this.state.poster_path}
              movieData={this.state.movie}
              youtubeUrl={this.state.youtubeUrl}
            />
            <MovieInfoBar
              movieData={this.state.movie}
              tmdbData={this.state.convertedData}
            />
          </div>
        ) : (
          <Spinner />
        )}
        {this.state.actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid>
              {this.state.actors.map(actor => {
                return <Actor actor={actor} />;
              })}
            </FourColGrid>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default MoviePage;
