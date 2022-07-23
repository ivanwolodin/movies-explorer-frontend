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
  } else {
    oldEntries.forEach((elem, index) => {
      if (res.data["_id"] === elem["_id"]) {
        oldEntries.splice(index, 1);
      }
    });
  }
  localStorage.setItem("savedMovies", JSON.stringify(oldEntries));
  return oldEntries;
}

export function handleSearchedMoviesIdsLocalStorage(movieId, _id, removeItem) {
  let oldEntries = JSON.parse(localStorage.getItem("savedMoviesIds")) || {};

  if (!removeItem) {
    oldEntries[movieId] = _id;
  } else {
    delete oldEntries[movieId];
  }
  localStorage.setItem("savedMoviesIds", JSON.stringify(oldEntries));
  return oldEntries;
}

export function getValueFromLocalStorage(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key))
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue;
}
