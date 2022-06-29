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

  getInitialCards() {
    console.log("Sending API request!");
    // return fetch(`${this._url}/cards`, {
    //     headers: this.headers,
    // }).then(this._checkResponse);
  }
}
