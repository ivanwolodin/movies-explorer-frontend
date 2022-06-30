import React from "react";
import "./MoviesCard.css";
import movie_image from "../../images/sample_movie.svg";
import like_button from "../../images/like_button.svg";
import liked_button from "../../images/like_button_liked.svg";
import delete_button from "../../images/delete_movie_button.svg";

function MoviesCard({ title, cardLikeexist, urlImage, duration, trailerLink }) {
  const [isLiked, setLike] = React.useState(false);

  function handleLike() {
    setLike(!isLiked);
  }

  function calcDuration() {
    const hour = Math.floor(duration / 60);
    const minutes = duration - hour * 60;

    return `${hour}ч${minutes}м`;
  }

  const classButtonLike = !isLiked
    ? "moviescard__button_like"
    : "moviescard__button_liked";
  return (
    <div className="moviescard">
      <img
        className="moviescard__image"
        src={`https://api.nomoreparties.co/${urlImage}`}
        alt="превью фильма"
      />
      <div className="moviescard__info">
        <a
          className="moviescard__trailerlink"
          href={trailerLink}
          target="_blank"
        >
          <p className="moviescard__name">{title}</p>
        </a>
        {cardLikeexist ? (
          <button
            className={`moviescard__button ${classButtonLike} `}
            // src={isLiked ? liked_button : like_button}
            // alt="кнопка лайка"
            onClick={handleLike}
          />
        ) : (
          <button
            className="moviescard__button moviescard__button_delete"
            // src={delete_button}
            // alt="кнопка удаления"
          />
        )}
      </div>
      <p className="moviescard__duration">{calcDuration()}</p>
    </div>
  );
}

export default MoviesCard;
