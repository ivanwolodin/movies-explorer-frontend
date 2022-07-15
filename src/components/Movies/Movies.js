import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Preloader from "../Preloader/Preloader";

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm onClick={props.handleSearch} />
      {props.isLoadingError ? (
        <p style={{ textAlign: "center" }}>Ничего не найдено</p>
      ) : !props.isContentLoaded ? (
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
