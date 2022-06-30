import React, { useState, useEffect } from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { MoviesApi } from "../../utils/MoviesApi";

const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
});

function Movies(props) {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isContentLoaded, setContentLoaded] = useState(false);

  const [isShortMoviesCheckboxSet, setShortMoviesCheckbox] = useState(false);

  function handleCheckbox() {
    setShortMoviesCheckbox(!isShortMoviesCheckboxSet);
  }

  function handleSearch() {
    setContentLoaded(false);

    moviesApi
      .getAllMovies()
      .then((response) => {
        localStorage.setItem("allMovies", JSON.stringify(response));

        // TODO: search function
        setSearchedMovies(response.slice(0, 12));
      })
      .catch((err) => {
        console.log("Cannot get movies");
        console.log(err);
      })
      .finally(setContentLoaded(true));
  }

  return (
    <div className="movies">
      <SearchForm
        onClick={handleSearch}
        isShortMoviesCheckboxSet={isShortMoviesCheckboxSet}
        handleCheckbox={handleCheckbox}
      />
      <MoviesCardList
        filmList={searchedMovies}
        isContentLoaded={isContentLoaded}
        isShortMoviesCheckboxSet={isShortMoviesCheckboxSet}
      />
    </div>
  );
}

export default Movies;
