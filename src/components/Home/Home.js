import React from "react";
import axios from "axios";
import HeroImage from "../HeroImage/HeroImage";
import FourColGrid from "../FourColGrid/FourColGrid";
import MovieThumbNail from "../MovieThumbNail/MovieThumbNail";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Spinner from "../Spinner/Spinner";

import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

class Home extends React.Component {
  state = {
    movies: [],
    heroImage: null,
    isLoading: false,
    currentPage: 1,
    altImage: null
  };

  API_URL = "https://api.themoviedb.org/3/";
  API_KEY = "8a18b744f184ebbe030c32378df023d0";

  BASE_URL = "http://localhost:9000/";

  componentDidMount() {
    this.setState({ isLoading: true });
    const endPoint = `${this.BASE_URL}movieList?page=1`;
    const endPoint2 = `${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endPoint);
    this.fetchHeroImage(endPoint2);
    this.setState({
      isLoading: false
    });
  }

  fetchItems = endPoint => {
    this.setState({
      isLoading: true
    });
    axios
      .get(endPoint)
      .then(res => res.data)
      .then(res => {
        this.setState({
          movies: [...this.state.movies, ...res]
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      isLoading: false
    });
  };

  fetchHeroImage = endPoint => {
    fetch(endPoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          heroImage: this.state.heroImage || result.results[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadMoreItems = () => {
    const { currentPage } = this.state;
    this.setState(state => ({
      currentPage: state.currentPage + 1
    }));
    const endPoint = `${this.BASE_URL}movieList?page=${this.state.currentPage}`;
    this.fetchItems(endPoint);
  };

  render() {
    console.log(this.state.movies);
    const renderMovies = this.state.movies.map(movie => {
      return (
        <MovieThumbNail
          key={movie._id}
          altImage={this.state.altImage}
          details={movie}
        />
      );
    });

    return (
      <div className="rmdb-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
              title={this.state.heroImage.original_title}
              text={this.state.heroImage.overview}
            />
          </div>
        ) : (
          <Spinner />
        )}
        <div>
          <FourColGrid>{renderMovies}</FourColGrid>

          {this.state.isLoading ? (
            <LoadMoreBtn text="Load More" />
          ) : (
            <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
