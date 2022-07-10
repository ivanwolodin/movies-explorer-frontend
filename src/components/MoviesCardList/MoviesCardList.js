import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const cardLikeExist = props.savedMovies ? false : true;

  return (
    <div className="moviescardlist content_info">
      <div className="moviescardlist__films ">
        {props.moviesToRender.map((item) => (
          <MoviesCard
            key={item.id}
            item={item}
            cardLikeExist={cardLikeExist}
            handleLikeMovie={props.handleLikeMovie}
            handleDislikeMovie={props.handleDislikeMovie}
          />
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
