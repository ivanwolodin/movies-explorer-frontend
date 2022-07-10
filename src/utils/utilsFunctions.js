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
