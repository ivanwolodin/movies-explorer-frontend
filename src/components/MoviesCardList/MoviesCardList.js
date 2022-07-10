import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const filmsList = [
  // "33 слова о дизайне",
  // "Киноальманах «100 лет дизайна»",
  // "В погоне за Бенкси",
  // "Баския: Взрыв реальности",
  // "Бег это свобода",
  // "Книготорговцы",
  // "Когда я думаю о Германии ночью",
  // "Gimme Danger: История Игги и The Stooges",
  // "Дженис: Маленькая девочка грустит",
  // "Соберись перед прыжком",
  // "Пи Джей Харви: A dog called money",
  // "По волнам: Искусство звука в кино",
  // "Рудбой",
  // "Скейт — кухня",
  // "Война искусств",
  // "Зона",
];

const savedFilmsList = [
  // "Скейт — кухня", 
  // "Война искусств", 
  // "Зона"
];

function MoviesCardList(props) {
  return (
    <div className="moviescardlist content_info">
      <div className="moviescardlist__films ">
        {props.savedMovies
          ? savedFilmsList.map((card, index) => (
              <MoviesCard key={index} title={card} cardLikeexist={false} />
            ))
          : filmsList.map((card, index) => (
              <MoviesCard key={index} title={card} cardLikeexist={true} />
            ))}
      </div>
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
