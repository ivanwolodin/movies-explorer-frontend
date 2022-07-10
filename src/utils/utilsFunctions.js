export function filterFunction(item) {
  const elem = JSON.parse(JSON.stringify(item));
  const query = localStorage.getItem("searchQuery").toLowerCase();
  return !!elem.nameRU.toLowerCase().includes(query);
}
