import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {

  function handleSearchThrough(){
    props.handleSearch();
  }

  return (
    <div className="savedmovies">
      <SearchForm onClick={handleSearchThrough} />
      <MoviesCardList
        savedMoviesComponent={true}
        savedMovies={props.savedMovies}
        moviesToRender={props.savedMovies}
        handleLikeMovie={props.handleLikeMovie}
        handleDislikeMovie={props.handleDislikeMovie}
        savedMoviesIds={props.savedMoviesIds}
      />
    </div>
  );
}

export default SavedMovies;
