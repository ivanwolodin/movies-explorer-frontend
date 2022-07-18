import { useEffect, useState } from "react";

import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <div className="savedmovies">
      <SearchForm
        onClick={props.handleSearch}
        isShortMoviesCheckboxSet={props.isShortMoviesCheckboxSet}
        handleCheckbox={props.handleCheckbox}
      />
      <MoviesCardList
        savedMoviesComponent={true}
        savedMovies={props.savedMovies}
        moviesToRender={props.moviesToRender}
        handleLikeMovie={props.handleLikeMovie}
        handleDislikeMovie={props.handleDislikeMovie}
        savedMoviesIds={props.savedMoviesIds}
      />
    </div>
  );
}

export default SavedMovies;
