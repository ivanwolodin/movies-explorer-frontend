import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm onClick={props.handleSearch} />
      <MoviesCardList
        moviesToRender={props.moviesToRender}
        savedMovies={props.savedMovies}
        handleLikeMovie={props.handleLikeMovie}
        handleDislikeMovie={props.handleDislikeMovie}
        savedMoviesIds={props.savedMoviesIds}
      />
    </div>
  );
}

export default Movies;
