import React, { useState, useEffect } from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { MoviesApi } from "../../utils/MoviesApi";
import { useWindowDimension } from "../App/App";

const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
});

function Movies(props) {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isContentLoaded, setContentLoaded] = useState(true);
  const [isLoadingError, setLoadingError] = useState(false);

  const [isShortMoviesCheckboxSet, setShortMoviesCheckbox] = useState(false);
  const [cardsNumberToShow, setCardsNumberTOShow] = useState({
    numberToShow: 0,
    numberToUpload: 0,
  });
  const [width, height] = useWindowDimension();
  const [moviesToRender, setMoviesToRender] = useState([{}]);

  useEffect(() => {
    adjustCardsNumberToWindowSize();
    setMoviesToRender(
      searchedMovies.slice(0, cardsNumberToShow["numberToShow"])
    );
    if (searchedMovies.length !== 0) {
      localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
      localStorage.setItem("uploadedNumber", searchedMovies.length);
    }
  }, [searchedMovies]);

  useEffect(() => {
    adjustCardsNumberToWindowSize();
    setMoviesToRender(
      moviesToRender.slice(0, cardsNumberToShow["numberToShow"])
    );
  }, [width]);

  useEffect(() => {
    adjustCardsNumberToWindowSize();
    if (null !== JSON.parse(localStorage.getItem("searchedMovies"))) {
      adjustCardsNumberToWindowSize();
      const arr = JSON.parse(localStorage.getItem("searchedMovies"));
      setMoviesToRender(
        arr.slice(0, parseInt(localStorage.getItem("uploadedNumber")))
      );
    }
  }, []);

  function showMoreHandler() {
    setMoviesToRender([
      ...moviesToRender,
      ...JSON.parse(localStorage.getItem("searchedMovies")).slice(
        moviesToRender.length,
        moviesToRender.length + cardsNumberToShow["numberToUpload"]
      ),
    ]);
    localStorage.setItem(
      "uploadedNumber",
      moviesToRender.length + cardsNumberToShow["numberToUpload"]
    );
  }

  function adjustCardsNumberToWindowSize() {
    if (width > 1278) {
      setCardsNumberTOShow({ numberToShow: 4, numberToUpload: 4 });
    } else if (width <= 1278 && width > 968) {
      setCardsNumberTOShow({ numberToShow: 9, numberToUpload: 3 });
    } else if (width <= 968 && width > 613) {
      setCardsNumberTOShow({ numberToShow: 8, numberToUpload: 2 });
    } else if (width <= 613) {
      setCardsNumberTOShow({ numberToShow: 5, numberToUpload: 2 });
    }
  }

  function handleCheckbox() {
    setShortMoviesCheckbox(!isShortMoviesCheckboxSet);
  }

  function filterFunction(item) {
    const elem = JSON.parse(JSON.stringify(item));
    const query = localStorage.getItem("searchQuery").toLowerCase();
    return !!elem.nameRU.toLowerCase().includes(query);
  }

  function handleSearch() {
    setContentLoaded(false);
    moviesApi
      .getAllMovies()
      .then((response) => {
        const res = response.filter(filterFunction)
        setSearchedMovies(res);
        setLoadingError(false);
      })
      .catch((err) => {
        console.log("Cannot get movies");
        console.log(err);
        setLoadingError(true);
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
        isLoadingError={isLoadingError}
        isContentLoaded={isContentLoaded}
        moviesToRender={moviesToRender}
        showMoreHandler={showMoreHandler}
        handleMovieLike={props.handleLikeMovie}
      />
    </div>
  );
}

export default Movies;
