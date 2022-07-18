import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  let cardLikeExist;

  if (props.savedMoviesComponent) {
    cardLikeExist = false;
  } else {
    cardLikeExist = true;
  }

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
            savedMovies={props.savedMovies}
            savedMoviesIds={props.savedMoviesIds}
          />
        ))}
      </div>
      {!cardLikeExist ? (
        <button className="moviescardlist__button moviescardlist__button_hidden">
          Еще
        </button>
      ) : (
        <button
          className="moviescardlist__button"
          onClick={props.showMoreHandler}
        >
          Еще
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
