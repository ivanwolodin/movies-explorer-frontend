import React from "react";
import "./MoviesCard.css";

function MoviesCard({ item, cardLikeExist }) {
  const [isLiked, setLike] = React.useState(false);

  function handleLike() {
    setLike(!isLiked);
  }

  function calcDuration() {
    const hour = Math.floor(item.duration / 60);
    const minutes = item.duration - hour * 60;

    return `${hour}ч${minutes}м`;
  }
  const url = item.image
    ? `https://api.nomoreparties.co/${item.image.url}`
    : "";
  const classButtonLike = !isLiked
    ? "moviescard__button_like"
    : "moviescard__button_liked";
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
          <button className="moviescard__button moviescard__button_delete" />
        )}
      </div>
      <p className="moviescard__duration">{calcDuration()}</p>
    </div>
  );
}

export default MoviesCard;
