import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <div className="savedmovies">
      <SearchForm onClick={props.handleSearch} />
      <MoviesCardList
        savedMovies={true}
        moviesToRender={props.moviesToRender}
        handleLikeMovie={props.handleLikeMovie}
        handleDislikeMovie={props.handleDislikeMovie}
      />
    </div>
  );
}

export default SavedMovies;
