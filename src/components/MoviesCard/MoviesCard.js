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
          <img
            className="moviescard__button"
            src={isLiked ? liked_button : like_button}
            alt="кнопка лайка"
            onClick={handleLike}
          />
        ) : (
          <img
            className="moviescard__button"
            src={delete_button}
            alt="кнопка удаления"
          />
        )}
      </div>
      <p className="moviescard__duration">1ч42м</p>
    </div>
  );
}

export default MoviesCard;
