export class MoviesApi {
  constructor(options) {
    this._url = options.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      body: JSON.stringify(),
    }).then(this._checkResponse);
  }
}
