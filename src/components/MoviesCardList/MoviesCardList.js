import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

import { selectShortMovies } from "../../utils/utilsFunctions";

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
      {!cardLikeExist ||
      props.moviesToRender.length === 0 ||
      props.moviesToRender.length ===
        JSON.parse(localStorage.getItem("searchedMovies")).length ||
      (props.isShortMoviesCheckboxSet &&
        props.moviesToRender.length ===
          selectShortMovies(JSON.parse(localStorage.getItem("searchedMovies")))
            .length) ? (
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
