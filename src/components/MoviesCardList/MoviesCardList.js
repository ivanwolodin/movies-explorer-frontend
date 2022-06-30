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
  // "Скейт — кухня",
  // "Война искусств",
  // "Зона"
];

function MoviesCardList(props) {
  const [cardsNumberToShow, setCardsNumberTOShow] = useState({
    numberToShow: 0,
    numberToUpload: 0,
  });
  const [width, height] = useWindowDimension();
  const [moviesToRender, setMoviesToRender] = useState([]);

  useEffect(() => {
    if (width > 1278) {
      setCardsNumberTOShow({ numberToShow: 12, numberToUpload: 4 });
    } else if (width <= 1278 && width > 968) {
      setCardsNumberTOShow({ numberToShow: 9, numberToUpload: 3 });
    } else if (width <= 968 && width > 613) {
      setCardsNumberTOShow({ numberToShow: 8, numberToUpload: 2 });
    } else if (width <= 613) {
      setCardsNumberTOShow({ numberToShow: 5, numberToUpload: 5 });
    }
  }, [width]);

  function showMore() {
    //  handler of "More" button
  }
  // console.log(typeof (localStorage.getItem("allMovies")))

  useEffect(() => {
    // console.log(cardsNumberToShow["numberToShow"])
    // console.log(JSON.parse(localStorage.getItem("allMovies"))[7])
    // console.log(localStorage.getItem("allMovies").slice(0, cardsNumberToShow["numberToShow"]))
    setMoviesToRender(
      JSON.parse(localStorage.getItem("allMovies")).slice(
        0,
        cardsNumberToShow["numberToShow"]
      )
    );
    moviesToRender.map((item) => {
      console.log(
        item.id,
        item.trailerLink,
        item.duration,
        item.nameRU,
        item.image.url,
      );
    });
  }, [width]);

  // console.log(moviesToRender);
  return (
    <div className="moviescardlist content_info">
      {
        //   !props.isContentLoaded ? (
        //   <Preloader />
        // ) :
        <div className="moviescardlist__films ">
          {props.savedMovies
            ? savedFilmsList.map((card, index) => (
                <MoviesCard key={index} title={card} cardLikeexist={false} />
              ))
            : moviesToRender.map((item) => (
                <MoviesCard
                  key={item.id}
                  title={item.nameRU}
                  cardLikeexist={true}
                  urlImage={item.image.url}
                  duration={item.duration}
                  trailerLink={item.trailerLink}
                />
              ))}
        </div>
      }
      {props.savedMovies ? (
        <button className="moviescardlist__button moviescardlist__button_hidden">
          Еще
        </button>
      ) : (
        <button className="moviescardlist__button">Еще</button>
      )}
    </div>
  );
}

export default MoviesCardList;
