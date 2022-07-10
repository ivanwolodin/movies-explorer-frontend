import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm onClick={props.handleSearch} />
      <MoviesCardList moviesToRender={props.moviesToRender} />
    </div>
  );
}

export default Movies;
