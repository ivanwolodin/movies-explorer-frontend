import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Preloader from "../Preloader/Preloader";

function Movies(props) {
  console.log(props.isContentLoaded);
  return (
    <div className="movies">
      <SearchForm onClick={props.handleSearch} />
      {!props.isContentLoaded ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesToRender={props.moviesToRender}
          savedMovies={props.savedMovies}
          handleLikeMovie={props.handleLikeMovie}
          handleDislikeMovie={props.handleDislikeMovie}
          savedMoviesIds={props.savedMoviesIds}
        />
      )}
    </div>
  );
}

export default Movies;
