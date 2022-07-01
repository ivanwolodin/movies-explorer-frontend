import { useEffect, useState } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  const savedMoviesToRender = JSON.parse(localStorage.getItem("savedMovies"))
    ? JSON.parse(localStorage.getItem("savedMovies"))
    : {};
  return (
    <div className="moviescardlist content_info">
      {!props.isContentLoaded ? (
        <Preloader />
      ) : props.isLoadingError ? (
        <div>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </div>
      ) : (
        <div className="moviescardlist__films ">
          {props.savedMovies
            ? savedMoviesToRender.map((item) => (
                <MoviesCard
                  key={item.id}
                  movieId={item.id}
                  title={item.nameRU}
                  cardLikeexist={true}
                  urlImage={item.image}
                  duration={item.duration}
                  trailerLink={item.trailerLink}
                  cardLikeExist={false}
                  handleMovieLike={props.handleMovieLike}
                  titleEng={item.nameEN}
                  director={item.director}
                  year={item.year}
                  country={item.country}
                  description={item.description}
                />
              ))
            : props.moviesToRender.map((item) => (
                <MoviesCard
                  key={item.id}
                  movieId={item.id}
                  title={item.nameRU}
                  cardLikeexist={true}
                  urlImage={item.image}
                  duration={item.duration}
                  trailerLink={item.trailerLink}
                  cardLikeExist={true}
                  handleMovieLike={props.handleMovieLike}
                  titleEng={item.nameEN}
                  director={item.director}
                  year={item.year}
                  country={item.country}
                  description={item.description}
                />
              ))}
        </div>
      )}
      {props.savedMovies ? (
        <button className="moviescardlist__button moviescardlist__button_hidden">
          Еще
        </button>
      ) : (
        <button
          className="moviescardlist__button"
          onClick={props.showMoreHandler}
        >
          Еще
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
