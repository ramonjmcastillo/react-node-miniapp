import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./MoviesList.css";
import Select from "react-select";

const options = [
  { value: "all", label: "All" },
  { value: "title", label: "Movie" },
  { value: "actor", label: "Actors" },
  { value: "plot", label: "Plot" }
];

class MoviesList extends React.Component {
  state = {
    moviesList: ["test"],
    searchTerm: "",
    selectedOption: { value: "title", label: "Movie" },
    actors: null
  };

  handleSelect = selectedOption => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  search = event => {
    event.preventDefault();
    console.log(`http://localhost:9000/searchBy?${this.state.selectOption}=${this.state.searchTerm}
    `);
    axios
      .get(
        `http://localhost:9000/searchBy?${this.state.selectedOption.value}=${this.state.searchTerm}
      `
      )
      // .get(`http://localhost:9000/movie/${this.state.searchTerm}`)
      .then(res => res.data)

      .then(res => {
        console.log(res);
        if (!res) {
          this.setState({ moviesList: [] });
          return;
        }

        this.setState({
          moviesList: res
        });
      });
  };

  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    const { selectedOption } = this.state;
    const { moviesList } = this.state;
    console.log(this.state.searchTerm);
    return (
      <div className="MoviesList-div">
        <form onSubmit={this.search}>
          <Select
            value={selectedOption}
            onChange={this.handleSelect}
            options={options}
          />
          <input
            placeholder="Search for a movie"
            onChange={this.handleChange}
          />

          <button type="submit">
            <i className="fa fa-search" />
          </button>
        </form>
        <div className="movie-cards">
          {moviesList.length > 0 &&
          this.state.selectedOption.value === "title" ? (
            moviesList.map(movie => <MovieCard details={movie} />)
          ) : (
            <p>
              Couldn't find any movie. Please search again using another term.
            </p>
          )}
        </div>
      </div>
    );
  }
}
export default MoviesList;

// import React from "react";
// import axios from "axios";
// import MovieCard from "./MovieCard";
// import "./MoviesList.css";
// import Select from "react-select";

// const options = [
//   { value: "title", label: "Movies" },
//   { value: "actors", label: "Actors" },
//   { value: "genre", label: "Genres" },
//   { value: "plot", label: "Plot" }
// ];

// class MoviesList extends React.Component {
//   state = {
//     searchList: ["test"],
//     searchTerm: "",
//     selectedOption: {
//       valuel: "",
//       label: "Options"
//     }
//   };

//   search = event => {
//     event.preventDefault();
//     console.log(`http://localhost:9000/searchBy?${this.state.selectedOption}=${this.state.searchTerm}
//     `);
//     axios
//       .get(
//         `http://localhost:9000/searchBy?${this.state.selectedOption.value}=${this.state.searchTerm}
//       `
//       )
//       // .get(`http://localhost:9000/movie/${this.state.searchTerm}`)
//       .then(res => res.data)
//       .then(res => {
//         console.log(res);
//         if (!res) {
//           this.setState({ moviesList: [] });
//           return;
//         }

//         this.setState({
//           moviesList: res
//         });
//       });
//   };

//   componentDidUpdate() {}

//   handleChange = event => {
//     this.setState({
//       searchTerm: event.target.value
//     });
//   };

//   handleSelect = selectedOption => {
//     this.setState({ selectedOption }, () =>
//       console.log(`Option selected:`, this.state.selectedOption)
//     );
//   };

//   render() {
//     const { searchList } = this.state;
//     const { selectedOption } = this.state;

//     console.log(this.state.selectedOption);
//     console.log(this.state.searchTerm);

//     return (
//       <div className="MoviesList-div">
//         <form onSubmit={this.search}>
//           <Select
//             value={selectedOption}
//             onChange={this.handleSelect}
//             options={options}
//           />
//           <input placeholder="Search for..." onChange={this.handleChange} />
//           <button type="submit">
//             <i className="fa fa-search" />
//           </button>
//         </form>

//         <div className="movie-cards">
//           {searchList.length > 0 ? (
//             searchList.map(movie => {
//               console.log("inside map", movie);
//               return <MovieCard details={movie} />;
//             })
//           ) : (
//             <p>
//               Couldn't find any movie. Please search again using another term.
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default MoviesList;
