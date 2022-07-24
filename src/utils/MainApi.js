export class MainApi {
  constructor(options) {
    this._url = "https://api.diploma.iwol.nomoredomains.xyz";
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

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  likeMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    }).then(this._checkResponse);
  }

  dislikeMovie(_id) {
    return fetch(`${this._url}/movies/${_id}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        movieId: _id,
      }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
      headers: this.headers,
    }).then(this._checkResponse);
  }
}
