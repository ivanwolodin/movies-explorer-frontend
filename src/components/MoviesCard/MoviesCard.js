import React from "react";
import "./MoviesCard.css";
import movie_image from "../../images/sample_movie.svg";
import like_button from "../../images/like_button.svg";
import liked_button from "../../images/like_button_liked.svg";
import delete_button from "../../images/delete_movie_button.svg";

function MoviesCard({
  title,
  cardLikeExist,
  urlImage,
  duration,
  trailerLink,
  handleMovieLike,
  movieId,
  titleEng,
  director,
  year,
  country,
  description,
  isMovieLiked,
  handleDislikeMovie,
  _id,
}) {
  const [isLiked, setLike] = React.useState(isMovieLiked);

  let url;
  let srcUrl;

  if (cardLikeExist) {
    url = urlImage ? urlImage.url : "";
    srcUrl = `https://api.nomoreparties.co/${url}`;
  } else {
    url = urlImage;
    srcUrl = url;
  }

  const [movieInfo, setMovieInfo] = React.useState({
    movieId,
    nameRU: title,
    image: `https://api.nomoreparties.co${url}`,
    duration,
    trailerLink,
    nameEN: titleEng,
    director,
    year,
    country,
    description,
    thumbnail: `https://api.nomoreparties.co${url}`,
  });

  function handleLike() {
    if (isLiked) {
      handleDislikeMovie(movieId, _id);
    } else {
      handleMovieLike(movieInfo);
    }
    setLike(!isLiked);
  }

  function handleDelete(){
    console.log(movieId, _id)
    handleDislikeMovie(movieId, _id);
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
      <img className="moviescard__image" src={srcUrl} alt="превью фильма" />
      <div className="moviescard__info">
        <a
          className="moviescard__trailerlink"
          href={trailerLink}
          target="_blank"
        >
          <p className="moviescard__name">{title}</p>
        </a>
        {cardLikeExist ? (
          <button
            className={`moviescard__button ${classButtonLike} `}
            // src={isLiked ? liked_button : like_button}
            // alt="кнопка лайка"
            onClick={handleLike}
          />
        ) : (
          <button
            className="moviescard__button moviescard__button_delete"
            onClick={handleDelete}
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
