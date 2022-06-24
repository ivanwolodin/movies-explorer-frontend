import "./MoviesCard.css";
import movie_image from "../../images/sample_movie.svg";
import like_button from "../../images/like_button.svg";
import delete_button from "../../images/delete_movie_button.svg";

function MoviesCard({ title, cardLikeexist }) {
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
            className="moviescard__likebutton"
            src={like_button}
            alt="кнопка лайка"
          />
        ) : (
          <img
            className="moviescard__likebutton"
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
