import React, {useEffect} from "react";
import "./MoviesCard.css";

function MoviesCard({
  item,
  cardLikeExist,
  handleLikeMovie,
  handleDislikeMovie,
  savedMovies
}) { 

  const [classButtonLike, setClassButtonLike] = React.useState("moviescard__button_like");

  useEffect(() => {
    savedMovies.forEach((elem) => {
      if (elem.movieId === item.id) {
        setClassButtonLike("moviescard__button_liked");
      }
    });
  }, []);

  function handleLike() {
    setClassButtonLike("moviescard__button_liked");
    handleLikeMovie(item);
  }

  function handleDislike() {
    setClassButtonLike("moviescard__button_like");
    handleDislikeMovie(item);
  }

  function calcDuration() {
    const hour = Math.floor(item.duration / 60);
    const minutes = item.duration - hour * 60;

    return `${hour}ч${minutes}м`;
  }

  let url;
  if (item.image.url) {
    url = item.image ? `https://api.nomoreparties.co/${item.image.url}` : "";
  } else {
    url = item.image;
  }

  return (
    <div className="moviescard">
      <img className="moviescard__image" src={url} alt="превью фильма" />
      <div className="moviescard__info">
        <p className="moviescard__name">{item.nameRU}</p>
        {cardLikeExist ? (
          <button
            className={`moviescard__button ${classButtonLike} `}
            onClick={handleLike}
          />
        ) : (
          <button
            className="moviescard__button moviescard__button_delete"
            onClick={handleDislike}
          />
        )}
      </div>
      <p className="moviescard__duration">{calcDuration()}</p>
    </div>
  );
}

export default MoviesCard;
