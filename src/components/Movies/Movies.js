import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
  function handleSeacrh() {
    //    requst to API
    //    gettin results
    //    pass this result to MoviesCardList
  }

  return (
    <div className="movies">
      <SearchForm onClick={handleSeacrh} />
      <MoviesCardList />
    </div>
  );
}

export default Movies;
