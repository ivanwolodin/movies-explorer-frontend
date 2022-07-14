import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <div className="savedmovies">
      <SearchForm onClick={props.handleSearch} />
      <MoviesCardList
        savedMoviesComponent={true}
        savedMovies={props.savedMovies}
        moviesToRender={props.savedMovies}
        handleLikeMovie={props.handleLikeMovie}
        handleDislikeMovie={props.handleDislikeMovie}
      />
    </div>
  );
}

export default SavedMovies;
