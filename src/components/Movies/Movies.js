import React, { useState } from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { MoviesApi } from "../../utils/MoviesApi";

const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
});

function Movies(props) {
  const [allMovies, setAllMovies] = useState([]);

  function handleSeacrh() {
    moviesApi
      .getAllMovies()
      .then((response) => {
        setAllMovies(response);
      })
      .catch((err) => {
        console.log("Cannot get cards");
        console.log(err);
      });
    console.log(allMovies);
  }

  return (
    <div className="movies">
      <SearchForm onClick={handleSeacrh} />
      <MoviesCardList filmList={allMovies} />
    </div>
  );
}

export default Movies;
