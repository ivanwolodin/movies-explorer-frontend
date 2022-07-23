import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  return (
    <div className="savedmovies">
      <SearchForm
        onClick={props.handleSearch}
        isShortMoviesCheckboxSet={props.isShortMoviesCheckboxSet}
        handleCheckbox={props.handleCheckbox}
        clearSearch={true}
      />
      {props.isLoadingError ? (
        <p style={{ textAlign: "center" }}>Ничего не найдено</p>
      ) : !props.isContentLoaded ? (
        <Preloader />
      ) : (
        <MoviesCardList
          savedMoviesComponent={true}
          savedMovies={props.savedMovies}
          moviesToRender={props.moviesToRender}
          handleLikeMovie={props.handleLikeMovie}
          handleDislikeMovie={props.handleDislikeMovie}
          savedMoviesIds={props.savedMoviesIds}
        />
      )}
    </div>
  );
}

export default SavedMovies;
