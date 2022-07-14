import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  let cardLikeExist;

  if (props.savedMovies){
    cardLikeExist = false;
  }
  else{
    cardLikeExist = true;
  }

  const searchedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

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
            savedMovies={searchedMovies}
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
