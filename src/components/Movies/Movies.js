import React, { useState, useEffect } from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { MoviesApi } from "../../utils/MoviesApi";

const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
});

function Movies(props) {
  const [allMovies, setAllMovies] = useState([]);
  const [isContentLoaded, setContentLoaded] = useState(false);

  const [isShortMoviesCheckboxSet, setShortMoviesCheckbox] = useState(false);

  // useEffect(() => {
  //   setContentLoaded(!isContentLoaded);
  // }, [allMovies]);
  // console.log(width, height);

  function sayHi() {
    console.log("Привет");
  }

  function handleCheckbox() {
    setShortMoviesCheckbox(!isShortMoviesCheckboxSet);
  }

  function handleSearch() {
    setContentLoaded(false);
    setTimeout(sayHi, 3000);
    if (!allMovies.length) {
      moviesApi
        .getAllMovies()
        .then((response) => {
          setAllMovies(response);
          localStorage.setItem("allMovies", JSON.stringify(response));
        })
        .catch((err) => {
          console.log("Cannot get movies");
          console.log(err);
        })
        .finally(setContentLoaded(true));
    } else {
      setContentLoaded(true);
    }
  }

  return (
    <div className="movies">
      <SearchForm
        onClick={handleSearch}
        isShortMoviesCheckboxSet={isShortMoviesCheckboxSet}
        handleCheckbox={handleCheckbox}
      />
      <MoviesCardList
        filmList={allMovies}
        isContentLoaded={isContentLoaded}
        isShortMoviesCheckboxSet={isShortMoviesCheckboxSet}
      />
    </div>
  );
}

export default Movies;
