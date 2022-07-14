const regex_pattern = /[\wа-я]+/gi;

export function filterFunction(item) {
  const elem = JSON.parse(JSON.stringify(item));
  const query = localStorage.getItem("searchQuery").toLowerCase();

  if (query.match(regex_pattern)) {
    return !!elem.nameRU.toLowerCase().includes(query);
  } else {
    return !!elem.nameEN.toLowerCase().includes(query);
  }
}

export function handleSearchedMoviesLocalStorage(res, removeItem) {
  let oldEntries = JSON.parse(localStorage.getItem("savedMovies")) || [];

  if (!removeItem) {
    oldEntries.push(res.movie);
    localStorage.setItem("savedMovies", JSON.stringify(oldEntries));
  } else {
    oldEntries.forEach((elem, index) => {
      if (res.data.movieData === oldEntries["_id"]) {
        oldEntries.splice(index, 1);
        localStorage.setItem("savedMovies", JSON.stringify(oldEntries));
      }
    });
  }
  return oldEntries;
}
