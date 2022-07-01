import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <div className="savedmovies">
      <SearchForm />
      <MoviesCardList savedMovies={true} isContentLoaded={true} handleDislikeMovie={props.handleDislikeMovie} />
    </div>
  );
}

export default SavedMovies;
