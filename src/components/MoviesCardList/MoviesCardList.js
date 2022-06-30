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

  const [startWith, setStartWith] = useState(0);

  useEffect(() => {
    if (width > 1278) {
      setCardsNumberTOShow({ numberToShow: 4, numberToUpload: 4 });
    } else if (width <= 1278 && width > 968) {
      setCardsNumberTOShow({ numberToShow: 9, numberToUpload: 3 });
    } else if (width <= 968 && width > 613) {
      setCardsNumberTOShow({ numberToShow: 8, numberToUpload: 2 });
    } else if (width <= 613) {
      setCardsNumberTOShow({ numberToShow: 5, numberToUpload: 5 });
    }
    setStartWith(cardsNumberToShow["numberToShow"] + 1);
  }, [width]);

  function showMoreHandler() {
    setMoviesToRender([
      ...moviesToRender,
      ...JSON.parse(localStorage.getItem("allMovies")).slice(
        startWith,
        startWith + cardsNumberToShow["numberToShow"]
      ),
    ]);
    setStartWith(startWith + cardsNumberToShow["numberToShow"]);
    console.log(moviesToRender);
  }

  useEffect(() => {
    setMoviesToRender(
      JSON.parse(localStorage.getItem("allMovies")).slice(
        0,
        cardsNumberToShow["numberToShow"]
      )
    );
  }, [width]);

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
        <button className="moviescardlist__button" onClick={showMoreHandler}>
          Еще
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
