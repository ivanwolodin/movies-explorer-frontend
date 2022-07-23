export const register = (email, password, name) =>
  fetch("https://api.diploma.iwol.nomoredomains.xyz/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((response) => response);

export const authorize = (email, password) =>
  fetch("https://api.diploma.iwol.nomoredomains.xyz/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());

export const checkToken = (token) =>
  fetch("https://api.diploma.iwol.nomoredomains.xyz/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
