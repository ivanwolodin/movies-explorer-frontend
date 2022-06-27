import React from "react";
import "./MoviesCard.css";
import movie_image from "../../images/sample_movie.svg";
import like_button from "../../images/like_button.svg";
import liked_button from "../../images/like_button_liked.svg";
import delete_button from "../../images/delete_movie_button.svg";

function MoviesCard({ title, cardLikeexist }) {
  const [isLiked, setLike] = React.useState(false);
  function handleLike() {
    setLike(!isLiked);
  }
  const classButtonLike = !isLiked
    ? "moviescard__button_like"
    : "moviescard__button_liked";
  return (
    <div className="moviescard">
      <img
        className="moviescard__image"
        src={movie_image}
        alt="превью фильма"
      />
      <div className="moviescard__info">
        <p className="moviescard__name">{title}</p>
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
      <p className="moviescard__duration">1ч42м</p>
    </div>
  );
}

export default MoviesCard;
