import { useEffect, useState } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useWindowDimension } from "../App/App";

const filmsList = [
  "33 слова о дизайне",
  "Киноальманах «100 лет дизайна»",
  "В погоне за Бенкси",
  "Баския: Взрыв реальности",
  "Бег это свобода",
  "Книготорговцы",
  "Когда я думаю о Германии ночью",
  "Gimme Danger: История Игги и The Stooges",
  "Дженис: Маленькая девочка грустит",
  "Соберись перед прыжком",
  "Пи Джей Харви: A dog called money",
  "По волнам: Искусство звука в кино",
  "Рудбой",
  "Скейт — кухня",
  "Война искусств",
  "Зона",
];
const savedFilmsList = [
  { id: 3, nameRU: "ds", image: { url: "" }, duration: 43, trailerLink: "" },
  // "Скейт — кухня",
  // "Война искусств",
  // "Зона"
];

function MoviesCardList(props) {
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
            ? savedFilmsList.map((item) => (
                <MoviesCard
                  key={item.id}
                  movieId={item.id}
                  title={item.nameRU}
                  cardLikeexist={true}
                  urlImage={item.image}
                  duration={item.duration}
                  trailerLink={item.trailerLink}
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
