import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <div className="savedmovies">
      <SearchForm />
      <MoviesCardList savedMovies={true} />
    </div>
  );
}

export default SavedMovies;
