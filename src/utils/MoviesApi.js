export class MoviesApi {
  constructor(options) {
    this._url = options.url;
    this.headers = {};
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setAuthHeaders() {
    this.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
  }

  getAllMovies() {
    console.log("Sending API request!");
    return fetch(`${this._url}`, {
      method: "GET",
      body: JSON.stringify(),
    }).then(this._checkResponse);
  }
}
